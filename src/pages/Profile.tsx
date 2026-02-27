import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Settings, LogOut, Phone, Mail, Plus, Edit, Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useCustomer, Customer } from '../context/CustomerContext';
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
  const { customer, isAuthenticated, login, logout, updateProfile } = useCustomer();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: 'Home', address: '', phone: '' });
  const [loading, setLoading] = useState(true);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({ name: '', phone: '', email: '', address: '' });

  useEffect(() => {
    if (isAuthenticated && customer) {
      fetchOrders();
      // Load saved addresses from customer data
      if (customer.address) {
        setAddresses([{ id: 1, label: 'Home', address: customer.address, phone: customer.phone }]);
      }
    }
  }, [isAuthenticated, customer]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      // Filter orders by current customer phone if logged in
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

  const handleAddAddress = () => {
    if (!newAddress.address || !newAddress.phone) {
      toast.error('Please fill all fields');
      return;
    }
    const address: Address = {
      id: Date.now(),
      ...newAddress
    };
    setAddresses([...addresses, address]);
    // Also update customer profile
    updateProfile({ address: newAddress.address });
    setNewAddress({ label: 'Home', address: '', phone: '' });
    setShowAddAddress(false);
    toast.success('Address added!');
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.success('Address deleted');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'confirmed': return 'bg-blue-100 text-blue-600';
      case 'delivered': return 'bg-green-100 text-green-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', active: activeTab === 'orders', tab: 'orders' },
    { icon: MapPin, label: 'Saved Addresses', active: activeTab === 'addresses', tab: 'addresses' },
    { icon: Settings, label: 'Account Settings', active: activeTab === 'settings', tab: 'settings' },
    { icon: LogOut, label: 'Logout', color: 'text-red-500', tab: 'logout' }
  ];

  // Guest User - Show Login/Create Profile
  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome to Rakib's Tea Stall</h1>
              <p className="text-stone-600">Create a profile to track orders, save addresses, and get personalized experience.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  value={loginForm.name}
                  onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm({...loginForm, phone: e.target.value})}
                  placeholder="+880 1712 345678"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Default Address (Optional)</label>
                <textarea
                  value={loginForm.address}
                  onChange={(e) => setLoginForm({...loginForm, address: e.target.value})}
                  placeholder="Your delivery address"
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Create Profile / Login
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-center text-stone-500 text-sm mb-4">Or order without creating profile:</p>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000'}?text=${encodeURIComponent('Hi! I want to order some tea.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <MessageCircle size={20} />
                  Order via WhatsApp
                </a>
                <Link
                  to="/menu"
                  className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  Browse Menu
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-stone-500 text-sm mt-6">
            No account needed • Browse and order anytime • WhatsApp ordering available
          </p>
        </div>
      </div>
    );
  }

  // Logged In User - Show Profile
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
              <User className="w-10 h-10 text-orange-500" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl font-bold">{customer?.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-stone-600">
                <span className="flex items-center gap-1"><Phone size={14} /> {customer?.phone}</span>
                {customer?.email && <span className="flex items-center gap-1"><Mail size={14} /> {customer?.email}</span>}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Menu */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => item.tab === 'logout' ? handleLogout() : setActiveTab(item.tab)}
                  className={`w-full flex items-center gap-3 px-5 py-4 transition-colors ${
                    item.active 
                      ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' 
                      : 'hover:bg-stone-50 text-stone-600'
                  } ${item.color || ''}`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
                <h2 className="text-xl font-bold mb-6">My Orders</h2>
                {loading ? (
                  <p className="text-stone-500">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500 mb-4">No orders yet</p>
                    <Link to="/menu" className="text-orange-500 font-medium hover:underline">
                      Browse Menu
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-stone-200 rounded-xl p-4">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <div>
                            <p className="font-semibold">Order #{order.id}</p>
                            <p className="text-sm text-stone-500">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-stone-600 text-sm mb-2">{order.items}</p>
                        <p className="font-bold">Total: ৳{order.total}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Saved Addresses</h2>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center gap-1 text-orange-500 font-medium hover:text-orange-600"
                  >
                    <Plus size={18} />
                    Add New
                  </button>
                </div>

                {showAddAddress && (
                  <div className="bg-stone-50 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="text"
                        placeholder="Label (e.g., Home, Office)"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                        className="px-4 py-2 rounded-lg border border-stone-300"
                      />
                      <textarea
                        placeholder="Full address"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                        rows={2}
                        className="px-4 py-2 rounded-lg border border-stone-300 resize-none"
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                        className="px-4 py-2 rounded-lg border border-stone-300"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddAddress}
                          className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="px-4 py-2 border border-stone-300 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {addresses.length === 0 ? (
                  <p className="text-stone-500">No saved addresses</p>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="border border-stone-200 rounded-xl p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{addr.label}</p>
                            <p className="text-stone-600 text-sm">{addr.address}</p>
                            <p className="text-stone-500 text-sm">{addr.phone}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={customer?.name || ''}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={customer?.phone || ''}
                      onChange={(e) => updateProfile({ phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={customer?.email || ''}
                      onChange={(e) => updateProfile({ email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Default Address</label>
                    <textarea
                      value={customer?.address || ''}
                      onChange={(e) => updateProfile({ address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 resize-none"
                    />
                  </div>
                  <button
                    onClick={() => toast.success('Profile updated!')}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
