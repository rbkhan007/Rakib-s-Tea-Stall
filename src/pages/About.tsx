import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Award, Users, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Coffee, value: '500K+', label: 'Cups Served' },
    { icon: Award, value: '6+', label: 'Years Experience' },
    { icon: Heart, value: '4.9', label: 'Average Rating' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-luxury">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            Our Story
          </motion.span>
          
          <motion.h1
            variants={fadeInUp}
            className="text-5xl lg:text-7xl mb-6"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            A Legacy of
            <br />
            <span className="text-gradient-gold">Excellence</span>
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Since 2018, Rakib's Tea Stall has been serving the finest authentic Bangladeshi chai 
            in the heart of Gulshan-2, Dhaka. What started as a small stall has become a beloved 
            destination for tea enthusiasts.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="luxury-card rounded-2xl p-8 text-center"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <stat.icon size={24} style={{ color: 'var(--accent)' }} />
              </div>
              <div 
                className="text-3xl font-medium mb-1"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-secondary)' }} className="text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 
              className="text-4xl mb-6"
              style={{ 
                color: 'var(--text-primary)', 
                fontFamily: 'var(--font-display)'
              }}
            >
              Our Heritage
            </h2>
            <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <p>
                Born from a passion for the perfect cup of chai, Rakib's Tea Stall brings 
                together traditional recipes passed down through generations with modern 
                brewing techniques.
              </p>
              <p>
                We source our tea leaves from the finest gardens in Sylhet, known for their 
                exceptional quality and unique flavor profiles. Combined with fresh local 
                milk and our secret spice blend, each cup tells a story of craftsmanship 
                and dedication.
              </p>
              <p>
                Every chai is brewed with love, ensuring that each sip transports you to 
                the vibrant tea culture of Bangladesh.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div 
              className="aspect-square rounded-3xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <img 
                src="/images/tea-1.png" 
                alt="Our Tea" 
                className="w-full h-full object-contain p-8"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(197, 163, 88, 0.2))' }}
              />
            </div>
            <div 
              className="absolute -bottom-6 -right-6 p-6 rounded-2xl"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                boxShadow: '0 10px 40px rgba(197, 163, 88, 0.4)'
              }}
            >
              <Sparkles className="text-white" size={32} />
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            Our Values
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Quality First',
              description: 'We never compromise on the quality of our ingredients. Only the finest tea leaves, freshest milk, and purest spices make it into your cup.',
              icon: Award
            },
            {
              title: 'Traditional Craft',
              description: 'Our recipes have been perfected over generations, preserving the authentic taste of Bangladeshi chai while maintaining consistent quality.',
              icon: Coffee
            },
            {
              title: 'Warm Hospitality',
              description: 'Every customer is family. We strive to create a welcoming atmosphere where everyone feels at home.',
              icon: Heart
            }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="luxury-card rounded-2xl p-8"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <value.icon size={24} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 
                className="text-xl font-medium mb-3"
                style={{ 
                  color: 'var(--text-primary)', 
                  fontFamily: 'var(--font-display)'
                }}
              >
                {value.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-20"
        >
          <Link 
            to="/menu" 
            className="btn-luxury btn-primary-luxury"
          >
            Explore Our Menu
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
