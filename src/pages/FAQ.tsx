import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What are your opening hours?",
    answer: "We are open every day from 8:00 AM to 11:00 PM. On Fridays and Saturdays, we stay open until midnight."
  },
  {
    question: "Do you offer home delivery?",
    answer: "Yes! We offer home delivery within Gulshan-1, Gulshan-2, and Banani. You can order directly through our website or WhatsApp."
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
    answer: "Our main stall is located at House 12, Road 90, Gulshan-2, Dhaka, near the DCC Market. You can find the exact location on our Contact page map."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span 
            className="inline-block px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            Help
          </span>
          <h1 
            className="text-5xl lg:text-6xl mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
            Find answers to the most common questions about our tea stall
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-2xl mx-auto space-y-4"
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="luxury-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span 
                  className="font-medium pr-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {faq.question}
                </span>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  style={{ 
                    backgroundColor: activeIndex === idx ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: activeIndex === idx ? 'white' : 'var(--text-secondary)'
                  }}
                >
                  {activeIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6" style={{ color: 'var(--text-secondary)' }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <div className="luxury-card rounded-2xl p-8 max-w-xl mx-auto">
            <HelpCircle size={32} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
            <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }} className="text-xl mb-2">
              Still have questions?
            </h3>
            <p style={{ color: 'var(--text-secondary)' }} className="mb-4">
              Can't find the answer you're looking for? Please contact us.
            </p>
            <a 
              href="/contact" 
              className="btn-luxury btn-primary-luxury"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
