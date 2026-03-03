import { useEffect, useRef } from 'react';

export default function About() {
    const refs = useRef([]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        refs.current.forEach(el => el && obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const addRef = (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };

    return (
        <section className="about" id="about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-image-wrap reveal" ref={addRef}>
                        <div className="about-img-frame">
                            <img
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                                alt="The Crown Restaurant dining"
                                className="about-img"
                                loading="lazy"
                            />
                            <div className="about-img-badge">
                                <span className="crown-icon-sm">♛</span>
                                <span>Royal Dining</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-content reveal" ref={addRef}>
                        <div className="section-tag">Our Story</div>
                        <h2 className="section-title">A Royal Dining<br /><span className="gold-text">Experience</span></h2>
                        <p className="about-text">
                            The Crown Restaurant offers delicious fast food and family dining experience in Laksar. Fresh ingredients,
                            royal taste, and quick home delivery — all crafted to give you the finest culinary experience without
                            leaving the comfort of your home.
                        </p>
                        <p className="about-text">
                            Located in the heart of Laksar, Haridwar, we take pride in serving our community with warmth, freshness, and
                            unmatched flavor every single day.
                        </p>
                        <div className="about-badges">
                            {[
                                { icon: '👨‍👩‍👧‍👦', label: 'Family Friendly' },
                                { icon: '⚡', label: 'Fast Food' },
                                { icon: '🛵', label: 'Home Delivery' },
                            ].map(b => (
                                <div className="badge" key={b.label}>
                                    <div className="badge-icon">{b.icon}</div>
                                    <span>{b.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="hours-card">
                            <div className="hours-icon">🕐</div>
                            <div className="hours-info">
                                <strong>Business Hours</strong>
                                <span>Mon – Sun: 11:00 AM – 9:30 PM</span>
                                <small>* Actual hours may differ on holidays (Holi hours may vary).</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
