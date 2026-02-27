import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Coffee } from 'lucide-react';

const NotFound = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-luxury">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          {/* Large 404 with icon */}
          <div className="relative mb-8 inline-block">
            <h1 
              className="text-[10rem] lg:text-[12rem] leading-none"
              style={{ 
                color: 'var(--accent)',
                opacity: 0.15,
                fontFamily: 'var(--font-display)'
              }}
            >
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                    boxShadow: '0 10px 40px rgba(197, 163, 88, 0.3)'
                  }}
                >
                  <Coffee className="w-12 h-12 text-white" />
                </div>
              </motion.div>
            </div>
          </div>

          <h2 
            className="text-4xl lg:text-5xl mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            Oops! Page Not Found
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="text-lg mb-10 max-w-md mx-auto">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="btn-luxury btn-primary-luxury gap-2"
            >
              <Home size={18} />
              Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="btn-luxury btn-secondary-luxury gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
