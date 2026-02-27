import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div 
              className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <ShoppingBag size={48} style={{ color: 'var(--accent)' }} />
            </div>
            <h1 
              className="text-4xl font-medium mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Your Cart is Empty
            </h1>
            <p style={{ color: 'var(--text-secondary)' }} className="mb-8">
              Looks like you haven't added any tea to your cart yet.
            </p>
            <Link 
              to="/menu" 
              className="btn-luxury btn-primary-luxury"
            >
              Browse Menu
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl lg:text-6xl mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            Your Cart
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="luxury-card rounded-2xl p-5 flex items-center gap-5"
                >
                  {/* Image */}
                  <div 
                    className="w-24 h-24 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <img 
                      src={item.image || '/images/placeholder.svg'} 
                      alt={item.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg truncate" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: 'var(--accent)' }} className="font-medium">৳{item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right shrink-0">
                    <p className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
                      ৳{item.price * item.quantity}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-full transition-all hover:bg-red-50"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card rounded-2xl p-6 sticky top-28"
            >
              <h2 
                className="text-xl font-medium mb-6"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>৳{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Delivery</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>৳30</span>
                </div>
                <div className="h-px" style={{ backgroundColor: 'var(--border-light)' }} />
                <div className="flex justify-between text-lg">
                  <span style={{ color: 'var(--text-primary)' }}>Total</span>
                  <span className="font-medium" style={{ color: 'var(--accent)' }}>৳{totalPrice + 30}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="btn-luxury btn-primary-luxury w-full justify-center"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-[1.02]"
                  style={{ 
                    background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                    color: 'white'
                  }}
                >
                  <MessageCircle size={18} />
                  Order via WhatsApp
                </button>
              </div>

              <button
                onClick={clearCart}
                className="w-full mt-4 text-sm transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                Clear Cart
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
