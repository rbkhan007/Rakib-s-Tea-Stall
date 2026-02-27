import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Moon, Sun, MessageCircle, User, LogOut, Shield, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useCustomer } from '../context/CustomerContext';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { customer, isAuthenticated, logout } = useCustomer();
  const { admin, isAuthenticated: isAdmin, logout: adminLogout } = useAdmin();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        'border-b py-3'
      )}
      style={{ 
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-light)'
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-light)' }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '20px' }}>☕</span>
          </div>
          <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Rakib's Tea Stall
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors'
              )}
              style={{ 
                color: location.pathname === link.path ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: location.pathname === link.path ? 600 : 500
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--bg-hover)' }}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link 
            to="/cart" 
            className="relative p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--bg-hover)' }}
          >
            <ShoppingCart size={18} style={{ color: 'var(--text-secondary)' }} />
            {totalItems > 0 && (
              <span 
                className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
                style={{ backgroundColor: 'var(--badge)' }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/profile" 
                className="p-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <User size={18} style={{ color: 'var(--accent)' }} />
              </Link>
              <button 
                onClick={logout}
                className="p-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--bg-hover)' }}
                title="Logout"
              >
                <LogOut size={18} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
          ) : (
            <Link 
              to="/profile" 
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--bg-hover)' }}
            >
              <User size={18} style={{ color: 'var(--text-secondary)' }} />
            </Link>
          )}

          {/* Admin Panel Link - Only visible to admin */}
          {isAdmin && (
            <div className="flex items-center gap-2 ml-2 pl-2" style={{ borderLeft: '1px solid var(--border)' }}>
              <Link 
                to="/admin" 
                className="p-2 rounded-lg transition-colors flex items-center gap-2"
                style={{ backgroundColor: 'var(--accent-light)' }}
                title="Admin Panel"
              >
                <Shield size={18} style={{ color: 'var(--accent)' }} />
                <span className="hidden lg:inline text-sm font-medium" style={{ color: 'var(--accent)' }}>Admin</span>
              </Link>
              <button 
                onClick={adminLogout}
                className="p-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--bg-hover)' }}
                title="Admin Logout"
              >
                <LogOut size={18} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
          )}

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full border-t"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-base font-medium py-3 border-b"
                  style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white py-3 rounded-lg mt-2"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>

              {/* Admin Section - Only visible when admin is logged in */}
              {isAdmin && (
                <>
                  <div className="border-t mt-4 pt-4">
                    <p className="text-xs font-semibold px-3 mb-2" style={{ color: 'var(--text-muted)' }}>ADMIN PANEL</p>
                  </div>
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg"
                    style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield size={20} />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/messages"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle size={20} />
                    <span className="font-medium">Messages</span>
                  </Link>
                  <button 
                    onClick={() => { adminLogout(); setIsOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg mt-2"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Admin Logout</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
