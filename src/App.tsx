import { motion, AnimatePresence } from "motion/react";
import { Utensils, Coffee, Wine, Clock, MapPin, Instagram, Facebook, Twitter, ChevronRight, Star, Menu as MenuIcon, X, ShoppingBag, MessageCircle, Plus, Minus, Trash2, Check } from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Types ---
interface MenuItem {
  name: string;
  price: number;
  desc: string;
  img: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// --- Components ---

const Navbar = ({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reservation", href: "#reservation" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "py-4 glass shadow-sm" : "py-8 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-serif font-bold tracking-tight text-brand-coffee"
        >
          LUMINA
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium uppercase tracking-widest hover:text-brand-terracotta transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          
          <button 
            onClick={onCartClick}
            className="relative p-2 text-brand-coffee hover:text-brand-terracotta transition-colors"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          <motion.a
            href="#reservation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2.5 bg-brand-coffee text-brand-cream rounded-full text-sm font-medium hover:bg-brand-terracotta transition-all duration-300 shadow-lg shadow-brand-coffee/10"
          >
            Book a Table
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onCartClick}
            className="relative p-2 text-brand-coffee"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-brand-coffee" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-brand-cream border-t border-brand-beige overflow-hidden md:hidden shadow-xl"
          >
            <div className="p-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#reservation" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-brand-coffee text-brand-cream text-center rounded-xl font-medium"
              >
                Reserve Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" 
            alt="Café Ambience" 
            className="w-full h-full object-cover brightness-75"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/80 via-brand-cream/40 to-transparent md:from-brand-cream/90 md:via-brand-cream/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1 bg-brand-terracotta/10 text-brand-terracotta rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Urban Dining Experience
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8 text-brand-coffee">
              Where Every <br />
              <span className="italic text-brand-terracotta">Flavor</span> Tells <br />
              a Story.
            </h1>
            <p className="text-lg md:text-xl text-brand-coffee/70 mb-10 leading-relaxed max-w-lg text-balance">
              Experience the perfect blend of artisanal coffee, seasonal ingredients, and a cozy atmosphere designed for your best moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-brand-coffee text-brand-cream rounded-full font-medium shadow-xl shadow-brand-coffee/20 flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                Order Online
                <ShoppingBag size={18} className="group-hover:translate-y-[-2px] transition-transform" />
              </motion.a>
              <motion.a
                href="#reservation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-brand-coffee border border-brand-beige rounded-full font-medium hover:bg-brand-beige transition-colors flex items-center justify-center w-full sm:w-auto"
              >
                Book a Table
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 hidden lg:block"
      >
        <div className="glass p-6 rounded-2xl shadow-2xl max-w-[200px]">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-brand-orange text-brand-orange" />)}
          </div>
          <p className="text-sm font-serif italic">"The best espresso in the city, hands down."</p>
          <p className="text-[10px] uppercase tracking-widest mt-2 opacity-50">— Sarah J.</p>
        </div>
      </motion.div>
    </section>
  );
};

