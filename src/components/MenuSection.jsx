import React from 'react';
import { menuItems, categories, categoryLabels } from '../data/menuItems.js';
import MenuCard from './MenuCard.jsx';

export default function MenuSection({ activeCategory, setActiveCategory, onAddToCart }) {
    const filtered = activeCategory === 'all'
        ? menuItems
        : menuItems.filter(i => i.category === activeCategory);

    // Group by category for labels
    const grouped = {};
    filtered.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
    });

    // Preserve original category order
    const orderedCats = ['starters', 'main', 'fastfood', 'beverages'].filter(c => grouped[c]);

    return (
        <section className="menu-section" id="menu">
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <div className="section-tag">Explore Our</div>
                    <h2 className="section-title">Royal <span className="gold-text">Menu</span></h2>
                    <p className="section-subtitle">Crafted with finest ingredients, served with love</p>
                </div>

                {/* Category Tabs */}
                <div className="menu-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`tab-btn${activeCategory === cat.id ? ' active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Menu Grid with category labels */}
                <div className="menu-grid" id="menuGrid">
                    {orderedCats.map(cat => (
                        <React.Fragment key={cat}>
                            <div className="menu-category-label full-width">
                                {categoryLabels[cat]}
                            </div>
                            {grouped[cat].map(item => (
                                <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
