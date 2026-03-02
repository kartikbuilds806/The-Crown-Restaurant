// ===================================================
//  THE CROWN RESTAURANT — script.js
//  Cart System, Open/Closed Status, Animations
// ===================================================

// ===== OPEN / CLOSED STATUS =====
function updateRestaurantStatus() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const openTime = 11 * 60;       // 11:00 AM
    const closeTime = 21 * 60 + 30; // 9:30 PM

    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    const badge = document.getElementById('statusBadge');

    if (totalMinutes >= openTime && totalMinutes < closeTime) {
        dot.className = 'status-dot open';
        text.textContent = 'Open Now';
        badge.style.borderColor = 'rgba(76,175,80,0.4)';
        badge.style.color = '#4CAF50';
    } else {
        dot.className = 'status-dot closed';
        text.textContent = 'Closed';
        badge.style.borderColor = 'rgba(244,67,54,0.4)';
        badge.style.color = '#f44336';
    }
}
updateRestaurantStatus();
setInterval(updateRestaurantStatus, 60000);

// ===== CART STATE =====
let cart = [];

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = count;

    const cartEmpty = document.getElementById('cartEmpty');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartFooter = document.getElementById('cartFooter');

    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartItemsList.innerHTML = '';
        cartFooter.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-qty-controls">
                <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
            </div>
            <span class="cart-item-price">₹${item.price * item.qty}</span>
        </div>
    `).join('');

    const subtotal = getCartTotal();
    document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
    document.getElementById('cartTotal').textContent = `₹${subtotal + 30}`;
}

function addToCart(name, price, btnEl) {
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    updateCartUI();

    // Button feedback
    if (btnEl) {
        const original = btnEl.textContent;
        btnEl.textContent = '✓ Added!';
        btnEl.classList.add('added');
        btnEl.disabled = true;
        setTimeout(() => {
            btnEl.textContent = original;
            btnEl.classList.remove('added');
            btnEl.disabled = false;
        }, 1200);
    }

    // Bounce cart icon
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.classList.add('bounce');
    setTimeout(() => cartBtn.classList.remove('bounce'), 400);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

// ===== CART TOGGLE =====
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

// ===== CHECKOUT =====
function openCheckout() {
    if (cart.length === 0) return;
    toggleCart(); // close cart first
    const overlay = document.getElementById('checkoutOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCheckoutItems();
}

function closeCheckout() {
    document.getElementById('checkoutOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== PAYMENT FIELDS TOGGLE =====
function showPaymentFields(method) {
    const upiFields = document.getElementById('upiFields');
    const cardFields = document.getElementById('cardFields');
    upiFields.style.display = 'none';
    cardFields.style.display = 'none';
    if (method === 'UPI') {
        upiFields.style.display = 'block';
    } else if (method === 'Card Payment') {
        cardFields.style.display = 'block';
    }
}

function renderCheckoutItems() {
    const container = document.getElementById('checkoutItems');
    const total = getCartTotal();
    container.innerHTML = cart.map(item =>
        `<div class="checkout-item"><span>${item.name} × ${item.qty}</span><span>₹${item.price * item.qty}</span></div>`
    ).join('');
    document.getElementById('checkoutTotal').textContent = `₹${total + 30}`;
}

// ===== PLACE ORDER =====
function placeOrder(e) {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const landmark = document.getElementById('custLandmark').value.trim();
    const paymentEl = document.querySelector('input[name="payment"]:checked');
    if (!paymentEl) { alert('Please select a payment method.'); return; }
    const payment = paymentEl.value;

    const subtotal = getCartTotal();
    const grandTotal = subtotal + 30;

    const orderItems = cart.map(i => `  • ${i.name} × ${i.qty} = ₹${i.price * i.qty}`).join('\n');

    const waMessage =
        `🍽️ *NEW ORDER — The Crown Restaurant*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📍 *Address:* ${address}${landmark ? '\n🏷️ *Landmark:* ' + landmark : ''}\n\n` +
        `📋 *Order Details:*\n${orderItems}\n\n` +
        `💰 *Subtotal:* ₹${subtotal}\n` +
        `🛵 *Delivery Charge:* ₹30\n` +
        `💳 *Grand Total:* ₹${grandTotal}\n\n` +
        `💳 *Payment:* ${payment}\n\n` +
        `✅ Please confirm this order. Thank you!`;

    // Show success screen
    closeCheckout();
    const successOverlay = document.getElementById('successOverlay');
    successOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Order details summary in modal
    document.getElementById('orderDetails').innerHTML =
        `<strong>📋 Order for ${name}</strong><br/>` +
        cart.map(i => `${i.name} × ${i.qty} — ₹${i.price * i.qty}`).join('<br/>') +
        `<br/><br/><strong>💳 Total: ₹${grandTotal}</strong><br/>📦 Payment: ${payment}`;

    // WhatsApp button
    const waBtn = document.getElementById('waReviewBtn');
    const waUrl = 'https://wa.me/919718922645?text=' + encodeURIComponent(waMessage);
    waBtn.onclick = () => window.open(waUrl, '_blank');

    // Reset form
    document.getElementById('checkoutForm').reset();
}

function newOrder() {
    cart = [];
    updateCartUI();

    // Close success modal
    const overlay = document.getElementById('successOverlay');
    overlay.classList.remove('active');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';

    // Hide payment extra fields
    const upiFields = document.getElementById('upiFields');
    const cardFields = document.getElementById('cardFields');
    if (upiFields) upiFields.style.display = 'none';
    if (cardFields) cardFields.style.display = 'none';

    // Scroll to menu after small delay
    setTimeout(() => {
        const menuSection = document.getElementById('menu');
        if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
    }, 150);
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const links = document.getElementById('navLinks');
    links.classList.toggle('open');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MENU CATEGORY FILTER =====
function filterMenu(category) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const cards = document.querySelectorAll('.menu-card');
    const labels = document.querySelectorAll('.menu-category-label');

    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (category === 'all' || cat === category) {
            card.style.display = '';
            card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });

    labels.forEach(label => {
        const cat = label.getAttribute('data-category');
        if (category === 'all' || cat === category) {
            label.style.display = '';
        } else {
            label.style.display = 'none';
        }
    });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--gold)';
        }
    });
});

// ===== CART BUTTON BOUNCE CSS INJECTION =====
const style = document.createElement('style');
style.textContent = `
  .cart-btn.bounce { animation: cartBounce 0.4s ease; }
  @keyframes cartBounce {
    0% { transform: scale(1); }
    40% { transform: scale(1.25); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }
  @keyframes fadeInCard {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===== INIT =====
updateCartUI();
