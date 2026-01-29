import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const About = () => {
    const { language } = useLanguage();
    const t = translations[language].about;

    return (
        <section id="about" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                    {t.title}
                </h2>

                <div style={{ maxWidth: '800px', fontSize: '1.1rem', color: '#ccc' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        {t.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
