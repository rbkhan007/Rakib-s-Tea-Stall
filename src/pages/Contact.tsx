import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use local API for testing (SQLite)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      // Supabase logic (commented out for now as requested)
      /*
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (error) throw error;
      */

      setIsSubmitted(true);
      toast.success('Message sent successfully!', {
        description: "We'll get back to you soon.",
        icon: <CheckCircle2 className="text-green-500" />,
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message', {
        description: error.message || 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Call Us', value: '+880 1712 345678', href: 'tel:+8801712345678' },
    { icon: Mail, label: 'Email Us', value: 'hello@rakibsteastall.com', href: 'mailto:hello@rakibsteastall.com' },
    { icon: MapPin, label: 'Visit Us', value: 'Gulshan-2, Dhaka 1212', href: 'https://maps.google.com' },
  ];

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

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: 'var(--text-primary)'
            }}
          >
            Get In Touch
          </h1>
          <p 
            style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
            className="text-lg max-w-xl mx-auto"
          >
            Have a question, feedback, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-8 rounded-3xl group transition-all duration-500 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors"
                  style={{ 
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent)'
                  }}
                >
                  <info.icon size={28} />
                </div>
                <div>
                  <p 
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {info.label}
                  </p>
                  <p 
                    className="text-lg font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 w-full py-6 rounded-3xl font-bold text-xl transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-primary)',
                boxShadow: '0 0 30px var(--accent-light)'
              }}
            >
              <MessageCircle size={28} />
              Chat on WhatsApp
            </motion.a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[3rem] shadow-2xl"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label 
                      className="text-sm font-bold uppercase tracking-widest"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 rounded-2xl transition-all"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)'
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label 
                      className="text-sm font-bold uppercase tracking-widest"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 rounded-2xl transition-all"
                      style={{ 
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)'
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label 
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl transition-all resize-none"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-5 rounded-2xl text-white font-bold text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
                  style={{ 
                    backgroundColor: 'var(--accent)',
                    boxShadow: '0 0 30px var(--accent-light)'
                  }}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <div 
          className="rounded-[3rem] overflow-hidden h-[500px] shadow-2xl"
          style={{ 
            border: '1px solid var(--border)'
          }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5983460988937!2d90.4125181!3d23.7918822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c3649d393d58a7!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          />
        </div>
      </div>

      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default Contact;