const FeaturedDishes = () => {
  const dishes = [
    {
      name: "Truffle Mushroom Risotto",
      price: "$24",
      desc: "Creamy arborio rice, wild mushrooms, fresh truffle shavings.",
      img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Artisanal Avocado Toast",
      price: "$16",
      desc: "Sourdough, heirloom tomatoes, poached egg, chili flakes.",
      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Honey Glazed Salmon",
      price: "$28",
      desc: "Atlantic salmon, roasted asparagus, lemon butter sauce.",
      img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-24 bg-brand-beige/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Chef's Recommendations</h2>
          <p className="text-brand-coffee/60 uppercase tracking-[0.2em] text-sm">Handpicked favorites for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6 shadow-lg">
                <img 
                  src={dish.img} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full font-serif font-bold">
                  {dish.price}
                </div>
              </div>
              <h3 className="text-2xl mb-2 group-hover:text-brand-terracotta transition-colors">{dish.name}</h3>
              <p className="text-brand-coffee/70 leading-relaxed">{dish.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuSection = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  
  const categories = ["Breakfast", "Lunch", "Dinner", "Drinks"];
  
  const menuItems: Record<string, MenuItem[]> = {
    Breakfast: [
      { name: "Classic Benedict", price: 450, desc: "Poached eggs, hollandaise, smoked ham", img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&q=80&w=400" },
      { name: "Berry Acai Bowl", price: 380, desc: "Organic acai, granola, seasonal berries", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=400" },
      { name: "Shakshuka", price: 420, desc: "Spiced tomato sauce, eggs, feta, pita", img: "https://images.unsplash.com/photo-1590412200988-a436bb7050a8?auto=format&fit=crop&q=80&w=400" },
      { name: "French Toast", price: 350, desc: "Brioche, maple syrup, caramelized bananas", img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400" },
    ],
    Lunch: [
      { name: "Quinoa Salad", price: 480, desc: "Roasted veggies, lemon tahini dressing", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400" },
      { name: "Wagyu Burger", price: 850, desc: "Caramelized onions, aged cheddar, brioche", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" },
      { name: "Pesto Pasta", price: 550, desc: "Fresh basil pesto, pine nuts, parmesan", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400" },
      { name: "Chicken Caesar", price: 520, desc: "Romaine, croutons, house-made dressing", img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=400" },
    ],
    Dinner: [
      { name: "Ribeye Steak", price: 1450, desc: "Grass-fed, garlic butter, mash potatoes", img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=400" },
      { name: "Seafood Paella", price: 1250, desc: "Saffron rice, shrimp, mussels, calamari", img: "https://images.unsplash.com/photo-1534080564607-c98752441051?auto=format&fit=crop&q=80&w=400" },
      { name: "Duck Confit", price: 1150, desc: "Slow-cooked duck, orange glaze, lentils", img: "https://images.unsplash.com/photo-1514516311115-50228590304a?auto=format&fit=crop&q=80&w=400" },
      { name: "Eggplant Parm", price: 650, desc: "Crispy eggplant, marinara, mozzarella", img: "https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&q=80&w=400" },
    ],
    Drinks: [
      { name: "Signature Latte", price: 280, desc: "Double shot, oat milk, honey, cinnamon", img: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=400" },
      { name: "Matcha Tonic", price: 320, desc: "Ceremonial grade matcha, tonic, lime", img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=400" },
      { name: "Old Fashioned", price: 650, desc: "Bourbon, bitters, orange peel", img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=400" },
      { name: "Hibiscus Tea", price: 220, desc: "Cold-brewed, lightly sweetened", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400" },
    ]
  };

  return (
    <section id="menu" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">Our Seasonal Menu</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? "bg-brand-terracotta text-white shadow-lg shadow-brand-terracotta/30" : "bg-brand-beige text-brand-coffee hover:bg-brand-beige/80"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-x-12 gap-y-12"
        >
          {menuItems[activeCategory].map((item, i) => (
            <div key={item.name} className="flex gap-6 items-center group">
              <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 border-b border-brand-beige pb-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xl font-serif group-hover:text-brand-terracotta transition-colors">{item.name}</h4>
                  <span className="font-serif font-bold text-lg">₹{item.price}</span>
                </div>
                <p className="text-sm text-brand-coffee/60 mb-3">{item.desc}</p>
                <button 
                  onClick={() => onAddToCart(item)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-terracotta hover:text-brand-coffee transition-colors"
                >
                  <Plus size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-brand-moss text-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Story" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 aspect-square rounded-3xl overflow-hidden border-8 border-brand-moss shadow-2xl hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600" 
                alt="Coffee Detail" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Our Story</span>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight">Crafting Moments, <br /> One Cup at a Time.</h2>
            <p className="text-brand-cream/80 text-lg leading-relaxed mb-8">
              Founded in 2018, Lumina was born out of a passion for simple, honest food and the community that gathers around it. We believe that a café is more than just a place to eat—it's a sanctuary in the heart of the city.
            </p>
            <p className="text-brand-cream/80 text-lg leading-relaxed mb-10">
              Every ingredient we use is sourced from local farmers who share our commitment to quality and sustainability. From our house-roasted beans to our hand-kneaded sourdough, everything is made with intention.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-3xl font-serif mb-1">100%</h4>
                <p className="text-xs uppercase tracking-widest opacity-60">Organic</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif mb-1">15+</h4>
                <p className="text-xs uppercase tracking-widest opacity-60">Local Partners</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif mb-1">6</h4>
                <p className="text-xs uppercase tracking-widest opacity-60">Years of Love</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497933321188-941f9ad36b12?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Captured Moments</h2>
          <p className="text-brand-coffee/60 uppercase tracking-[0.2em] text-sm">Follow us @lumina_cafe</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-coffee/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "18:00",
    guests: "2 People",
    requests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time) {
      alert("Please fill in the required fields.");
      return;
    }

    setIsSubmitting(true);

    // Construct WhatsApp Message
    const message = `*New Table Reservation*\n` +
      `--------------------------\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email || "N/A"}\n` +
      `*Date:* ${formData.date}\n` +
      `*Time:* ${formData.time}\n` +
      `*Guests:* ${formData.guests}\n` +
      `*Special Requests:* ${formData.requests || "None"}\n` +
      `--------------------------\n` +
      `Sent from Lumina Café & Bistro Website`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919999999999?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <section id="reservation" className="py-24 bg-brand-beige/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[3rem] p-20 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-brand-moss rounded-full flex items-center justify-center text-white mx-auto mb-8">
              <Check size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl mb-6">Reservation Sent!</h2>
            <p className="text-xl text-brand-coffee/70 max-w-2xl mx-auto leading-relaxed">
              Thank you for the booking, we are happy to have you as a customer. We will confirm your reservation shortly via WhatsApp.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-10 px-8 py-4 bg-brand-coffee text-brand-cream rounded-xl font-bold hover:bg-brand-terracotta transition-all"
            >
              Book Another Table
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="py-24 bg-brand-beige/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-10 md:p-20">
            <h2 className="text-4xl md:text-5xl mb-8">Reserve Your Table</h2>
            <p className="text-brand-coffee/70 mb-10">We recommend booking at least 24 hours in advance for weekend visits.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-terracotta transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-terracotta transition-colors" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Date *</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-terracotta transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Time *</label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-terracotta transition-colors"
                  >
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Guests</label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-terracotta transition-colors"
                  >
                    <option>2 People</option>
                    <option>4 People</option>
                    <option>6 People</option>
                    <option>8+ People</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-50">Special Requests</label>
                <textarea 
                  value={formData.requests}
                  onChange={(e) => setFormData({...formData, requests: e.target.value})}
                  className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-terracotta transition-colors h-32" 
                  placeholder="Any allergies or celebrations?"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-coffee text-brand-cream rounded-xl font-bold hover:bg-brand-terracotta transition-all duration-300 shadow-xl shadow-brand-coffee/20 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Confirm Reservation"}
              </button>
            </form>
          </div>
          
          <div className="lg:w-1/2 relative min-h-[500px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562064932467!2d77.20661231508226!3d28.613939082424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b718741d847!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin" 
              className="absolute inset-0 w-full h-full grayscale contrast-125"
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
            <div className="absolute inset-0 bg-brand-coffee/10 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-brand-terracotta rounded-full flex items-center justify-center text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Find Us</h4>
                  <p className="text-xs opacity-70">Connaught Place, New Delhi, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-moss rounded-full flex items-center justify-center text-white">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Opening Hours</h4>
                  <p className="text-xs opacity-70">Mon - Sun: 08:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-coffee text-brand-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <h2 className="text-3xl font-serif mb-6 tracking-tight">LUMINA</h2>
            <p className="text-brand-cream/60 max-w-sm mb-8">
              Elevating your daily coffee and dining ritual through aesthetic surroundings and premium flavors.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-cream hover:text-brand-coffee transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-cream hover:text-brand-coffee transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-cream hover:text-brand-coffee transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-40">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#menu" className="hover:text-brand-orange transition-colors">Menu</a></li>
              <li><a href="#about" className="hover:text-brand-orange transition-colors">Our Story</a></li>
              <li><a href="#gallery" className="hover:text-brand-orange transition-colors">Gallery</a></li>
              <li><a href="#reservation" className="hover:text-brand-orange transition-colors">Reservations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-40">Contact</h4>
            <ul className="space-y-4 text-brand-cream/80">
              <li>hello@lumina.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Urban Street, <br /> Downtown City, 90210</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-brand-cream/10 flex flex-col md:row justify-between items-center gap-6 text-xs uppercase tracking-widest opacity-40">
          <p>© 2024 Lumina Café & Bistro. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }: { isOpen: boolean; onClose: () => void; cart: CartItem[]; updateQuantity: (name: string, delta: number) => void; removeFromCart: (name: string) => void }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [isOrdering, setIsOrdering] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    mobile: "",
    address: "",
    landmark: "",
    paymentMethod: "COD",
    location: "",
    bankName: "",
    accountNumber: ""
  });

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCustomerInfo(prev => ({
          ...prev,
          location: `https://www.google.com/maps?q=${latitude},${longitude}`
        }));
        alert("Location captured successfully!");
      }, (error) => {
        alert("Error getting location: " + error.message);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.mobile || !customerInfo.address) {
      alert("Please fill in all required fields.");
      return;
    }

    if (customerInfo.paymentMethod === "ONLINE" && (!customerInfo.bankName || !customerInfo.accountNumber)) {
      alert("Please provide bank and account details for online payment.");
      return;
    }

    setIsOrdering(true);

    // Construct WhatsApp Message
    const itemsList = cart.map(item => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join("\n");
    const message = `*New Order from Lumina Café & Bistro*\n` +
      `--------------------------\n` +
      `*Items:*\n${itemsList}\n` +
      `--------------------------\n` +
      `*Total:* ₹${total}\n` +
      `--------------------------\n` +
      `*Customer Details:*\n` +
      `Name: ${customerInfo.name}\n` +
      `Mobile: ${customerInfo.mobile}\n` +
      `Address: ${customerInfo.address}\n` +
      `Landmark: ${customerInfo.landmark || "N/A"}\n` +
      `Payment: ${customerInfo.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}\n` +
      (customerInfo.paymentMethod === "ONLINE" ? `Bank: ${customerInfo.bankName}\nA/C: ${customerInfo.accountNumber}\n` : "") +
      (customerInfo.location ? `Location: ${customerInfo.location}` : "");

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919999999999?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsOrdering(false);
      setShowCheckout(false);
      onClose();
      alert("Order details sent to WhatsApp!");
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-brand-coffee/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-brand-cream rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  {showCheckout && (
                    <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-brand-beige rounded-full transition-colors">
                      <ChevronRight size={20} className="rotate-180" />
                    </button>
                  )}
                  <h3 className="text-2xl font-serif">{showCheckout ? "Checkout Details" : "Your Order"}</h3>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-brand-beige rounded-full transition-colors"><X size={24} /></button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-brand-coffee/50">Your cart is empty.</p>
                </div>
              ) : !showCheckout ? (
                <>
                  <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map((item) => (
                      <div key={item.name} className="flex gap-4 items-center">
                        <img src={item.img} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <p className="text-xs text-brand-coffee/60">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-brand-beige rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item.name, -1)} className="hover:text-brand-terracotta"><Minus size={14} /></button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.name, 1)} className="hover:text-brand-terracotta"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.name)} className="text-brand-coffee/30 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-brand-beige">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-medium">Total Amount</span>
                      <span className="text-2xl font-serif font-bold text-brand-terracotta">₹{total}</span>
                    </div>
                    
                    <button 
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-4 bg-brand-coffee text-brand-cream rounded-xl font-bold hover:bg-brand-terracotta transition-all flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Full Name *</label>
                    <input 
                      type="text" 
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta" 
                      placeholder="Enter your name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Mobile Number *</label>
                    <input 
                      type="tel" 
                      value={customerInfo.mobile}
                      onChange={(e) => setCustomerInfo({...customerInfo, mobile: e.target.value})}
                      className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta" 
                      placeholder="Enter 10-digit number" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Delivery Address *</label>
                    <textarea 
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta h-20" 
                      placeholder="House No, Street, Area" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Landmark</label>
                    <input 
                      type="text" 
                      value={customerInfo.landmark}
                      onChange={(e) => setCustomerInfo({...customerInfo, landmark: e.target.value})}
                      className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta" 
                      placeholder="e.g. Near City Mall" 
                    />
                  </div>

                  <button 
                    onClick={handleGetLocation}
                    className="w-full py-2.5 border border-brand-terracotta text-brand-terracotta rounded-xl text-xs font-bold hover:bg-brand-terracotta hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin size={14} /> {customerInfo.location ? "Location Captured" : "Use Current Location"}
                  </button>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setCustomerInfo({...customerInfo, paymentMethod: "COD"})}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${customerInfo.paymentMethod === "COD" ? "bg-brand-coffee text-white border-brand-coffee" : "border-brand-beige hover:border-brand-terracotta"}`}
                      >
                        Cash on Delivery
                      </button>
                      <button 
                        onClick={() => setCustomerInfo({...customerInfo, paymentMethod: "ONLINE"})}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${customerInfo.paymentMethod === "ONLINE" ? "bg-brand-coffee text-white border-brand-coffee" : "border-brand-beige hover:border-brand-terracotta"}`}
                      >
                        Online Payment
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {customerInfo.paymentMethod === "ONLINE" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Bank Name *</label>
                          <input 
                            type="text" 
                            value={customerInfo.bankName}
                            onChange={(e) => setCustomerInfo({...customerInfo, bankName: e.target.value})}
                            className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta" 
                            placeholder="e.g. HDFC Bank" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Account Number *</label>
                          <input 
                            type="text" 
                            value={customerInfo.accountNumber}
                            onChange={(e) => setCustomerInfo({...customerInfo, accountNumber: e.target.value})}
                            className="w-full bg-white/50 border border-brand-beige rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta" 
                            placeholder="Enter account number" 
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-4">
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isOrdering}
                      className="w-full py-4 bg-brand-terracotta text-white rounded-xl font-bold hover:bg-brand-coffee transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-terracotta/20"
                    >
                      {isOrdering ? "Sending to WhatsApp..." : "Place Order via WhatsApp"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.name === name) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <FeaturedDishes />
        <AboutSection />
        <MenuSection onAddToCart={addToCart} />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
      />

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-shadow"
      >
        <MessageCircle size={32} fill="white" />
        <span className="absolute -top-2 -right-2 bg-brand-terracotta text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
          Chat Now
        </span>
      </motion.a>
    </div>
  );
}
