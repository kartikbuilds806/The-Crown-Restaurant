export default function Location() {
    return (
        <section className="location-section" id="location">
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <div className="section-tag">Find Us</div>
                    <h2 className="section-title">Our <span className="gold-text">Location</span></h2>
                    <p className="section-subtitle">Conveniently located in the heart of Laksar</p>
                </div>
                <div className="location-grid reveal-on-scroll">
                    <div className="location-info">
                        {[
                            { icon: '📍', label: 'Address', content: <p>Balawali Tiraha, Laksar,<br />Haridwar – 247663, Uttarakhand</p> },
                            { icon: '📞', label: 'Phone', content: <p><a href="tel:09718922645" className="tel-link">9718922645</a></p> },
                            {
                                icon: '🕐', label: 'Hours', content: (
                                    <>
                                        <p>Monday – Sunday<br />11:00 AM – 9:30 PM</p>
                                        <small>* Actual hours may differ on holidays</small>
                                    </>
                                )
                            },
                            { icon: '🛵', label: 'Services', content: <p>Home Delivery · Fast Food<br />Family Friendly</p> },
                        ].map(item => (
                            <div className="location-item" key={item.label}>
                                <div className="location-icon">{item.icon}</div>
                                <div>
                                    <strong>{item.label}</strong>
                                    {item.content}
                                </div>
                            </div>
                        ))}
                        <a href="tel:09718922645" className="call-now-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                            </svg>
                            Click to Call: 9718922645
                        </a>
                    </div>
                    <div className="map-wrap">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.8!2d77.994!3d29.769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929b0000000%3A0x0!2sLaksar%2C+Haridwar%2C+Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%" height="380" style={{ border: 0, borderRadius: 16 }}
                            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            title="The Crown Restaurant Location"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
