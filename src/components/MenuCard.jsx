import { useState } from 'react';
import QuantityModal from './QuantityModal.jsx';

export default function MenuCard({ item, onAddToCart }) {
    const [added, setAdded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleAdd = () => {
        if (item.portionType) {
            // Open portion/count selector
            setShowModal(true);
        } else {
            // Direct add — no selector needed
            onAddToCart(item.id, item.name, item.price);
            setAdded(true);
            setTimeout(() => setAdded(false), 1200);
        }
    };

    const handleConfirm = (id, name, price) => {
        onAddToCart(id, name, price);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <>
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
                        <span className="price">
                            ₹{item.price}
                            {item.portionType === 'portionSize' && (
                                <span className="price-note"> onwards</span>
                            )}
                        </span>
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

            {showModal && (
                <QuantityModal
                    item={item}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
}
