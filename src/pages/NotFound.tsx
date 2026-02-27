import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <div className="relative mb-12">
            <h1 className="text-[12rem] font-bold font-display text-stone-100 dark:text-stone-800 leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/images/cup.svg" alt="Tea Cup" className="w-48 h-48 animate-float" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4">Oops! Page not found</h2>
          <p className="text-stone-500 mb-12 text-lg">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
            Maybe it's time for a tea break?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="bg-primary-gradient px-8 py-4 rounded-full text-white font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
            >
              <Home size={20} /> Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
            >
              <ArrowLeft size={20} /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
