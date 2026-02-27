import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User, RefreshCw } from 'lucide-react';
import ReviewModal from '../components/ReviewModal';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  role: string;
  avatar: string;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ average: 4.9, total: 0, happy: 98 });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
        
        if (data.length > 0) {
          const totalRating = data.reduce((sum: number, r: Review) => sum + r.rating, 0);
          const avg = (totalRating / data.length).toFixed(1);
          setStats({
            average: parseFloat(avg),
            total: data.length,
            happy: Math.round((data.filter((r: Review) => r.rating >= 4).length / data.length) * 100)
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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
            Testimonials
          </span>
          <h1 
            className="text-5xl lg:text-6xl mb-4"
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)'
            }}
          >
            What Our Guests Say
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">
            Discover why our customers keep coming back for more
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid grid-cols-3 gap-6 mb-16"
        >
          {[
            { value: stats.average, label: 'Average Rating', suffix: '/5' },
            { value: stats.total, label: 'Total Reviews' },
            { value: stats.happy, label: 'Satisfaction', suffix: '%' }
          ].map((stat, idx) => (
            <div key={idx} className="luxury-card rounded-2xl p-6 text-center">
              <div 
                className="text-4xl font-medium mb-1"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
              >
                {stat.value}{stat.suffix || ''}
              </div>
              <div style={{ color: 'var(--text-secondary)' }} className="text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Write Review Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-luxury btn-primary-luxury"
          >
            Write a Review
          </button>
        </motion.div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 mx-auto animate-spin" style={{ color: 'var(--accent)' }} />
            <p style={{ color: 'var(--text-secondary)' }} className="mt-4">Loading reviews...</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={fadeInUp}
                className="luxury-card rounded-2xl p-6 relative"
              >
                <Quote 
                  className="absolute top-4 right-4" 
                  size={24} 
                  style={{ color: 'var(--accent)', opacity: 0.3 }} 
                />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.rating ? 'var(--accent)' : 'transparent'}
                      stroke={i < review.rating ? 'var(--accent)' : 'var(--text-muted)'}
                    />
                  ))}
                </div>

                <p style={{ color: 'var(--text-secondary)' }} className="mb-6 leading-relaxed">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                      color: 'white'
                    }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                      {review.name}
                    </p>
                    <p style={{ color: 'var(--text-muted)' }} className="text-xs">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {reviews.length === 0 && !loading && (
          <div className="text-center py-16">
            <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Reviews;
