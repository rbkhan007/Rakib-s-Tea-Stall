import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000';
  
  return (
    <footer 
      className="pt-12 pb-8 border-t"
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderColor: 'var(--border)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <span style={{ color: 'var(--accent)', fontSize: '20px' }}>☕</span>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Rakib's Tea Stall
              </span>
            </Link>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
              Serving authentic Bangladeshi chai in Gulshan-2 since 2018.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="p-2 rounded-lg shadow-sm transition-colors"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--accent)' }}
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg shadow-sm transition-colors"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--accent)' }}
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg shadow-sm transition-colors"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--accent)' }}
              >
                <Twitter size={18} />
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 text-white rounded-lg shadow-sm transition-colors"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" style={{ color: 'var(--text-secondary)' }} className="hover:text-[var(--accent)] transition-colors text-sm">Home</Link></li>
              <li><Link to="/menu" style={{ color: 'var(--text-secondary)' }} className="hover:text-[var(--accent)] transition-colors text-sm">Our Menu</Link></li>
              <li><Link to="/about" style={{ color: 'var(--text-secondary)' }} className="hover:text-[var(--accent)] transition-colors text-sm">Our Story</Link></li>
              <li><Link to="/gallery" style={{ color: 'var(--text-secondary)' }} className="hover:text-[var(--accent)] transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/reviews" style={{ color: 'var(--text-secondary)' }} className="hover:text-[var(--accent)] transition-colors text-sm">Reviews</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-secondary)' }} className="hover:text-[var(--accent)] transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="shrink-0 mt-0.5" size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                  House 12, Road 90, Gulshan-2, Dhaka
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="shrink-0" size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">+880 1712 345678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="shrink-0" size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">hello@rakibsteastall.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Opening Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                <span>Mon - Thu:</span>
                <span>8AM - 11PM</span>
              </li>
              <li className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                <span>Fri - Sat:</span>
                <span>8AM - 12AM</span>
              </li>
              <li className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                <span>Sunday:</span>
                <span>10AM - 10PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div 
          className="pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-3 text-sm"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          <p>© {new Date().getFullYear()} Rakib's Tea Stall. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-secondary)' }}>Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-secondary)' }}>Terms</Link>
          </div>
        </div>
        
        {/* Developed by */}
        <div className="text-center mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Developed by <span className="font-semibold" style={{ color: 'var(--accent)' }}>Rakibul Hasan</span> © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
