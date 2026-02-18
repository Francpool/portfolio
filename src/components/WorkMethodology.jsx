import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const WorkMethodology = () => {
    const { language } = useLanguage();
    const t = translations[language].workMethodology;

    return (
        <section>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
                    {t.titlePrefix} <span className="text-gradient">{t.titleHighlight}</span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {t.items.map((item, index) => (
                        <div key={index} style={{
                            padding: '2rem',
                            borderLeft: '2px solid var(--accent-color)',
                            background: 'linear-gradient(to right, rgba(59,130,246,0.05), transparent)'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{item.title}</h3>
                            <p style={{ color: '#aaa' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkMethodology;
