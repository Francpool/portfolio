import { useState, useEffect } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const GITHUB_USERNAME = 'Francpool';
const GITHUB_THEME = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
};

const fetchWithTimeout = async (url, timeoutMs = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } finally {
        clearTimeout(id);
    }
};

// Normaliza la respuesta de https://gh-calendar.rschristian.dev/user/{username}
const normalizeRschristianData = (rawContributions, year) => {
    const flat = rawContributions.flat().map(day => ({
        date: day.date,
        count: Number(day.count) || 0,
        level: Math.min(4, Math.max(0, Number(day.intensity) || 0))
    }));

    if (year === 'last') {
        return flat;
    }

    const yearStr = String(year);
    const byDate = new Map(
        flat.filter(d => d.date.startsWith(`${yearStr}-`)).map(d => [d.date, d])
    );

    const start = new Date(`${yearStr}-01-01T00:00:00Z`);
    const end = new Date(`${yearStr}-12-31T00:00:00Z`);
    const fullYear = [];
    for (let cur = new Date(start); cur <= end; cur.setUTCDate(cur.getUTCDate() + 1)) {
        const dateStr = cur.toISOString().slice(0, 10);
        fullYear.push(byDate.get(dateStr) || { date: dateStr, count: 0, level: 0 });
    }
    return fullYear;
};

const Projects = () => {
    const { language } = useLanguage();
    const t = translations[language].projects;
    const [calendarYear, setCalendarYear] = useState('last');
    const [calendarData, setCalendarData] = useState([]);
    const [calendarLoading, setCalendarLoading] = useState(true);
    const [calendarError, setCalendarError] = useState(false);

    const years = [
        { label: t.lastYear, value: 'last' },
        { label: '2026', value: 2026 },
        { label: '2025', value: 2025 },
        { label: '2024', value: 2024 }
    ];

    useEffect(() => {
        let isMounted = true;
        const yearKey = String(calendarYear);

        const loadContributions = async () => {
            setCalendarLoading(true);
            setCalendarError(false);

            const fetchFromRschristian = async () => {
                const backupData = await fetchWithTimeout(
                    `https://gh-calendar.rschristian.dev/user/${GITHUB_USERNAME}`,
                    5000
                );
                if (Array.isArray(backupData?.contributions) && backupData.contributions.length > 0) {
                    return normalizeRschristianData(backupData.contributions, calendarYear);
                }
                throw new Error('Invalid rschristian response');
            };

            const fetchFromJogruber = async () => {
                const urls = [
                    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${yearKey}`,
                    ...(import.meta.env.DEV
                        ? [`/api/github-contributions/${GITHUB_USERNAME}?y=${yearKey}`]
                        : [])
                ];
                for (const url of urls) {
                    try {
                        const data = await fetchWithTimeout(url, 5000);
                        if (Array.isArray(data?.contributions) && data.contributions.length > 0) {
                            return data.contributions;
                        }
                    } catch {
                        // Intentar siguiente URL
                    }
                }
                throw new Error('Jogruber unavailable');
            };

            // Para 'last' y '2026' priorizamos rschristian.dev porque jogruber.de está rechazando conexiones
            const strategies =
                calendarYear === 'last' || calendarYear === 2026
                    ? [fetchFromRschristian, fetchFromJogruber]
                    : [fetchFromJogruber, fetchFromRschristian];

            for (const strategy of strategies) {
                try {
                    const contributions = await strategy();
                    if (isMounted) {
                        setCalendarData(contributions);
                        setCalendarLoading(false);
                    }
                    return;
                } catch {
                    // Si falla una API en vivo, pasa automáticamente a la otra
                }
            }

            if (isMounted) {
                setCalendarError(true);
                setCalendarLoading(false);
            }
        };

        loadContributions();
        return () => {
            isMounted = false;
        };
    }, [calendarYear]);

    return (
        <section id="projects" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                    {t.headerTitle} <span className="text-gradient">{t.headerHighlight}</span>
                </h2>
                <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}>
                    {t.headerDescription}
                </p>

                {/* GitHub Calendar */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '5rem',
                    padding: '2rem',
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '16px',
                    border: '1px solid #222'
                }}>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {years.map(year => (
                            <button
                                key={year.label}
                                onClick={() => setCalendarYear(year.value)}
                                style={{
                                    background: calendarYear === year.value ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                                    color: calendarYear === year.value ? 'white' : '#888',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {year.label}
                            </button>
                        ))}
                    </div>

                    {calendarError ? (
                        <div style={{ color: '#888' }}>
                            Error – Fetching GitHub contribution data for "{GITHUB_USERNAME}" failed.
                        </div>
                    ) : (
                        <ActivityCalendar
                            data={calendarData}
                            loading={calendarLoading}
                            blockSize={15}
                            blockMargin={5}
                            colorScheme="dark"
                            theme={GITHUB_THEME}
                            fontSize={16}
                            maxLevel={4}
                            labels={{
                                totalCount: `{{count}} contributions in ${calendarYear === 'last' ? 'the last year' : calendarYear}`
                            }}
                        />
                    )}
                </div>

                {/* Projects Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', /* Wider cards */
                    gap: '2rem'
                }}>
                    {projects.map((project, index) => (
                        <div key={index} style={{
                            backgroundColor: 'var(--card-bg)',
                            borderRadius: '20px',
                            border: '1px solid #333',
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Image Container */}
                            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}> {/* Slightly shorter image */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                {/* Website Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    color: '#000',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.5px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}>
                                    {t.websiteBadge}
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>{project[`title_${language}`] || project.title}</h3>
                                <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: '1.5rem', flex: 1 }}>
                                    {project[`description_${language}`] || project.description}
                                </p>

                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.8rem',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            color: '#ccc',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {project.type === 'website' ? (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            backgroundColor: '#5bb85b' /* Green button */,
                                            color: 'white',
                                            textAlign: 'center',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            textDecoration: 'none',
                                            transition: 'background-color 0.2s',
                                            boxShadow: '0 4px 12px rgba(91, 184, 91, 0.2)'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4cae4c'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5bb85b'}
                                    >
                                        {t.visitWebsite}
                                    </a>
                                ) : (
                                    <Link
                                        to={`/project/${project.id}`}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            backgroundColor: 'var(--accent-color)' /* Blue button for internal */,
                                            color: 'white',
                                            textAlign: 'center',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            textDecoration: 'none',
                                            transition: 'background-color 0.2s',
                                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-color)'}
                                    >
                                        {t.viewMore}
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
