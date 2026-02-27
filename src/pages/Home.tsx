import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin, Coffee, ShieldCheck, TrendingUp, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface MenuItem {
  id: number;
  name: string;
  name_bangla: string;
  price: number;
  category: string;
  description: string;
  image: string;
  available: number;
}

const Home = () => {
  const { addToCart } = useCart();
  const [featuredTeas, setFeaturedTeas] = useState<MenuItem[]>([]);
  const [teaOfTheDay, setTeaOfTheDay] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setFeaturedTeas(data.slice(0, 4));
      if (data.length > 0) {
        setTeaOfTheDay(data.find((item: MenuItem) => item.category === 'Signature') || data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id.toString(),
      name: item.name,
      nameBangla: item.name_bangla || '',
      price: item.price,
      image: item.image || '/images/tea-1.png'
    });
    toast.success(`${item.name} added to cart!`);
  };

  // Default teas when API fails
  const defaultTeas: MenuItem[] = [
    { id: 1, name: 'Milk Tea', name_bangla: 'দুধ চা', price: 40, category: 'Signature', description: 'Our famous creamy milk tea', image: '/images/tea-1.png', available: 1 },
    { id: 2, name: 'Black Tea', name_bangla: 'রং চা', price: 20, category: 'Classic', description: 'Strong and aromatic', image: '/images/tea-2.png', available: 1 },
    { id: 3, name: 'Lemon Tea', name_bangla: 'লেবু চা', price: 25, category: 'Refreshing', description: 'Zesty and refreshing', image: '/images/tea-3.png', available: 1 },
    { id: 4, name: 'Green Tea', name_bangla: 'গ্রিন টি', price: 35, category: 'Healthy', description: 'Pure organic green tea', image: '/images/tea-4.png', available: 1 },
  ];

  const defaultTeaOfDay: MenuItem = { id: 5, name: 'Masala Chai', name_bangla: 'মসলা চা', price: 50, category: 'Signature', description: 'Our special blend of cardamom, cloves, and ginger.', image: '/images/tea-1.png', available: 1 };

  const displayTeas = featuredTeas.length > 0 ? featuredTeas : defaultTeas;
  const displayTeaOfDay = teaOfTheDay || defaultTeaOfDay;

  const testimonials = [
    { name: 'Arif Ahmed', role: 'Regular Customer', text: 'Best milk tea in Gulshan! The aroma takes me back to my childhood.' },
    { name: 'Nusrat Jahan', role: 'Food Blogger', text: 'The lemon tea is so refreshing. Perfect place to hang out with friends.' },
  ];

  const whyUs = [
    { icon: Coffee, title: 'Premium Quality', desc: 'Finest tea leaves from Sylhet gardens' },
    { icon: ShieldCheck, title: 'Hygienic', desc: 'Clean water and fresh milk' },
    { icon: TrendingUp, title: 'Authentic Taste', desc: 'Secret spice blend since 2018' },
  ];

  const accentColor = 'var(--accent)';
  const textPrimary = 'var(--text-primary)';
  const textSecondary = 'var(--text-secondary)';
  const bgCard = 'var(--bg-card)';
  const bgHover = 'var(--bg-hover)';
  const bgLight = 'var(--accent-light)';

  return (
    <div className="pb-12" style={{ backgroundColor: 'transparent' }}>
      {/* Simple Clean Header */}
      <section 
        className="border-b py-16"
        style={{ backgroundColor: 'transparent', borderColor: 'var(--border)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: textPrimary, fontFamily: 'Georgia, serif' }}>
              Rakib's Tea Stall
            </h1>
            <p style={{ color: textSecondary, fontFamily: 'system-ui, sans-serif' }} className="text-lg mb-8">
              Freshly brewed authentic Bangladeshi chai • Since 2018
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                to="/menu" 
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: accentColor, color: 'white' }}
              >
                View Menu
              </Link>
              <a 
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
                style={{ backgroundColor: '#25D366', color: 'white' }}
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tea of the Day - Glassmorphism Card */}
      <section className="py-12" style={{ backgroundColor: 'transparent' }}>
        <div className="container mx-auto px-4">
          <div 
            className="rounded-3xl p-8 max-w-4xl mx-auto relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            {/* Tea product image */}
            <div className="absolute top-0 right-0 w-64 h-64 flex items-center justify-center">
              <img 
                src={displayTeaOfDay.image || '/images/tea-1.png'} 
                alt={displayTeaOfDay.name}
                className="w-56 h-56 object-contain drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #8B4513 0%, transparent 70%)' }}
            />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <span 
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: 'rgba(249,115,22,0.2)', color: accentColor }}
              >
                ✨ Special
              </span>
              <h2 className="text-2xl font-bold" style={{ color: textPrimary }}>Tea of the Day</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="flex-1">
                <h3 className="text-3xl font-bold" style={{ color: textPrimary, fontFamily: 'Georgia, serif' }}>{displayTeaOfDay.name}</h3>
                <p style={{ color: accentColor }} className="font-medium">{displayTeaOfDay.name_bangla}</p>
                <p style={{ color: textSecondary, fontFamily: 'system-ui, sans-serif' }} className="mt-3">{displayTeaOfDay.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-3xl font-bold" style={{ color: accentColor }}>৳{displayTeaOfDay.price}</span>
                  <button 
                    onClick={() => handleAddToCart(displayTeaOfDay)}
                    className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg"
                    style={{ 
                      backgroundColor: accentColor, 
                      color: 'white',
                      boxShadow: '0 4px 15px rgba(249,115,22,0.3)'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers - Simple Grid */}
      <section className="py-12" style={{ backgroundColor: 'transparent' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: textPrimary }}>Our Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {displayTeas.map((tea, idx) => (
              <motion.div
                key={tea.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden transition-shadow"
                style={{ 
                  backgroundColor: bgCard, 
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border)'
                }}
              >
                <div className="aspect-square" style={{ backgroundColor: bgCard }}>
                  <img 
                    src={tea.image || '/images/placeholder.svg'} 
                    alt={tea.name} 
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg" style={{ color: textPrimary }}>{tea.name}</h3>
                  <p style={{ color: accentColor }} className="font-medium text-sm">{tea.name_bangla}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold" style={{ color: textPrimary }}>৳{tea.price}</span>
                    <button 
                      onClick={() => handleAddToCart(tea)}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                      style={{ backgroundColor: bgHover, color: textPrimary }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/menu" className="inline-flex items-center gap-2 font-semibold hover:underline" style={{ color: accentColor }}>
              View Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Simple */}
      <section className="py-12" style={{ backgroundColor: 'transparent' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: textPrimary }}>Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyUs.map((item, i) => (
              <div 
                key={i} 
                className="rounded-xl p-6 text-center"
                style={{ 
                  backgroundColor: bgCard, 
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border)'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: bgLight }}
                >
                  <item.icon size={24} style={{ color: accentColor }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: textPrimary }}>{item.title}</h3>
                <p style={{ color: textSecondary }} className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Simple */}
      <section className="py-12" style={{ backgroundColor: 'transparent' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: textPrimary }}>What Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="rounded-xl p-6"
                style={{ 
                  backgroundColor: bgCard, 
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border)'
                }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={accentColor} stroke={accentColor} />)}
                </div>
                <p style={{ color: textSecondary }} className="mb-4">"{t.text}"</p>
                <p className="font-semibold" style={{ color: textPrimary }}>{t.name}</p>
                <p style={{ color: textSecondary }} className="text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location - Simple */}
      <section className="py-12" style={{ backgroundColor: 'transparent' }}>
        <div className="container mx-auto px-4">
          <div 
            className="rounded-2xl overflow-hidden max-w-4xl mx-auto"
            style={{ backgroundColor: bgCard, boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>Visit Us</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin style={{ color: accentColor }} className="mt-1" size={20} />
                    <div>
                      <p className="font-semibold" style={{ color: textPrimary }}>Location</p>
                      <p style={{ color: textSecondary }}>House 12, Road 90, Gulshan-2, Dhaka</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock style={{ color: accentColor }} className="mt-1" size={20} />
                    <div>
                      <p className="font-semibold" style={{ color: textPrimary }}>Hours</p>
                      <p style={{ color: textSecondary }}>Daily: 8AM - 11PM</p>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/contact"
                  className="inline-block mt-6 px-5 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                >
                  Contact Us
                </Link>
              </div>
              <div className="h-64 md:h-auto" style={{ backgroundColor: bgHover }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5983460988937!2d90.4125181!3d23.7918822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c3649d393d58a7!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
