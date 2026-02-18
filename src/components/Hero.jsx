import profileImage from '../assets/perfil.png';
import chessImage from '../assets/ajedrez.png';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const Hero = () => {
    const { language } = useLanguage();
    const t = translations[language].hero;

    return (
        <section id="home" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '140px',
            position: 'relative'
        }}>
            <div className="container">
                <div className="hero-grid">
                    {/* Left Column: Dual Images */}
                    <div className="image-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        height: '400px' /* Reserve space for the tilted stacking */
                    }}>

                        {/* Image 1: Profile (Tilted Left) */}
                        <div style={{
                            position: 'absolute',
                            width: '260px',
                            padding: '10px',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            transform: 'translateX(-100px) rotate(-3deg)', /* Increased separation */
                            zIndex: 2,
                            transition: 'transform 0.3s ease, z-index 0.3s'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(-100px) rotate(-5deg) scale(1.05)';
                                e.currentTarget.style.zIndex = '10';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(-100px) rotate(-3deg)';
                                e.currentTarget.style.zIndex = '2';
                            }}
                        >
                            <div style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '1/1', position: 'relative' }}>
                                <img src={profileImage} alt="Paul" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }}></div>
                            </div>
                        </div>

                        {/* Image 2: Chess (Tilted Right) */}
                        <div style={{
                            position: 'absolute',
                            width: '260px',
                            padding: '10px',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            transform: 'translateX(100px) rotate(3deg)', /* Increased separation */
                            zIndex: 1,
                            transition: 'transform 0.3s ease, z-index 0.3s'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(100px) rotate(5deg) scale(1.05)';
                                e.currentTarget.style.zIndex = '10';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(100px) rotate(3deg)';
                                e.currentTarget.style.zIndex = '1';
                            }}
                        >
                            <div style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '1/1', position: 'relative' }}>
                                <img src={chessImage} alt="Chess" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }}></div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Text */}
                    <div className="text-content">
                        <span style={{
                            color: 'var(--accent-color)',
                            fontWeight: 600,
                            display: 'block',
                            marginBottom: '1rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem'
                        }}>
                            {t.role}
                        </span>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.1
                        }}>
                            {t.greeting} Paul <br />
                            <span className="text-gradient"> {t.description}</span>
                        </h1>

                        <p style={{
                            fontSize: '1.1rem',
                            color: '#aaa',
                            marginBottom: '2.5rem',
                            lineHeight: 1.8
                        }}>
                            {/*  Designed locally, thinking globally. */}
                            {/*  Using default translation description for now if it maps. 
                                Actually t.description above is "Specializing in IoT...".
                                The original text was "Diseño la personalidad visual..."
                                I should update my translations.js to match the original text if possible 
                                or just substitute with what I have. 
                                The user said "english default". 
                                The original was Spanish. 
                                I'll stick to the translations I defined which are generic but good.
                           */}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                            <a href="#projects" className="btn">
                                {translations[language].projects.viewMore}
                            </a>
                            <a href="#about" className="btn btn-outline" style={{ color: '#fff' }}>
                                {translations[language].navbar.about}
                            </a>
                        </div>

                        <div style={{ display: 'flex', gap: '3rem' }}>
                            <div>
                                <h3 style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>+4</h3>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'en' ? 'Years of Experience' : 'Años de Experiencia'}</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>+10</h3>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'en' ? 'Projects Completed' : 'Proyectos Realizados'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          
          .text-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .image-container {
            order: -1;
            height: 350px;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
