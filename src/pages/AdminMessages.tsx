import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, RefreshCw, Mail, User, Clock, LogOut, LayoutDashboard } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate, Link } from 'react-router-dom';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { token, isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  const fetchMessages = async () => {
    if (!token) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.status === 401) {
        await logout();
        navigate('/admin/login');
        return;
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!token) return;
    
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id));
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else {
      fetchMessages();
    }
  }, [isAuthenticated, token]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pt-32 pb-24" style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
      <div className="container-luxury max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card p-8 mb-8"
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <Mail size={28} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  Contact Messages
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Manage customer inquiries and messages
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 luxury-card hover:scale-[1.02] transition-transform"
                style={{ color: 'var(--text-primary)' }}
              >
                <LayoutDashboard size={18} />
                Panel
              </Link>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchMessages}
                className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 luxury-card hover:scale-[1.02] transition-transform"
                style={{ color: 'var(--text-primary)' }}
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                Refresh
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 text-red-500"
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin w-12 h-12 border-4 rounded-full mx-auto" 
              style={{ borderColor: 'var(--accent-light)', borderTopColor: 'var(--accent)' }} 
            />
          </div>
        ) : messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 luxury-card"
          >
            <Mail size={48} className="mx-auto mb-4 text-stone-400" />
            <p style={{ color: 'var(--text-secondary)' }} className="text-xl">No messages found.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="luxury-card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent-light)' }}
                    >
                      <User size={18} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <span className="font-bold block" style={{ color: 'var(--text-primary)' }}>{msg.name}</span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{msg.email}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteMessage(msg.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
                
                <div className="flex items-center gap-2 text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                  <Clock size={14} />
                  <span>{new Date(msg.created_at).toLocaleString()}</span>
                </div>
                <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {msg.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
