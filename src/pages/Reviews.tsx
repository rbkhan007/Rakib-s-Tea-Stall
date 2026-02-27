import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
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
        
        // Calculate stats
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

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
            Customer Reviews
          </h1>
          <p 
            style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
            className="text-lg max-w-xl mx-auto"
          >
            See what our community has to say about their experience at Rakib's Tea Stall.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div 
            className="p-8 rounded-3xl text-center transition-all hover:scale-[1.02]"
            style={{ 
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)'
            }}
          >
            <h3 
              className="text-5xl font-bold mb-2"
              style={{ color: 'var(--accent)' }}
            >
              {stats.average}
            </h3>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  fill={i < Math.round(stats.average) ? 'var(--accent)' : 'none'} 
                  className={i < Math.round(stats.average) ? "" : ""} 
                  style={{ color: i < Math.round(stats.average) ? 'var(--accent)' : 'var(--text-secondary)' }} 
                />
              ))}
            </div>
            <p style={{ color: 'var(--text-secondary)' }} className="font-medium">Average Rating</p>
          </div>
          <div 
            className="p-8 rounded-3xl text-center transition-all hover:scale-[1.02]"
            style={{ 
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)'
            }}
          >
            <h3 
              className="text-5xl font-bold mb-2"
              style={{ color: 'var(--accent)' }}
            >
              {stats.total}+
            </h3>
            <p style={{ color: 'var(--text-secondary)' }} className="font-medium mt-4">Verified Reviews</p>
          </div>
          <div 
            className="p-8 rounded-3xl text-center transition-all hover:scale-[1.02]"
            style={{ 
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)'
            }}
          >
            <h3 
              className="text-5xl font-bold mb-2"
              style={{ color: 'var(--accent)' }}
            >
              {stats.happy}%
            </h3>
            <p style={{ color: 'var(--text-secondary)' }} className="font-medium mt-4">Happy Customers</p>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={fetchReviews}
            className="flex items-center gap-2 px-6 py-2 rounded-full transition-colors"
            style={{ 
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)'
            }}
          >
            <RefreshCw size={18} />
            Refresh Reviews
          </button>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="p-8 rounded-[2.5rem] shadow-xl animate-pulse"
                style={{ 
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)'
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-full"
                    style={{ backgroundColor: 'var(--border)' }}
                  />
                  <div>
                    <div 
                      className="h-5 w-32 rounded mb-2"
                      style={{ backgroundColor: 'var(--border)' }}
                    />
                    <div 
                      className="h-4 w-24 rounded"
                      style={{ backgroundColor: 'var(--border)' }}
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div 
                    className="h-4 rounded"
                    style={{ backgroundColor: 'var(--border)' }}
                  />
                  <div 
                    className="h-4 rounded"
                    style={{ backgroundColor: 'var(--border)' }}
                  />
                  <div 
                    className="h-4 w-2/3 rounded"
                    style={{ backgroundColor: 'var(--border)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] shadow-xl relative group hover:scale-[1.02] transition-all"
                style={{ 
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)'
                }}
              >
                <Quote 
                  className="absolute top-6 right-8 transition-colors" 
                  size={60} 
                  style={{ 
                    color: 'var(--accent)',
                    opacity: 0.15
                  }}
                />
                
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={review.avatar || `https://picsum.photos/seed/${review.id}/100/100`} 
                    alt={review.name} 
                    className="w-14 h-14 rounded-full object-cover"
                    style={{ border: '2px solid var(--accent)', borderOpacity: 0.2 }}
                  />
                  <div>
                    <h4 
                      className="font-bold text-lg"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {review.name}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{review.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.rating ? 'var(--accent)' : 'none'} 
                      style={{ color: i < review.rating ? 'var(--accent)' : 'var(--text-secondary)' }} 
                    />
                  ))}
                </div>

                <p 
                  className="leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  "{review.text}"
                </p>

                <div 
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{ color: 'var(--text-secondary)', opacity: 0.7 }}
                >
                  {formatDate(review.created_at)}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <User size={64} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)' }} />
            <h3 
              className="text-xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              No Reviews Yet
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Be the first to share your experience!
            </p>
          </div>
        )}

        {/* Write a Review CTA */}
        <div className="mt-24 text-center">
          <h2 
            className="text-3xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Loved our tea?
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="mb-8">Share your experience and help others discover the best chai in town.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-xl"
            style={{ 
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 30px var(--accent-light)'
            }}
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Review Modal */}
      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          fetchReviews(); // Refresh after submission
        }} 
      />
    </div>
  );
};

export default Reviews;
