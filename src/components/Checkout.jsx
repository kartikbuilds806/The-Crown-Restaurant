import { useState } from 'react';

export default function Checkout({ isOpen, onClose, cart, subtotal, delivery, onPlaceOrder }) {
    const [payment, setPayment] = useState('');
    const [form, setForm] = useState({ name: '', phone: '', address: '', landmark: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!payment) { alert('Please select a payment method.'); return; }
        onPlaceOrder({ ...form, payment });
        setForm({ name: '', phone: '', address: '', landmark: '' });
        setPayment('');
    };

    const grandTotal = subtotal + delivery;

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay${isOpen ? ' active' : ''}`} id="checkoutOverlay">
            <div className="checkout-modal" id="checkoutModal">
                <div className="modal-header">
                    <h3>📋 Checkout</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <form id="checkoutForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="custName">Customer Name *</label>
                            <input
                                type="text" id="custName" placeholder="Enter your full name" required
                                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="custPhone">Phone Number *</label>
                            <input
                                type="tel" id="custPhone" placeholder="Enter 10-digit phone number"
                                pattern="[0-9]{10}" required
                                value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="custAddress">Full Delivery Address *</label>
                            <textarea
                                id="custAddress" rows="3" placeholder="House no., Street, Area, City" required
                                value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="custLandmark">Landmark (Optional)</label>
                            <input
                                type="text" id="custLandmark" placeholder="Near school, temple, etc."
                                value={form.landmark} onChange={e => setForm(f => ({ ...f, landmark: e.target.value }))}
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="form-group">
                            <label>Payment Method *</label>
                            <div className="payment-options">
                                {['Cash on Delivery', 'UPI', 'Card Payment'].map(opt => (
                                    <label className="payment-opt" key={opt}>
                                        <input
                                            type="radio" name="payment" value={opt}
                                            checked={payment === opt}
                                            onChange={() => setPayment(opt)}
                                        /> {opt}
                                    </label>
                                ))}
                            </div>

                            {payment === 'UPI' && (
                                <div id="upiFields" className="payment-extra-fields" style={{ marginTop: 12 }}>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label htmlFor="upiId">UPI ID *</label>
                                        <input type="text" id="upiId" placeholder="e.g. name@upi or phone@paytm" />
                                    </div>
                                    <p className="payment-note">📱 Pay to: <strong>9718922645@paytm</strong> | <strong>9718922645@upi</strong></p>
                                </div>
                            )}

                            {payment === 'Card Payment' && (
                                <div id="cardFields" className="payment-extra-fields" style={{ marginTop: 12 }}>
                                    <div className="form-group" style={{ marginBottom: 10 }}>
                                        <label htmlFor="cardNumber">Card Number *</label>
                                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxLength="19" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label htmlFor="cardExpiry">Expiry Date *</label>
                                            <input type="text" id="cardExpiry" placeholder="MM/YY" maxLength="5" />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label htmlFor="cardCvv">CVV *</label>
                                            <input type="password" id="cardCvv" placeholder="•••" maxLength="3" />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginTop: 10, marginBottom: 0 }}>
                                        <label htmlFor="cardName">Name on Card *</label>
                                        <input type="text" id="cardName" placeholder="As printed on card" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="order-summary-preview">
                            <h4>Order Summary</h4>
                            <div id="checkoutItems">
                                {cart.map(item => (
                                    <div className="checkout-item" key={item.id}>
                                        <span>{item.name} × {item.qty}</span>
                                        <span>₹{item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="checkout-total">
                                <span>Total (incl. ₹{delivery} delivery)</span>
                                <span id="checkoutTotal">₹{grandTotal}</span>
                            </div>
                        </div>

                        <button type="submit" className="place-order-btn">🎉 Place Order</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
