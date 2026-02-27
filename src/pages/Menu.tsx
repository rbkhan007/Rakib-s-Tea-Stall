import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Search, Sparkles, Coffee, Zap, Heart, Thermometer, X, ExternalLink } from 'lucide-react';
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

  // Default menu when API fails
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
    const message = `Hi! I'd like to order:\n\n${item.name} - Tk${item.price}\n\nPlease confirm my order.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const accentColor = 'var(--accent)';
  const textPrimary = 'var(--text-primary)';
  const textSecondary = 'var(--text-secondary)';
  const bgCard = 'var(--bg-card)';
  const bgHover = 'rgba(255, 255, 255, 0.05)';
  const bgLight = 'var(--accent-light)';

  return (
    <div className="pt-24 pb-16" style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: textPrimary }}>Our Menu</h1>
          <p style={{ color: textSecondary }}>Discover our delicious tea selection</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} style={{ color: textSecondary }} />
            <input
              type="text"
              placeholder="Search teas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border"
              style={{ backgroundColor: bgCard, borderColor: 'var(--border)', color: textPrimary }}
            />
          </div>
          <button
            onClick={() => setShowQuiz(true)}
            className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
            style={{ backgroundColor: accentColor, color: 'white' }}
          >
            Find My Tea
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full font-medium transition-all"
              style={{
                backgroundColor: activeCategory === cat ? accentColor : bgCard,
                color: activeCategory === cat ? 'white' : textSecondary,
                border: `1px solid ${activeCategory === cat ? accentColor : 'var(--border)'}`
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p style={{ color: textSecondary }}>Loading menu...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl overflow-hidden transition-shadow"
                style={{ 
                  backgroundColor: bgCard, 
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border)'
                }}
              >
                <div className="aspect-square relative" style={{ backgroundColor: bgCard }}>
                  <img 
                    src={item.image || '/images/placeholder.svg'} 
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                  <span 
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: bgLight, color: accentColor }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg" style={{ color: textPrimary }}>{item.name}</h3>
                  <p style={{ color: accentColor }} className="text-sm mb-2">{item.name_bangla}</p>
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: textSecondary }}>{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: textPrimary }}>Tk{item.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                        style={{ backgroundColor: accentColor, color: 'white' }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => handleWhatsAppOrder(item)}
                        className="p-2 rounded-lg transition-all hover:scale-105"
                        style={{ backgroundColor: '#25D366', color: 'white' }}
                        title="Order via WhatsApp"
                      >
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Coffee className="mx-auto mb-4" size={48} style={{ color: textSecondary }} />
            <p style={{ color: textSecondary }}>No teas found matching your search</p>
          </div>
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
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowQuiz(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="rounded-2xl p-6 max-w-md w-full"
              style={{ backgroundColor: bgCard }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold" style={{ color: textPrimary }}>Find Your Perfect Tea</h3>
                <button onClick={() => setShowQuiz(false)}>
                  <X size={24} style={{ color: textSecondary }} />
                </button>
              </div>
              {quizStep === 0 && (
                <div>
                  <p className="mb-4" style={{ color: textSecondary }}>How are you feeling right now?</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setQuizResult('Masala Chai'); setQuizStep(1); }}
                      className="w-full p-3 rounded-lg text-left transition-colors"
                      style={{ backgroundColor: bgHover }}
                    >
                      <Zap size={18} className="inline mr-2" style={{ color: accentColor }} />
                      Tired & Sleepy
                    </button>
                    <button
                      onClick={() => { setQuizResult('Green Tea'); setQuizStep(1); }}
                      className="w-full p-3 rounded-lg text-left transition-colors"
                      style={{ backgroundColor: bgHover }}
                    >
                      <Heart size={18} className="inline mr-2" style={{ color: accentColor }} />
                      Stressed
                    </button>
                    <button
                      onClick={() => { setQuizResult('Iced Lemon Tea'); setQuizStep(1); }}
                      className="w-full p-3 rounded-lg text-left transition-colors"
                      style={{ backgroundColor: bgHover }}
                    >
                      <Thermometer size={18} className="inline mr-2" style={{ color: accentColor }} />
                      Hot & Sweaty
                    </button>
                    <button
                      onClick={() => { setQuizResult('Milk Tea'); setQuizStep(1); }}
                      className="w-full p-3 rounded-lg text-left transition-colors"
                      style={{ backgroundColor: bgHover }}
                    >
                      <Coffee size={18} className="inline mr-2" style={{ color: accentColor }} />
                      Just Hungry
                    </button>
                  </div>
                </div>
              )}
              {quizStep === 1 && quizResult && (
                <div className="text-center">
                  <Sparkles className="mx-auto mb-4" size={48} style={{ color: accentColor }} />
                  <h4 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>We recommend:</h4>
                  <p className="text-2xl font-bold mb-4" style={{ color: accentColor }}>{quizResult}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setQuizStep(0); setQuizResult(null); }}
                      className="flex-1 py-2 rounded-lg"
                      style={{ backgroundColor: bgHover, color: textPrimary }}
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="flex-1 py-2 rounded-lg"
                      style={{ backgroundColor: accentColor, color: 'white' }}
                    >
                      Great!
                    </button>
                  </div>
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
