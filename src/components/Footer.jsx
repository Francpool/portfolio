import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const Footer = () => {
    const { language } = useLanguage();
    const t = translations[language].footer;

    return (
        <footer style={{ padding: '2rem 0', borderTop: '1px solid #222', textAlign: 'center' }}>
            <div className="container">
                <p style={{ color: '#888', marginBottom: '1rem' }}>
                    &copy; {new Date().getFullYear()} Paul. {t.rights}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
