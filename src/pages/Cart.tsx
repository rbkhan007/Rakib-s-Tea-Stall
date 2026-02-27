import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, MessageCircle, ArrowLeft as BackIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleWhatsAppOrder = () => {
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000';
    let message = `🧋 *Order from Rakib's Tea Stall*\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} = ৳${item.price * item.quantity}\n`;
    });
    message += `\n*Total: ৳${totalPrice + 30}* (incl. delivery)`;
    message += `\n\nPlease confirm my order!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div 
        className="pt-24 pb-16 text-center min-h-screen"
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          fontFamily: 'var(--font-family)'
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)'
              }}
            >
              <ShoppingBag size={48} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <h1 
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Your cart is empty
            </h1>
            <p style={{ color: 'var(--text-secondary)' }} className="mb-8">Looks like you haven't added any tea to your cart yet.</p>
            <Link 
              to="/menu" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold hover:scale-105 transition-transform"
              style={{ 
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 20px var(--accent-light)'
              }}
            >
              <BackIcon size={20} /> Back to Menu
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="pt-24 pb-16 min-h-screen"
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        fontFamily: 'var(--font-family)'
      }}
    >
      <div className="container mx-auto px-4">
        <h1 
          className="text-4xl font-bold mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6"
                >
                  <div 
                    className="w-24 h-24 rounded-2xl shrink-0 overflow-hidden"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.name}
                    </h3>
                    <p 
                      className="text-sm font-medium"
                      style={{ color: 'var(--accent)' }}
                    >
                      {item.nameBangla}
                    </p>
                    <p 
                      className="font-bold mt-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      ৳{item.price}
                    </p>
                  </div>
                  <div 
                    className="flex items-center gap-4 px-4 py-2 rounded-full"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <Minus size={18} />
                    </button>
                    <span 
                      className="font-bold w-8 text-center"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p 
                      className="font-bold text-lg"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 rounded-full transition-colors"
                    style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-6">
              <Link 
                to="/menu" 
                className="flex items-center gap-2 font-bold transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ArrowLeft size={18} /> Continue Shopping
              </Link>
              <button 
                onClick={clearCart}
                className="font-bold hover:underline"
                style={{ color: '#ef4444' }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div 
              className="p-8 rounded-[2rem] sticky top-32"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)'
              }}
            >
              <h2 
                className="text-2xl font-bold mb-8"
                style={{ color: 'var(--text-primary)' }}
              >
                Order Summary
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>৳{totalPrice}</span>
                </div>
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Delivery Fee</span>
                  <span>৳30</span>
                </div>
                <div 
                  className="h-px my-4"
                  style={{ backgroundColor: 'var(--border)' }}
                />
                <div className="flex justify-between text-2xl font-bold">
                  <span style={{ color: 'var(--text-primary)' }}>Total</span>
                  <span style={{ color: 'var(--accent)' }}>৳{totalPrice + 30}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full py-5 rounded-2xl text-white font-bold text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  boxShadow: '0 0 20px var(--accent-light)'
                }}
              >
                Checkout <CreditCard size={20} />
              </button>
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg mt-3"
                style={{ 
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
                }}
              >
                <MessageCircle size={20} /> Order via WhatsApp
              </button>
              <div className="mt-8 flex items-center justify-center gap-4">
                <img src="/images/BKash-Icon-Logo.wine.svg" alt="bKash" className="h-8" />
                <img src="/images/Nagad-Logo.wine.svg" alt="Nagad" className="h-8" />
                <img src="/images/Visa_Inc.-Logo.wine.svg" alt="Visa" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
