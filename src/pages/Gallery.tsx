import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: '/images/tea-1.png', title: 'Milk Tea', subtitle: 'Our Signature Chai' },
    { src: '/images/tea-2.png', title: 'Black Tea', subtitle: 'Strong & Aromatic' },
    { src: '/images/fresh-1.png', title: 'Lemon Tea', subtitle: 'Refreshing Blend' },
    { src: '/images/fresh-2.png', title: 'Green Tea', subtitle: 'Healthy Choice' },
    { src: '/images/tea-3.png', title: 'Masala Chai', subtitle: 'Spiced Delight' },
    { src: '/images/tea-4.png', title: 'Iced Tea', subtitle: 'Cool Refreshment' },
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
            Our Gallery
          </span>
          <h1 
            className="text-5xl lg:text-6xl mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            Moments to Savor
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
            A glimpse into the warmth and tradition at Rakib's Tea Stall.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden luxury-card"
              onClick={() => setSelectedImage(img.src)}
            >
              <div 
                className="aspect-[4/3] flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-medium text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                    {img.title}
                  </h3>
                  <p className="text-white/80 text-sm">{img.subtitle}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={28} />
                </button>
                <img 
                  src={selectedImage} 
                  alt="Gallery"
                  className="w-full h-auto rounded-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
