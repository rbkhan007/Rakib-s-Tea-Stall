import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, MessageCircle, Coffee, ArrowRight } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000';
  
  return (
    <footer 
      className="pt-20 pb-8 border-t"
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border-light)'
      }}
    >
      <div className="container-luxury">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                  boxShadow: '0 4px 20px rgba(197, 163, 88, 0.3)'
                }}
              >
                <span className="text-xl">☕</span>
              </div>
              <span 
                className="text-lg font-medium"
                style={{ 
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)'
                }}
              >
                Rakib's Tea
              </span>
            </Link>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
              Serving premium authentic Bangladeshi chai with love and premium ingredients since 2018.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)'
                }}
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)'
                }}
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)'
                }}
              >
                <Twitter size={16} />
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                  color: 'white'
                }}
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-sm font-medium uppercase tracking-widest mb-6"
              style={{ 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)'
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Menu', path: '/menu' },
                { name: 'Our Story', path: '/about' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Reviews', path: '/reviews' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="flex items-center gap-2 text-sm transition-all duration-200 hover:translate-x-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ArrowRight size={12} style={{ color: 'var(--accent)', opacity: 0 }} />
                    <span className="hover:text-[var(--accent)]">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-sm font-medium uppercase tracking-widest mb-6"
              style={{ 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)'
              }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: 'var(--accent-light)' }}
                >
                  <MapPin size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                  House 12, Road 90,<br />
                  Gulshan-2, Dhaka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--accent-light)' }}
                >
                  <Phone size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">+880 1712 345678</span>
              </li>
              <li className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--accent-light)' }}
                >
                  <Mail size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">hello@rakibsteastall.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 
              className="text-sm font-medium uppercase tracking-widest mb-6"
              style={{ 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)'
              }}
            >
              Hours
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Mon - Thu</span>
                <span style={{ color: 'var(--text-primary)' }}>8AM - 11PM</span>
              </li>
              <li className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Fri - Sat</span>
                <span style={{ color: 'var(--text-primary)' }}>8AM - 12AM</span>
              </li>
              <li className="flex justify-between py-2" style={{ borderColor: 'var(--border-light)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Sunday</span>
                <span style={{ color: 'var(--text-primary)' }}>10AM - 10PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--border-light)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Rakib's Tea Stall. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/privacy" 
              className="text-sm transition-colors hover:text-[var(--accent)]" 
              style={{ color: 'var(--text-secondary)' }}
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm transition-colors hover:text-[var(--accent)]" 
              style={{ color: 'var(--text-secondary)' }}
            >
              Terms
            </Link>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="text-center mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-light)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Crafted with ❤️ by{' '}
            <span 
              className="font-medium"
              style={{ color: 'var(--accent)' }}
            >
              Rakibul Hasan
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
