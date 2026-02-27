import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div 
      className="pt-24 pb-16 min-h-screen"
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        fontFamily: 'var(--font-family)'
      }}
    >
      {/* Back Button */}
      <div className="container mx-auto px-4 mb-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all"
          style={{ 
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)'
          }}
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <h1 
          className="text-4xl font-bold mb-8"
          style={{ color: 'var(--text-primary)' }}
        >
          Privacy Policy
        </h1>
        <div 
          className="space-y-6"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}
        >
          <p>Last Updated: October 2025</p>
          <p>
            At Rakib's Tea Stall, we value your privacy. This policy explains how we collect, use, and protect your information when you visit our website or use our services.
          </p>
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us, such as when you fill out a contact form or place an order. This may include your name, email address, phone number, and delivery address.
          </p>
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to process your orders, respond to your inquiries, and improve our services. We may also use your contact information to send you updates about our menu and special offers.
          </p>
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            3. Data Security
          </h2>
          <p>
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is 100% secure.
          </p>
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            4. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at hello@rakibsteastall.com.
          </p>
        </div>
      </div>

      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default Privacy;
