import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Search, Sparkles, X, ExternalLink, Coffee } from 'lucide-react';
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

const Menu = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultMenuItems: MenuItem[] = [
    { id: 1, name: 'Milk Tea', name_bangla: 'দুধ চা', price: 40, category: 'Signature', description: 'Our famous creamy milk tea with secret spices.', image: '/images/tea-1.png', available: 1 },
    { id: 2, name: 'Black Tea', name_bangla: 'রং চা', price: 20, category: 'Classic', description: 'Strong and aromatic black tea brewed to perfection.', image: '/images/tea-2.png', available: 1 },
    { id: 3, name: 'Lemon Tea', name_bangla: 'লেবু চা', price: 25, category: 'Refreshing', description: 'Zesty and refreshing lemon tea with a hint of ginger.', image: '/images/tea-3.png', available: 1 },
    { id: 4, name: 'Green Tea', name_bangla: 'গ্রিন টি', price: 35, category: 'Healthy', description: 'Pure organic green tea leaves for a healthy boost.', image: '/images/tea-4.png', available: 1 },
    { id: 5, name: 'Masala Chai', name_bangla: 'মসলা চা', price: 50, category: 'Signature', description: 'Rich milk tea infused with cardamom, cloves, and ginger.', image: '/images/tea-1.png', available: 1 },
    { id: 6, name: 'Ginger Tea', name_bangla: 'আদা চা', price: 25, category: 'Classic', description: 'Classic black tea with fresh crushed ginger.', image: '/images/tea-2.png', available: 1 },
    { id: 7, name: 'Iced Lemon Tea', name_bangla: 'আইস লেবু চা', price: 45, category: 'Refreshing', description: 'Chilled lemon tea served with fresh mint leaves.', image: '/images/tea-3.png', available: 1 },
    { id: 8, name: 'Honey Green Tea', name_bangla: 'মধু গ্রিন টি', price: 55, category: 'Healthy', description: 'Green tea sweetened with pure organic honey.', image: '/images/tea-4.png', available: 1 },
  ];

  const displayItems = menuItems.length > 0 ? menuItems : defaultMenuItems;
  const categories = ['All', 'Signature', 'Classic', 'Refreshing', 'Healthy'];

  const filteredItems = displayItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.name_bangla && item.name_bangla.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

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

  const handleWhatsAppOrder = (item: MenuItem) => {
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000';
    const message = `Hi! I'd like to order:\n\n${item.name} - ৳${item.price}\n\nPlease confirm my order.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-28 pb-20" style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span 
            className="inline-block px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            Our Collection
          </span>
          <h1 
            className="text-5xl lg:text-6xl mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            The Menu
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-md mx-auto">
            Discover our handcrafted selection of premium chai blends
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          <div className="input-icon-wrapper flex-1">
            <Search className="icon" size={18} />
            <input
              type="text"
              placeholder="Search for teas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full"
              style={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--border-light)', 
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <button
            onClick={() => setShowQuiz(true)}
            className="btn-luxury btn-primary-luxury flex-center-gap"
          >
            <Sparkles size={16} />
            Find My Tea
          </button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor: activeCategory === cat 
                  ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' 
                  : 'var(--bg-card)',
                background: activeCategory === cat 
                  ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' 
                  : undefined,
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                border: activeCategory === cat ? 'none' : '1px solid var(--border-light)',
                boxShadow: activeCategory === cat 
                  ? '0 4px 15px rgba(197, 163, 88, 0.3)' 
                  : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full mx-auto" style={{ background: 'var(--accent-light)' }}>
              <Coffee className="w-6 h-6 mx-auto mt-3 animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
            <p style={{ color: 'var(--text-secondary)' }} className="mt-4">Loading menu...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="luxury-card rounded-2xl group"
                >
                  <div 
                    className="aspect-square p-8 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <img 
                      src={item.image || '/images/placeholder.svg'} 
                      alt={item.name} 
                      className="w-40 h-40 object-contain transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <span 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: 'var(--accent-light)',
                        color: 'var(--accent)'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 
                      className="text-xl font-medium mb-1"
                      style={{ 
                        color: 'var(--text-primary)', 
                        fontFamily: 'var(--font-display)'
                      }}
                    >
                      {item.name}
                    </h3>
                    <p style={{ color: 'var(--accent)' }} className="font-medium text-sm mb-3">{item.name_bangla}</p>
                    <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-medium" style={{ color: 'var(--text-primary)' }}>৳{item.price}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleWhatsAppOrder(item)}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                          style={{ 
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                          style={{ 
                            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(197, 163, 88, 0.3)'
                          }}
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Tea Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="luxury-card rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl">Find Your Perfect Tea</h3>
                <button onClick={() => { setShowQuiz(false); setQuizStep(0); setQuizResult(null); }}>
                  <X size={20} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
              
              {!quizResult ? (
                <div>
                  {quizStep === 0 && (
                    <div>
                      <p style={{ color: 'var(--text-secondary)' }} className="mb-4">How do you like your tea?</p>
                      <div className="space-y-3">
                        {['Strong & Bold', 'Light & Refreshing', 'Balanced'].map((option, i) => (
                          <button
                            key={option}
                            onClick={() => setQuizStep(1)}
                            className="w-full p-4 rounded-xl text-left transition-all duration-200"
                            style={{ 
                              backgroundColor: 'var(--bg-secondary)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {quizStep === 1 && (
                    <div>
                      <p style={{ color: 'var(--text-secondary)' }} className="mb-4">What's your flavor preference?</p>
                      <div className="space-y-3">
                        {['Spicy (Masala)', 'Citrus (Lemon)', 'Herbal'].map((option, i) => (
                          <button
                            key={option}
                            onClick={() => setQuizResult('Signature')}
                            className="w-full p-4 rounded-xl text-left transition-all duration-200"
                            style={{ 
                              backgroundColor: 'var(--bg-secondary)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p style={{ color: 'var(--accent)' }} className="text-lg font-medium mb-2">We recommend:</p>
                  <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-2xl mb-4">
                    {quizResult === 'Signature' ? 'Masala Chai' : 'Milk Tea'}
                  </h4>
                  <button 
                    onClick={() => handleAddToCart({ id: 1, name: 'Masala Chai', name_bangla: 'মসলা চা', price: 50, category: 'Signature', description: '', image: '/images/tea-1.png', available: 1 })}
                    className="btn-luxury btn-primary-luxury"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
