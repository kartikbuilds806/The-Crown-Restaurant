import { useState } from 'react';

export default function QuantityModal({ item, onClose, onConfirm }) {
    const [selectedPortion, setSelectedPortion] = useState(
        item.portionType === 'portionSize' || item.portionType === 'riceSize'
            ? item.portions[item.portions.length - 1]   // default = last (Full/Full)
            : null
    );
    const [count, setCount] = useState(1);

    if (!item) return null;

    const handleConfirm = () => {
        if (item.portionType === 'count') {
            // e.g. "Tandoori Roti ×3", price = unit price × count
            onConfirm(
                item.id + '_' + count,
                count === 1 ? item.name : `${item.name} ×${count}`,
                item.price * count
            );
        } else {
            // portion selection — embed label in name, adjust price
            const price = Math.round(item.price * selectedPortion.multiplier);
            onConfirm(
                item.id + '_' + selectedPortion.label.toLowerCase(),
                `${item.name} (${selectedPortion.label})`,
                price
            );
        }
        onClose();
    };

    const isCount = item.portionType === 'count';

    return (
        <>
            <div className="qty-modal-overlay" onClick={onClose} />
            <div className="qty-modal">
                <div className="qty-modal-header">
                    <h3>{item.name}</h3>
                    <button className="cart-close" onClick={onClose}>✕</button>
                </div>

                {!isCount ? (
                    <>
                        <p className="qty-modal-label">Choose portion size:</p>
                        <div className="portion-options">
                            {item.portions.map(p => {
                                const price = Math.round(item.price * p.multiplier);
                                const isSelected = selectedPortion?.label === p.label;
                                return (
                                    <button
                                        key={p.label}
                                        className={`portion-btn${isSelected ? ' selected' : ''}`}
                                        onClick={() => setSelectedPortion(p)}
                                    >
                                        <span className="portion-label">{p.label}</span>
                                        <span className="portion-price">₹{price}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <>
                        <p className="qty-modal-label">
                            How many {item.name.toLowerCase()}s? — ₹{item.price} each
                        </p>
                        <div className="count-stepper">
                            <button
                                className="qty-btn"
                                onClick={() => setCount(c => Math.max(1, c - 1))}
                            >−</button>
                            <span className="qty-val count-display">{count}</span>
                            <button
                                className="qty-btn"
                                onClick={() => setCount(c => Math.min(20, c + 1))}
                            >+</button>
                        </div>
                        <p className="count-total">Total: ₹{item.price * count}</p>
                    </>
                )}

                <button className="qty-confirm-btn" onClick={handleConfirm}>
                    Add to Cart →
                </button>
            </div>
        </>
    );
}
