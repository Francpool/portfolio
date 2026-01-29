import { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const Projects = () => {
    const { language } = useLanguage();
    const t = translations[language].projects;
    const [calendarYear, setCalendarYear] = useState('last');

    const years = [
        { label: 'Último año', value: 'last' },
        { label: '2026', value: 2026 },
        { label: '2025', value: 2025 },
        { label: '2024', value: 2024 }
    ];

    return (
        <section id="projects" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                    Cada commit <span className="text-gradient">cuenta</span>
                </h2>
                <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}>
                    Una selección de mis trabajos recientes.
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

                    <GitHubCalendar
                        username="Francpool"
                        year={calendarYear}
                        blockSize={15}
                        blockMargin={5}
                        colorScheme="dark"
                        fontSize={16}
                    />
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
                                    WEBSITE
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
