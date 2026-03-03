import { useState, useEffect, useRef } from 'react';

export default function Navbar({ cartCount, isOpen, onCartOpen, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = ['home', 'about', 'menu', 'location', 'contact'];
            let current = 'home';
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 100) current = id;
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on outside click
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const handler = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isMobileMenuOpen, setIsMobileMenuOpen]);

    const links = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#menu', label: 'Menu' },
        { href: '#location', label: 'Location' },
        { href: '#contact', label: 'Contact' },
    ];

    const statusColor = isOpen ? '#4CAF50' : '#f44336';
    const statusBorder = isOpen ? 'rgba(76,175,80,0.4)' : 'rgba(244,67,54,0.4)';

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar" ref={navRef}>
            <div className="nav-container">
                <a href="#home" className="nav-logo">
                    <span className="crown-icon">♛</span>
                    <div className="logo-text">
                        <span className="logo-name">The Crown</span>
                        <span className="logo-sub">Restaurant</span>
                    </div>
                </a>

                <ul className={`nav-links${isMobileMenuOpen ? ' open' : ''}`} id="navLinks">
                    {links.map(l => (
                        <li key={l.href}>
                            <a
                                href={l.href}
                                className="nav-link"
                                style={activeSection === l.href.slice(1) ? { color: 'var(--gold)' } : {}}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="nav-right">
                    <div
                        className="status-badge"
                        style={{ borderColor: statusBorder, color: statusColor }}
                    >
                        <span className={`status-dot ${isOpen ? 'open' : 'closed'}`} />
                        <span>{isOpen ? 'Open Now' : 'Closed'}</span>
                    </div>

                    <button className="cart-btn" id="cartBtn" onClick={onCartOpen} aria-label="Open cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </button>

                    <button
                        className="mobile-menu-btn"
                        id="mobileMenuBtn"
                        onClick={() => setIsMobileMenuOpen(v => !v)}
                        aria-label="Toggle menu"
                    >
                        <span style={isMobileMenuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
                        <span style={isMobileMenuOpen ? { opacity: 0 } : {}} />
                        <span style={isMobileMenuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
