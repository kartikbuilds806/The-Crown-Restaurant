import { useEffect, useRef } from 'react';

export default function Hero() {
    const contentRef = useRef(null);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        setTimeout(() => el.classList.add('visible'), 100);
    }, []);

    return (
        <section className="hero" id="home">
            <div className="hero-bg">
                <div className="hero-overlay" />
            </div>
            <div className="hero-content reveal" ref={contentRef}>
                <div className="hero-badge">
                    <span className="crown-icon-sm">♛</span> Est. 2020 · Laksar, Haridwar
                </div>
                <h1 className="hero-title">The Crown<br /><span className="gold-text">Restaurant</span></h1>
                <p className="hero-tagline">Taste the Royal Experience</p>
                <p className="hero-desc">Fresh ingredients. Royal recipes. Home delivered right to your door.</p>
                <div className="hero-buttons">
                    <button
                        className="btn-primary"
                        onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        🛒 Order Now
                    </button>
                    <a href="#menu" className="btn-secondary">View Menu</a>
                    <a href="tel:09718922645" className="btn-call">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                        </svg>
                        Call Now
                    </a>
                </div>
            </div>
            <div className="hero-scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
}
