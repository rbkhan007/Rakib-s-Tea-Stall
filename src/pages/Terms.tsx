import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
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
          Terms of Service
        </h1>
        <div 
          className="space-y-6"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}
        >
          <p>Last Updated: October 2025</p>
          <p>
            Welcome to Rakib's Tea Stall. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
          </p>
          
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            1. Acceptance of Terms
          </h2>
          <p>
            By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please do not use our site.
          </p>
          
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            2. Use of Services
          </h2>
          <p>
            Our services are intended for personal, non-commercial use. You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair our services.
          </p>
          
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            3. Orders and Payments
          </h2>
          <p>
            All orders placed through our website are subject to availability and acceptance. We reserve the right to refuse any order. Prices are subject to change without notice.
          </p>
          
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            4. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of Rakib's Tea Stall and is protected by intellectual property laws.
          </p>
          
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            5. Limitation of Liability
          </h2>
          <p>
            Rakib's Tea Stall shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use of our website or services.
          </p>
          
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.
          </p>
          
          <h2 
            className="text-2xl font-bold mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            7. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at hello@rakibsteastall.com.
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

export default Terms;
