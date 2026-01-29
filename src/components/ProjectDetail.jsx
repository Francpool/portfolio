import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { FaArrowLeft } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language].projects;
    const project = projects.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>{t.notFound}</h2>
                <Link to="/" className="btn" style={{ marginTop: '20px' }}>{t.backHome}</Link>
            </div>
        );
    }

    const description = project[`description_${language}`] || project.description;
    const longDescription = project[`longDescription_${language}`] || project.longDescription;
    const title = project[`title_${language}`] || project.title;

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '5rem' }}>
            {/* Header / Nav */}
            <div className="container" style={{ padding: '2rem 20px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-color)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        marginBottom: '2rem'
                    }}
                >
                    <FaArrowLeft /> {t.back}
                </button>
            </div>

            {/* Content */}
            <article className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{title}</h1>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                        <span key={tag} style={{
                            fontSize: '0.9rem',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#e0e0e0',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{
                    width: '100%',
                    height: '400px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '3rem',
                    border: '1px solid #333'
                }}>
                    <img
                        src={project.image}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#ccc' }}>
                    {longDescription ? (
                        <div
                            style={{ whiteSpace: 'pre-wrap' }}
                            dangerouslySetInnerHTML={{ __html: longDescription }}
                        />
                    ) : (
                        <p>{description}</p>
                    )}
                </div>

                {/* Gallery if available */}
                {project.gallery && project.gallery.length > 0 && (
                    <div style={{ marginTop: '4rem' }}>
                        <h3 style={{ marginBottom: '2rem' }}>{t.gallery}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                            {project.gallery.map((img, idx) => (
                                <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
                                    <img src={img} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
};

export default ProjectDetail;
