import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, ShoppingBag, MessageSquare, Plus, Edit, Trash2, 
  Check, X, Eye, EyeOff, Send, Phone, MapPin, Clock,
  Package, LogOut, RefreshCw, Upload, Image
} from 'lucide-react';
import { toast } from 'sonner';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  name: string;
  name_bangla: string;
  price: number;
  category: string;
  description: string;
  image: string;
  available: number;
}

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

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [formData, setFormData] = useState({
    name: '', name_bangla: '', price: '', category: 'Signature', 
    description: '', image: '/images/tea-1.png', available: true
  });

  const { token, isAuthenticated, logout, admin } = useAdmin();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, [token, activeTab]);

  const fetchData = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if (activeTab === 'menu') {
        const res = await fetch('/api/menu/all', { headers });
        if (res.status === 401) {
          await logout();
          navigate('/admin/login');
          return;
        }
        const data = await res.json();
        setMenuItems(data);
      } else if (activeTab === 'orders') {
        const res = await fetch('/api/orders', { headers });
        if (res.status === 401) {
          await logout();
          navigate('/admin/login');
          return;
        }
        const data = await res.json();
        setOrders(data);
      } else if (activeTab === 'messages') {
        const res = await fetch('/api/messages', { headers });
        if (res.status === 401) {
          await logout();
          navigate('/admin/login');
          return;
        }
        const data = await res.json();
        setMessages(data);
      }
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, token, logout, navigate]);

  useEffect(() => {
    if (token && isAuthenticated) {
      fetchData();
    }
  }, [activeTab, token, isAuthenticated, fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu';
    const method = editingItem ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, price: parseInt(formData.price) })
      });
      
      if (res.status === 401) {
        await logout();
        navigate('/admin/login');
        return;
      }
      
      if (res.ok) {
        toast.success(editingItem ? 'Menu updated!' : 'Menu item added!');
        setShowAddModal(false);
        setEditingItem(null);
        resetForm();
        fetchData();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to save');
      }
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm('Delete this item?')) return;
    
    try {
      const res = await fetch(`/api/menu/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.status === 401) {
        await logout();
        navigate('/admin/login');
        return;
      }
      
      if (res.ok) {
        toast.success('Item deleted');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    if (!token) return;
    
    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...item, available: item.available ? 0 : 1 })
      });
      
      if (res.status === 401) {
        await logout();
        navigate('/admin/login');
        return;
      }
      
      fetchData();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    if (!token) return;
    
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      if (res.status === 401) {
        await logout();
        navigate('/admin/login');
        return;
      }
      
      if (res.ok) {
        toast.success(`Order ${status}!`);
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const deleteMessage = async (id: number) => {
    if (!token) return;
    if (!confirm('Delete this message?')) return;
    
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.status === 401) {
        await logout();
        navigate('/admin/login');
        return;
      }
      
      if (res.ok) {
        toast.success('Message deleted');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            image: base64, 
            filename: file.name 
          })
        });

        if (res.status === 401) {
          await logout();
          navigate('/admin/login');
          return;
        }

        const data = await res.json();
        if (res.ok && data.success) {
          setFormData({ ...formData, image: data.url });
          toast.success('Image uploaded!');
        } else {
          toast.error(data.error || 'Upload failed');
        }
        setUploading(false);
      };
      reader.onerror = () => {
        toast.error('Failed to read file');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Upload failed');
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', name_bangla: '', price: '', category: 'Signature',
      description: '', image: '/images/tea-1.png', available: true
    });
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      name_bangla: item.name_bangla || '',
      price: item.price.toString(),
      category: item.category || 'Signature',
      description: item.description || '',
      image: item.image || '/images/tea-1.png',
      available: !!item.available
    });
    setShowAddModal(true);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'menu', label: 'Menu', icon: Menu, count: menuItems.length },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, count: orders.filter(o => o.status === 'pending').length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: messages.length },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ backgroundColor: 'transparent' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
              Admin Panel
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Logged in as: <span className="font-bold text-orange-500">{admin?.username}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium"
              style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Last Update Info */}
        <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
          Last updated: {lastUpdate.toLocaleTimeString()} (auto-refreshes every 30s)
        </p>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === tab.id 
                  ? '' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: activeTab === tab.id ? 'var(--accent)' : 'var(--bg-card)',
                color: activeTab === tab.id ? 'white' : 'var(--text-primary)'
              }}
            >
              <tab.icon size={20} />
              {tab.label}
              {tab.count > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Menu Items</h2>
              <button
                onClick={() => { resetForm(); setEditingItem(null); setShowAddModal(true); }}
                className="px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
              >
                <Plus size={20} /> Add Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map(item => (
                <div 
                  key={item.id} 
                  className="rounded-3xl p-6"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                      <p className="text-orange-500 text-sm">{item.name_bangla}</p>
                    </div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>৳{item.price}</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span 
                      className="text-xs font-bold uppercase px-3 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                    >
                      {item.category}
                    </span>
                    <button
                      onClick={() => toggleAvailability(item)}
                      className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                        item.available 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {item.available ? <Eye size={14} /> : <EyeOff size={14} />}
                      {item.available ? 'Available' : 'Unavailable'}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 bg-red-100 text-red-600 rounded-xl hover:bg-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Orders</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className="rounded-3xl p-6"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>#{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-600' :
                          order.status === 'preparing' ? 'bg-purple-100 text-purple-600' :
                          order.status === 'ready' ? 'bg-orange-100 text-orange-600' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{order.customer_name}</p>
                      <div className="flex items-center gap-4 text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-1"><Phone size={14} /> {order.phone}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {order.address || 'N/A'}</span>
                      </div>
                      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>{order.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">৳{order.total}</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{order.payment_method}</p>
                      <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Check size={16} /> Confirm
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="bg-purple-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Package size={16} /> Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Package size={16} /> Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Check size={16} /> Delivered
                      </button>
                    )}
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >
                        <X size={16} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-12 rounded-3xl" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <ShoppingBag size={48} className="mx-auto mb-4 text-stone-400" />
                  <p style={{ color: 'var(--text-secondary)' }}>No orders yet</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Contact Messages</h2>
            <div className="grid gap-4">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className="rounded-3xl p-6"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{msg.name}</h3>
                      <p className="text-orange-500 text-sm">{msg.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>{msg.message}</p>
                  <a
                    href={`mailto:${msg.email}`}
                    className="inline-flex items-center gap-2 mt-4 text-orange-500 font-bold hover:underline"
                  >
                    <Send size={16} /> Reply
                  </a>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-12 rounded-3xl" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <MessageSquare size={48} className="mx-auto mb-4 text-stone-400" />
                  <p style={{ color: 'var(--text-secondary)' }}>No messages yet</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Name (English)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Name (Bangla)</label>
                  <input
                    type="text"
                    value={formData.name_bangla}
                    onChange={e => setFormData({...formData, name_bangla: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Price (BDT)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                    >
                      <option>Signature</option>
                      <option>Classic</option>
                      <option>Refreshing</option>
                      <option>Healthy</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Image</label>
                  
                  {/* Image Preview */}
                  <div 
                    className="mb-4 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--bg-hover)', 
                      height: '200px',
                      border: '2px dashed var(--border)'
                    }}
                  >
                    {formData.image ? (
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="text-center text-stone-400">
                        <Image size={48} className="mx-auto mb-2" />
                        <p className="text-sm">No image selected</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Button */}
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      <div 
                        className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          uploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                        }`}
                        style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                      >
                        {uploading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload size={18} />
                            Upload Image
                          </>
                        )}
                      </div>
                    </label>
                    {formData.image && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '/images/tea-1.png' })}
                        className="px-4 py-3 rounded-xl font-bold bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  
                  {/* Path Input (optional) */}
                  <input
                    type="text"
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    placeholder="Or enter image URL..."
                    className="w-full mt-2 px-4 py-2 rounded-xl text-sm"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={e => setFormData({...formData, available: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Available</span>
                </label>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setEditingItem(null); }}
                    className="flex-1 py-3 rounded-xl border-2 font-bold"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-bold"
                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                  >
                    {editingItem ? 'Update' : 'Add Item'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
