import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What are your opening hours?",
    answer: "We are open every day from 10:00 AM to 10:00 PM. On Fridays, we open slightly later at 2:00 PM."
  },
  {
    question: "Do you offer home delivery?",
    answer: "Yes! We offer home delivery within Gulshan-1, Gulshan-2, and Banani. You can order directly through our website or call us."
  },
  {
    question: "Is your tea made with fresh milk?",
    answer: "Absolutely. We use only the freshest, high-quality milk sourced daily to ensure the richest taste for our signature milk tea."
  },
  {
    question: "Do you have sugar-free options?",
    answer: "Yes, we can prepare our black tea, ginger tea, and green tea without sugar upon request. For our milk tea, we can adjust the sweetness level."
  },
  {
    question: "Can I book your stall for events?",
    answer: "Yes, we provide catering services for corporate events, weddings, and private parties. Please contact us via the contact form or WhatsApp for a quote."
  },
  {
    question: "Where are you located?",
    answer: "Our main stall is located in the heart of Gulshan-2, Dhaka, near the DCC Market. You can find the exact location on our Contact page map."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
            color: 'var(--accent)',
            backgroundColor: 'var(--accent-light)',
            border: '1px solid var(--border)'
          }}
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ 
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent)'
            }}
          >
            <HelpCircle size={32} />
          </div>
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-family)'
            }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Everything you need to know about Rakib's Tea Stall.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="rounded-3xl overflow-hidden transition-all hover:scale-[1.01]"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)'
              }}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <span 
                  className="text-lg font-bold"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <Minus size={20} style={{ color: 'var(--accent)' }} />
                ) : (
                  <Plus size={20} style={{ color: 'var(--text-secondary)' }} />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="px-8 pb-6 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div 
          className="mt-16 p-8 rounded-[2.5rem] text-center transition-all hover:scale-[1.02]"
          style={{ 
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border)'
          }}
        >
          <h3 
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Still have questions?
          </h3>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>We're here to help! Reach out to us anytime.</p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            style={{ 
              backgroundColor: 'var(--accent)',
              color: 'var(--text-primary)',
              boxShadow: '0 0 20px rgba(255, 159, 28, 0.4)'
            }}
          >
            Contact Support
          </a>
        </div>
      </div>

      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default FAQ;
