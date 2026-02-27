/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { CustomerProvider } from './context/CustomerContext';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Profile = lazy(() => import('./pages/Profile'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const AdminMessages = lazy(() => import('./pages/AdminMessages'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const NotFound = lazy(() => import('./pages/NotFound'));

import ChaiBot from './components/ChaiBot';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Coffee className="w-12 h-12 text-orange-500 mx-auto animate-bounce" />
      <p className="text-stone-500 mt-4">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <CustomerProvider>
        <CartProvider>
          <AdminProvider>
            <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Suspense fallback={<Loading />}>
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                      <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
                      <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                      <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
                      <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                      <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
                      <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
                      <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
                      <Route path="/reviews" element={<PageWrapper><Reviews /></PageWrapper>} />
                      <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                      <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
                      <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
                      <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
                      <Route path="/admin/messages" element={<PageWrapper><AdminMessages /></PageWrapper>} />
                      <Route path="/admin" element={<PageWrapper><AdminPanel /></PageWrapper>} />
                      <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                    </Routes>
                  </AnimatePresence>
                </Suspense>
              </main>
              <Footer />
              <ChaiBot />
              
              {/* Floating WhatsApp Button */}
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center animate-pulse"
                title="Chat on WhatsApp"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
            <Toaster position="top-center" richColors />
          </Router>
          </AdminProvider>
        </CartProvider>
      </CustomerProvider>
    </ThemeProvider>
  );
}
