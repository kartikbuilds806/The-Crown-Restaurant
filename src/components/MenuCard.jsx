import { useState } from 'react';

export default function MenuCard({ item, onAddToCart }) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAddToCart(item.id, item.name, item.price);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <div className="menu-card reveal-on-scroll" data-category={item.category}>
            <div className="menu-card-img-wrap">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="menu-card-overlay">
                    <button className="quick-add" onClick={handleAdd} disabled={added}>
                        {added ? '✓ Added!' : '+ Quick Add'}
                    </button>
                </div>
            </div>
            <div className="menu-card-body">
                <div className="menu-card-top">
                    <h3>{item.name}</h3>
                    {item.isVeg && <span className="veg-badge">🟢</span>}
                </div>
                <p>{item.description}</p>
                <div className="menu-card-footer">
                    <span className="price">₹{item.price}</span>
                    <button
                        className={`add-cart-btn${added ? ' added' : ''}`}
                        onClick={handleAdd}
                        disabled={added}
                    >
                        {added ? '✓ Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
