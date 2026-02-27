import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Terms = () => {
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
              <FileText size={32} style={{ color: 'var(--accent)' }} />
            </div>
            <h1 
              className="text-4xl lg:text-5xl mb-4"
              style={{ 
                color: 'var(--text-primary)', 
                fontFamily: 'var(--font-display)'
              }}
            >
              Terms of Service
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Last Updated: February 2026
            </p>
          </div>

          {/* Content */}
          <div className="luxury-card rounded-3xl p-8 lg:p-10">
            <div className="space-y-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <p>
                Welcome to Rakib's Tea Stall. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                2. Orders and Payments
              </h2>
              <p>
                All orders placed through our website are subject to availability. We reserve the right to refuse or cancel any order for any reason. Prices are subject to change without notice.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                3. Delivery
              </h2>
              <p>
                We deliver within specified areas in Dhaka. Delivery times are estimates and may vary. Additional delivery charges may apply for areas outside our standard delivery zone.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                4. Intellectual Property
              </h2>
              <p>
                The content on this website is owned by Rakib's Tea Stall and is protected by copyright laws. You may not reproduce, distribute, or modify any content without our written consent.
              </p>
              
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl font-medium mt-8 mb-4">
                5. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at hello@rakibsteastall.com
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
