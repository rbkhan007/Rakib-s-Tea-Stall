import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin, Coffee, ShieldCheck, TrendingUp, ExternalLink, Sparkles, Leaf, Heart } from 'lucide-react';
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
      setFeaturedTeas(data.slice(0, 3));
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
    { id: 3, name: 'Masala Chai', name_bangla: 'মসলা চা', price: 50, category: 'Signature', description: 'Rich blend of spices', image: '/images/tea-1.png', available: 1 },
  ];

  const defaultTeaOfDay: MenuItem = { id: 5, name: 'Masala Chai', name_bangla: 'মসলা চা', price: 50, category: 'Signature', description: 'Our special blend of cardamom, cloves, and ginger.', image: '/images/tea-1.png', available: 1 };

  const displayTeas = featuredTeas.length > 0 ? featuredTeas : defaultTeas;
  const displayTeaOfDay = teaOfTheDay || defaultTeaOfDay;

  const testimonials = [
    { name: 'Arif Ahmed', role: 'Regular Customer', text: 'Best milk tea in Gulshan! The aroma takes me back to my childhood.', rating: 5 },
    { name: 'Nusrat Jahan', role: 'Food Blogger', text: 'The lemon tea is so refreshing. Perfect place to hang out with friends.', rating: 5 },
    { name: 'Rahim Khan', role: 'Office Worker', text: 'Their Masala Chai is absolutely divine. My go-to spot every morning!', rating: 5 },
  ];

  const whyUs = [
    { icon: Leaf, title: 'Premium Quality', desc: 'Finest tea leaves from Sylhet gardens' },
    { icon: ShieldCheck, title: 'Hygienic', desc: 'Clean water and fresh milk' },
    { icon: Heart, title: 'Made with Love', desc: 'Traditional recipe since 2018' },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="pb-20" style={{ backgroundColor: 'transparent' }}>
      {/* Hero Section - Split Layout */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Bold Typography */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase mb-6"
                style={{ 
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)'
                }}
              >
                <Sparkles size={14} />
                Premium Chai Experience
              </motion.span>
              
              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-medium leading-tight mb-6"
                style={{ 
                  color: 'var(--text-primary)', 
                  fontFamily: 'var(--font-display)'
                }}
              >
                Elevate Your
                <br />
                <span className="text-gradient-gold">Tea Experience</span>
              </motion.h1>
              
              <motion.p
                variants={fadeInUp}
                className="text-lg mb-8 max-w-md"
                style={{ color: 'var(--text-secondary)' }}
              >
                Discover the finest authentic Bangladeshi chai, crafted with premium ingredients and traditional expertise since 2018.
              </motion.p>
              
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4"
              >
                <Link to="/menu" className="btn-luxury btn-primary-luxury gap-2">
                  Explore Menu
                  <ArrowRight size={16} />
                </Link>
                <a 
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury btn-secondary-luxury gap-2"
                >
                  <ExternalLink size={16} />
                  Order Now
                </a>
              </motion.div>
            </motion.div>

            {/* Right - Floating Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="aspect-square flex items-center justify-center"
                  style={{ 
                    background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)'
                  }}
                >
                  <img 
                    src={displayTeaOfDay.image || '/images/tea-1.png'} 
                    alt={displayTeaOfDay.name}
                    className="w-80 h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 30px 50px rgba(197, 163, 88, 0.3))' }}
                    loading="eager"
                  />
                </motion.div>
              </div>
              {/* Decorative elements */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-30"
                style={{ 
                  background: 'conic-gradient(from 0deg, transparent, var(--accent), transparent)',
                  animation: 'spin 20s linear infinite'
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tea of the Day - Featured */}
      <section className="section-py">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="luxury-card rounded-3xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div 
                className="relative aspect-square lg:aspect-auto p-12 flex items-center justify-center"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={displayTeaOfDay.image || '/images/tea-1.png'} 
                  alt={displayTeaOfDay.name}
                  className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
                  loading="lazy"
                />
                <span 
                  className="absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider"
                  style={{ 
                    backgroundColor: 'var(--accent)',
                    color: 'white'
                  }}
                >
                  Today's Choice
                </span>
              </div>
              
              {/* Content */}
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <span 
                  className="text-xs font-medium uppercase tracking-widest mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Featured
                </span>
                <h2 
                  className="text-4xl lg:text-5xl mb-3"
                  style={{ 
                    color: 'var(--text-primary)', 
                    fontFamily: 'var(--font-display)'
                  }}
                >
                  {displayTeaOfDay.name}
                </h2>
                <p 
                  className="font-medium mb-4"
                  style={{ color: 'var(--accent)' }}
                >
                  {displayTeaOfDay.name_bangla}
                </p>
                <p 
                  className="mb-8 max-w-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {displayTeaOfDay.description}
                </p>
                <div className="flex items-center gap-6">
                  <span 
                    className="text-4xl font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ৳{displayTeaOfDay.price}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(displayTeaOfDay)}
                    className="btn-luxury btn-primary-luxury"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers - Product Grid */}
      <section className="section-py">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl lg:text-5xl mb-4"
              style={{ 
                color: 'var(--text-primary)', 
                fontFamily: 'var(--font-display)'
              }}
            >
              Our Signature Collection
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
              Handcrafted chai blends made with the finest ingredients
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {displayTeas.map((tea, idx) => (
              <motion.div
                key={tea.id}
                variants={fadeInUp}
                className="luxury-card rounded-2xl group"
              >
                <div className="aspect-[4/5] p-8 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <img 
                    src={tea.image || '/images/placeholder.svg'} 
                    alt={tea.name} 
                    className="w-48 h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div 
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent)'
                    }}
                  >
                    {tea.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-medium mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{tea.name}</h3>
                  <p style={{ color: 'var(--accent)' }} className="font-medium text-sm mb-4">{tea.name_bangla}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium" style={{ color: 'var(--text-primary)' }}>৳{tea.price}</span>
                    <button 
                      onClick={() => handleAddToCart(tea)}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                        color: 'white'
                      }}
                    >
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link to="/menu" className="btn-luxury btn-secondary-luxury gap-2">
              View Full Menu
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl lg:text-5xl mb-4"
              style={{ 
                color: 'var(--text-primary)', 
                fontFamily: 'var(--font-display)'
              }}
            >
              Why Rakib's Tea
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
              Experience the perfect blend of tradition and quality
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {whyUs.map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="text-center p-8"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--accent-light) 0%, rgba(197, 163, 88, 0.08) 100%)'
                  }}
                >
                  <item.icon size={28} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-py">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl lg:text-5xl mb-4"
              style={{ 
                color: 'var(--text-primary)', 
                fontFamily: 'var(--font-display)'
              }}
            >
              What Our Guests Say
            </h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="luxury-card rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent)" stroke="var(--accent)" />
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)' }} className="mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                      color: 'white'
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                    <p style={{ color: 'var(--text-muted)' }} className="text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section className="pb-20">
        <div className="container-luxury">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="luxury-card rounded-3xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-16">
                <h2 
                  className="text-4xl mb-8"
                  style={{ 
                    color: 'var(--text-primary)', 
                    fontFamily: 'var(--font-display)'
                  }}
                >
                  Visit Us
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--accent-light)' }}
                    >
                      <MapPin size={20} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Location</p>
                      <p style={{ color: 'var(--text-secondary)' }}>House 12, Road 90, Gulshan-2, Dhaka</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--accent-light)' }}
                    >
                      <Clock size={20} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Hours</p>
                      <p style={{ color: 'var(--text-secondary)' }}>Daily: 8AM - 11PM</p>
                    </div>
                  </div>
                </div>
                <Link to="/contact" className="btn-luxury btn-primary-luxury mt-10">
                  Contact Us
                </Link>
              </div>
              <div className="min-h-[400px]" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
