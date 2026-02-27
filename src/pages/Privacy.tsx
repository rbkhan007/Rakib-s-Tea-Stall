import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Privacy = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-luxury">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'var(--accent-light)' }}
            >
              <Shield size={32} style={{ color: 'var(--accent)' }} />
            </div>
            <h1 
              className="text-4xl lg:text-5xl mb-4"
              style={{ 
                color: 'var(--text-primary)', 
                fontFamily: 'var(--font-display)'
              }}
            >
              Privacy Policy
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Last Updated: February 2026
            </p>
          </div>

          {/* Content */}
          <div className="luxury-card rounded-3xl p-8 lg:p-10">
            <div className="space-y-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <p>
                At Rakib's Tea Stall, we value your privacy. This policy explains how we collect, use, and protect your information when you visit our website or use our services.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, and delivery address.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to process your orders, and to communicate with you about your orders and our products.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                3. Information Sharing
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with trusted service providers who assist us in operating our website.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                4. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at hello@rakibsteastall.com
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
