import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Moon, Sun, MessageCircle, User, Play, BarChart3 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useCustomer } from '../context/CustomerContext';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { customer, isAuthenticated, logout } = useCustomer();
  const { admin, isAuthenticated: isAdmin, logout: adminLogout } = useAdmin();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000';

  return (
    <>
      {/* Spacer for floating navbar */}
      <div className="h-24" />
      
      <nav
        className={cn(
          'fixed top-4 left-4 right-4 z-50 transition-all duration-500',
          scrolled ? 'mt-0' : 'mt-0'
        )}
      >
        <div 
          className={cn(
            'mx-auto max-w-6xl transition-all duration-500',
            scrolled ? 'rounded-2xl' : 'rounded-full'
          )}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex justify-between items-center h-16 px-6">
            {/* Logo - Far Left */}
            <Link to="/" className="flex items-center gap-2 group">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #C5A358 0%, #B8934A 100%)',
                  boxShadow: '0 4px 15px rgba(197, 163, 88, 0.3)'
                }}
              >
                <span className="text-lg">☕</span>
              </div>
              <span 
                className="text-lg font-medium hidden sm:block"
                style={{ 
                  color: '#1A1A1A',
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                Rakib's Tea Stall
              </span>
            </Link>

            {/* Desktop Menu - Center */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative text-sm font-medium transition-colors duration-300 group"
                    style={{ 
                      color: isActive ? '#C5A358' : '#4A4A4A',
                      fontWeight: isActive ? 600 : 400
                    }}
                  >
                    {link.name}
                    {/* Animated underline */}
                    <span 
                      className={cn(
                        'absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300',
                        isActive ? 'w-full' : 'w-0'
                      )}
                      style={{ backgroundColor: '#C5A358' }}
                    />
                    <span 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: '#C5A358' }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Actions - Far Right */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full transition-all duration-300 hover:bg-black/5"
                title={theme === 'light' ? 'Dark mode' : 'Light mode'}
              >
                {theme === 'light' ? (
                  <Moon size={18} className="text-gray-600" />
                ) : (
                  <Sun size={18} style={{ color: '#C5A358' }} />
                )}
              </button>

              {/* Cart */}
              <Link 
                to="/cart" 
                className="relative p-2.5 rounded-full transition-all duration-300 hover:bg-black/5"
              >
                <ShoppingCart size={18} className="text-gray-600" />
                {totalItems > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full"
                    style={{ 
                      background: 'linear-gradient(135deg, #C5A358 0%, #B8934A 100%)'
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User */}
              {isAuthenticated ? (
                <Link 
                  to="/profile" 
                  className="p-2.5 rounded-full transition-all duration-300 hover:bg-black/5"
                >
                  <User size={18} className="text-gray-600" />
                </Link>
              ) : (
                <Link 
                  to="/profile" 
                  className="p-2.5 rounded-full transition-all duration-300 hover:bg-black/5"
                >
                  <User size={18} className="text-gray-600" />
                </Link>
              )}

              {/* Admin */}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="p-2.5 rounded-full transition-all duration-300 hover:bg-black/5"
                  title="Admin Panel"
                >
                  <BarChart3 size={18} style={{ color: '#C5A358' }} />
                </Link>
              )}

              {/* CTA Button - Pill Shaped */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#0B1C14',
                  boxShadow: '0 4px 15px rgba(11, 28, 20, 0.3)'
                }}
              >
                <MessageCircle size={14} />
                Order Now
              </a>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2.5 rounded-full transition-all duration-300 hover:bg-black/5"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X size={20} className="text-gray-800" />
                ) : (
                  <Menu size={20} className="text-gray-800" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-2 mx-auto max-w-6xl rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center justify-between px-5 py-4 rounded-xl text-base font-medium transition-all duration-200"
                      style={{ 
                        color: isActive ? '#C5A358' : '#1A1A1A',
                        backgroundColor: isActive ? 'rgba(197, 163, 88, 0.1)' : 'transparent'
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                      {isActive && (
                        <span 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: '#C5A358' }}
                        />
                      )}
                    </Link>
                  );
                })}
                
                <div className="h-px bg-gray-200 my-2" />
                
                {/* Mobile CTA */}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-full text-base font-medium text-white mt-2"
                  style={{ 
                    backgroundColor: '#0B1C14'
                  }}
                >
                  <MessageCircle size={18} />
                  Order Now via WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
