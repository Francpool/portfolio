import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHome = location.pathname === '/';

  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].navbar;

  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      // Simple section detection
      const sections = ['home', 'projects', 'about'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navLinks = [
    { name: t.home, href: '#home', id: 'home' },
    { name: t.projects, href: '#projects', id: 'projects' },
    { name: t.about, href: '#about', id: 'about' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '1.5rem',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 1000,
      pointerEvents: 'none',
      padding: '0 20px'
    }}>
      <nav style={{
        pointerEvents: 'auto',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '100px',
        padding: '0.8rem 3rem', /* Adjusted padding slightly */
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        width: '100%',
        maxWidth: '960px' /* Reduced width by ~20% (from 1200px) */
      }}>
        <a href={isHome ? "#" : "/"} style={{ fontSize: '1.8rem', fontWeight: 'bold', marginRight: '0.5rem' }}>
          Paul<span style={{ color: 'var(--accent-color)' }}>.</span>
        </a>

        {/* Desktop Menu */}
        <ul style={{ display: 'flex', gap: '2rem' }} className="desktop-menu">
          {navLinks.map(link => (
            <li key={link.name}>
              <a
                href={isHome ? link.href : `/${link.href}`}
                style={{
                  color: activeSection === link.id ? 'white' : '#888',
                  fontWeight: activeSection === link.id ? 500 : 400,
                  fontSize: '1.3rem',
                  transition: 'color 0.2s',
                  position: 'relative',
                  padding: '4px 0'
                }}
              >
                {link.name}
                {activeSection === link.id && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--accent-color)',
                    borderRadius: '2px'
                  }}></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side: Divider + Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Divider */}
          <div className="desktop-menu" style={{ width: '1px', height: '28px', background: '#333' }}></div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={toggleLanguage}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                color: '#fff',
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.borderColor = 'white'}
              onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            >
              {language === 'en' ? 'EN' : 'ES'}
            </button>
            <a href="https://github.com/Paul9804" target="_blank" rel="noreferrer" className="social-icon">
              <FaGithub size={26} />
            </a>
            <a href="https://linkedin.com/in/paul-mayorga-automation" target="_blank" rel="noreferrer" className="social-icon">
              <FaLinkedin size={26} />
            </a>
          </div>
        </div>

        <style>{`
          .social-icon {
            color: #aaa;
            transition: color 0.3s, transform 0.3s;
          }
          .social-icon:hover {
            color: white;
            transform: translateY(-2px);
          }
          @media (max-width: 768px) {
            .desktop-menu {
              display: none !important;
            }
            nav {
              padding: 0.8rem 1.5rem;
              gap: 1rem;
            }
          }
        `}</style>
      </nav>
    </div>
  );
};

export default Navbar;
