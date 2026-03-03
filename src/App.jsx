import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import MenuSection from './components/MenuSection.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import SuccessModal from './components/SuccessModal.jsx';
import Location from './components/Location.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';

export default function App() {
    // ── Status ────────────────────────────────────────────────────
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const check = () => {
            const now = new Date();
            const total = now.getHours() * 60 + now.getMinutes();
            setIsOpen(total >= 11 * 60 && total < 21 * 60 + 30);
        };
        check();
        const t = setInterval(check, 60000);
        return () => clearInterval(t);
    }, []);

    // ── Cart ──────────────────────────────────────────────────────
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const DELIVERY = 30;

    const addToCart = (id, name, price) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === id);
            if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { id, name, price, qty: 1 }];
        });
    };

    const updateQty = (id, delta) => {
        setCart(prev => {
            const updated = prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i);
            return updated.filter(i => i.qty > 0);
        });
    };

    // ── Checkout ──────────────────────────────────────────────────
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const openCheckout = () => {
        if (cart.length === 0) return;
        setIsCartOpen(false);
        setTimeout(() => setIsCheckoutOpen(true), 200);
    };

    // ── Success ───────────────────────────────────────────────────
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const placeOrder = (formData) => {
        const { name, phone, address, landmark, payment } = formData;
        const grandTotal = cartSubtotal + DELIVERY;

        const orderItemsText = cart.map(i => `  • ${i.name} × ${i.qty} = ₹${i.price * i.qty}`).join('\n');
        const waMessage =
            `🍽️ *NEW ORDER — The Crown Restaurant*\n\n` +
            `👤 *Name:* ${name}\n` +
            `📞 *Phone:* ${phone}\n` +
            `📍 *Address:* ${address}${landmark ? '\n🏷️ *Landmark:* ' + landmark : ''}\n\n` +
            `📋 *Order Details:*\n${orderItemsText}\n\n` +
            `💰 *Subtotal:* ₹${cartSubtotal}\n` +
            `🛵 *Delivery Charge:* ₹${DELIVERY}\n` +
            `💳 *Grand Total:* ₹${grandTotal}\n\n` +
            `💳 *Payment:* ${payment}\n\n` +
            `✅ Please confirm this order. Thank you!`;

        setOrderDetails({
            name,
            payment,
            grandTotal,
            items: [...cart],
            waUrl: `https://wa.me/919718922645?text=${encodeURIComponent(waMessage)}`,
        });
        setIsCheckoutOpen(false);
        setTimeout(() => setIsSuccessOpen(true), 200);
    };

    const newOrder = () => {
        setCart([]);
        setIsSuccessOpen(false);
        setTimeout(() => {
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    };

    // ── Mobile menu ────────────────────────────────────────────────
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ── Category filter ────────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState('all');

    // Prevent body scroll when overlays open
    useEffect(() => {
        document.body.style.overflow = (isCartOpen || isCheckoutOpen || isSuccessOpen) ? 'hidden' : '';
    }, [isCartOpen, isCheckoutOpen, isSuccessOpen]);

    return (
        <>
            <Navbar
                cartCount={cartCount}
                isOpen={isOpen}
                onCartOpen={() => setIsCartOpen(true)}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <Hero />
            <About />
            <MenuSection
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                onAddToCart={addToCart}
            />
            <Location />
            <Footer />
            <WhatsAppFloat />

            <Cart
                cart={cart}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onUpdateQty={updateQty}
                subtotal={cartSubtotal}
                delivery={DELIVERY}
                onCheckout={openCheckout}
            />
            <Checkout
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cart={cart}
                subtotal={cartSubtotal}
                delivery={DELIVERY}
                onPlaceOrder={placeOrder}
            />
            <SuccessModal
                isOpen={isSuccessOpen}
                orderDetails={orderDetails}
                onNewOrder={newOrder}
            />
        </>
    );
}
