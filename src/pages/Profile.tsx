import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Settings, LogOut, Phone, Mail, Plus, Edit, Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useCustomer } from '../context/CustomerContext';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  items: string;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
}

interface Address {
  id: number;
  label: string;
  address: string;
  phone: string;
}

const Profile = () => {
  const { customer, isAuthenticated, login, logout } = useCustomer();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: 'Home', address: '', phone: '' });
  const [loading, setLoading] = useState(true);
  
  const [loginForm, setLoginForm] = useState({ name: '', phone: '', email: '', address: '' });

  useEffect(() => {
    if (isAuthenticated && customer) {
      fetchOrders();
      if (customer.address) {
        setAddresses([{ id: 1, label: 'Home', address: customer.address, phone: customer.phone }]);
      }
    }
  }, [isAuthenticated, customer]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (customer?.phone) {
        const filtered = data.filter((o: Order) => o.phone === customer.phone);
        setOrders(filtered);
      } else {
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.name || !loginForm.phone) {
      toast.error('Please enter your name and phone number');
      return;
    }
    login(loginForm.name, loginForm.phone, loginForm.email, loginForm.address);
    toast.success('Welcome! Your profile has been created.');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-md mx-auto"
          >
            <div className="luxury-card rounded-3xl p-8">
              <div className="text-center mb-8">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)'
                  }}
                >
                  <User className="w-8 h-8 text-white" />
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }} className="text-3xl mb-2">
                  Welcome Back
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Sign in to track your orders</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Name *</label>
                  <input
                    type="text"
                    value={loginForm.name}
                    onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Phone *</label>
                  <input
                    type="tel"
                    value={loginForm.phone}
                    onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Email (optional)</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  />
                </div>
                <button type="submit" className="btn-luxury btn-primary-luxury w-full justify-center">
                  Sign In
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-10"
        >
          <div className="luxury-card rounded-3xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' }}
              >
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }} className="text-2xl">
                  {customer?.name}
                </h1>
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{customer?.phone}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="p-3 rounded-full transition-colors"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <LogOut size={20} />
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex gap-2 mb-8 overflow-x-auto"
        >
          {['orders', 'addresses'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === tab ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' : 'var(--bg-card)',
                background: activeTab === tab ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' : undefined,
                color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                border: activeTab === tab ? 'none' : '1px solid var(--border-light)'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="luxury-card rounded-2xl p-12 text-center">
                  <Package size={48} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>No orders yet</p>
                  <Link to="/menu" className="btn-luxury btn-primary-luxury mt-4 inline-flex">
                    Browse Menu
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="luxury-card rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Order #{order.id}</p>
                        <p style={{ color: 'var(--text-muted)' }} className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: order.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(251, 146, 60, 0.1)',
                          color: order.status === 'completed' ? '#22C55E' : '#FB923C'
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-2">{order.items}</p>
                    <p className="font-medium" style={{ color: 'var(--accent)' }}>৳{order.total}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="luxury-card rounded-2xl p-5 flex items-start gap-4">
                  <MapPin size={20} style={{ color: 'var(--accent)' }} />
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{addr.label}</p>
                    <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{addr.address}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
