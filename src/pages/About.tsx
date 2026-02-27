import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, RefreshCw, Lightbulb, MapPin, Award, Users, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeSection, setActiveSection] = useState('heritage');
  
  const sections = [
    { id: 'heritage', label: "Our Heritage" },
    { id: 'vision', label: "Rakib's Vision" },
    { id: 'values', label: "Our Values" },
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Coffee, value: '500K+', label: 'Cups Served' },
    { icon: Award, value: '6+', label: 'Years Experience' },
    { icon: Heart, value: '4.9', label: 'Average Rating' },
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
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

      <div className="container mx-auto px-4">
        {/* Minimalist Navigation */}
        <nav 
          className="fixed top-0 left-0 right-0 z-50 py-4"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            backdropFilter: 'blur(12px)', 
            borderBottom: '1px solid var(--border-light)' 
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8">
              {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-sm font-medium transition-colors relative group"
                  style={{ color: item === 'About' ? 'var(--accent)' : 'var(--text-secondary)' }}
                >
                  {item}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar */}
              <div className="w-full lg:w-64 shrink-0">
                <div className="lg:sticky lg:top-24 space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className="w-full text-left px-4 py-3 relative flex items-center gap-3 transition-colors rounded-lg"
                      style={{ 
                        color: activeSection === section.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                        backgroundColor: activeSection === section.id ? 'var(--bg-hover)' : 'transparent',
                      }}
                    >
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                          style={{ backgroundColor: 'var(--accent)' }}
                        />
                      )}
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl p-8 mb-8"
                  style={{ 
                    backgroundColor: 'var(--bg-card)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Circular Portrait with Glow */}
                    <div className="relative">
                      <div 
                        className="w-48 h-48 rounded-full p-1"
                        style={{ 
                          background: 'linear-gradient(135deg, var(--accent) 0%, #FBBF24 100%)',
                          boxShadow: '0 0 30px var(--accent-light)'
                        }}
                      >
                        <img
                          src="/images/profile.jpg"
                          alt="Rakib's Tea Stall Owner"
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/owner/400/400';
                          }}
                        />
                      </div>
                    </div>

                    {/* Header Text */}
                    <div className="text-center md:text-left flex-1">
                      <h1 
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Our Story
                      </h1>
                      <p 
                        className="text-lg leading-relaxed"
                        style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}
                      >
                        Welcome to Rakib's Tea Stall – where tradition meets taste. 
                        Since 2018, we've been serving the finest authentic Bangladeshi chai 
                        in the heart of Gulshan-2, Dhaka.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Content Sections */}
                {activeSection === 'heritage' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl p-8"
                    style={{ 
                      backgroundColor: 'var(--bg-card)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                      Our Heritage
                    </h2>
                    <div className="space-y-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                      <p>
                        Born from a simple passion for the perfect cup of chai, Rakib's Tea Stall 
                        has become a beloved destination for tea enthusiasts across Dhaka. Our journey 
                        began with a small stall and a big dream – to bring authentic Bangladeshi 
                        tea culture to everyone.
                      </p>
                      <p>
                        Every cup we serve carries the rich traditions of our ancestors, brewing methods 
                        passed down through generations, and the finest locally sourced ingredients. 
                        From our signature milk tea to the refreshing lemon tea, each blend is crafted 
                        with love and precision.
                      </p>
                      <p>
                        What started as a family business has grown into a community gathering place, 
                        where friends meet, families bond, and every visitor feels like home.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'vision' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl p-8"
                    style={{ 
                      backgroundColor: 'var(--bg-card)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                      Rakib's Vision
                    </h2>
                    <div className="space-y-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                      <p>
                        Our vision is simple yet ambitious: to be the most beloved tea destination 
                        in Bangladesh, where every cup tells a story of quality, authenticity, and 
                        warmth.
                      </p>
                      <p>
                        We dream of expanding our reach beyond Dhaka, bringing the authentic taste 
                        of Rakib's Tea to every corner of Bangladesh. But more than growth, we 
                        aim to preserve the soul of traditional tea-making while embracing modern 
                        hospitality.
                      </p>
                      <p>
                        Every cup we serve is our promise to you – a promise of exceptional taste, 
                        unwavering quality, and a moments of pure satisfaction.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'values' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl p-8"
                    style={{ 
                      backgroundColor: 'var(--bg-card)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                      Our Values
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { title: 'Quality First', desc: 'Only the finest ingredients' },
                        { title: 'Authentic Taste', desc: 'Traditional recipes' },
                        { title: 'Warm Hospitality', desc: 'Every guest family' },
                        { title: 'Clean & Hygienic', desc: '100% quality assurance' },
                        { title: 'Community', desc: 'Building relationships' },
                        { title: 'Innovation', desc: 'Better every day' },
                      ].map((value, i) => (
                        <div 
                          key={i}
                          className="p-4 rounded-xl transition-all hover:scale-[1.02]"
                          style={{ 
                            backgroundColor: 'var(--bg-hover)',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <h3 className="font-bold mb-1" style={{ color: 'var(--accent)' }}>
                            {value.title}
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {value.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl p-6 text-center transition-all hover:scale-[1.02]"
                      style={{ 
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <stat.icon 
                        className="w-8 h-8 mx-auto mb-3" 
                        style={{ color: 'var(--accent)' }} 
                      />
                      <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {stat.value}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Callout - Did You Know */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl p-6 mt-8 flex items-center gap-4"
                  style={{ 
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--accent-light)' }}
                  >
                    <Lightbulb className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      Did You Know?
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      We serve over 500 cups of our signature Masala Chai every single day!
                    </p>
                  </div>
                  <button 
                    className="p-2 rounded-full transition-colors"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </motion.div>

                {/* Location */}
                <div 
                  className="rounded-2xl p-8 mt-8" 
                  style={{ 
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <MapPin className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      Visit Us
                    </h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    House 12, Road 90, Gulshan-2, Dhaka
                  </p>
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                    Open: 8AM - 11PM (Every Day)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
