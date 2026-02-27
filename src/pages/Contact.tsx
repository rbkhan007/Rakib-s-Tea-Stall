import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Call Us', value: '+880 1712 345678', href: 'tel:+8801712345678' },
    { icon: Mail, label: 'Email Us', value: 'hello@rakibsteastall.com', href: 'mailto:hello@rakibsteastall.com' },
    { icon: MapPin, label: 'Visit Us', value: 'House 12, Road 90, Gulshan-2, Dhaka', href: 'https://maps.google.com' },
  ];

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
            Get in Touch
          </span>
          <h1 
            className="text-5xl lg:text-6xl mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            Contact Us
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-md mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="luxury-card rounded-3xl p-8 lg:p-10"
          >
            <h2 
              className="text-2xl mb-6"
              style={{ 
                color: 'var(--text-primary)', 
                fontFamily: 'var(--font-display)'
              }}
            >
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-field form-field-spacing">
                <label 
                  className="form-label"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-field form-field-spacing">
                <label 
                  className="form-label"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-field form-field-spacing">
                <label 
                  className="form-label"
                >
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl resize-none"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury btn-primary-luxury w-full justify-center"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="luxury-card rounded-2xl p-6 flex items-center gap-5 group"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--accent-light)' }}
                >
                  <info.icon size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{info.label}</p>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="luxury-card rounded-2xl p-6 flex items-center gap-5"
              style={{ 
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                boxShadow: '0 10px 40px rgba(34, 197, 94, 0.3)'
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80">Order via WhatsApp</p>
                <p className="font-medium text-white">Quick Response</p>
              </div>
            </motion.a>

            {/* Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="luxury-card rounded-2xl overflow-hidden h-64"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5983460988937!2d90.4125181!3d23.7918822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c3649d393d58a7!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
