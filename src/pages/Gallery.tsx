import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, CupSoda } from 'lucide-react';

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

  return (
    <div 
      className="pt-24 pb-16 min-h-screen"
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        fontFamily: 'var(--font-family)'
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-family)'
            }}
          >
            Our Gallery
          </h1>
          <p 
            style={{ 
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
            className="text-lg max-w-xl mx-auto"
          >
            A glimpse into the warmth and tradition at Rakib's Tea Stall.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden"
              style={{ 
                aspectRatio: '4/3',
                backgroundColor: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
              onClick={() => setSelectedImage(img.src)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px var(--accent-light)'
              }}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: 'rgba(15, 10, 9, 0.5)' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div 
                className="hidden w-full h-full absolute inset-0 flex items-center justify-center" 
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <CupSoda size={64} style={{ color: 'var(--text-secondary)' }} />
              </div>
              
              {/* Hover Overlay with Title */}
              <div 
                className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ 
                  background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)'
                }}
              >
                <div style={{ color: 'var(--text-primary)' }}>
                  <h3 className="font-bold text-lg">
                    {img.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{img.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 mt-2" style={{ color: 'var(--text-muted)' }}>
                  <Maximize2 size={16} />
                  <span className="text-xs">Click to enlarge</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'var(--bg-primary)' }}
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 p-2 rounded-full transition-colors z-10"
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>

              {/* Navigation Hints */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2" style={{ color: 'var(--text-muted)' }}>
                Click anywhere to close
              </div>

              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                src={selectedImage}
                alt="Full view"
                className="max-w-full max-h-[85vh] rounded-lg object-contain"
                style={{ backgroundColor: 'var(--bg-card)' }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default Gallery;
