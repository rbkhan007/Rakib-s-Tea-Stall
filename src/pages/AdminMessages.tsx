import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, RefreshCw, Mail, User, Clock, Lock, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

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
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
            Contact Messages
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchMessages}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-colors text-red-500"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 text-red-500">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-24 rounded-3xl" style={{ backgroundColor: 'var(--bg-card)' }}>
            <Mail size={48} className="mx-auto mb-4 text-stone-400" />
            <p style={{ color: 'var(--text-secondary)' }} className="text-xl">No messages found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl space-y-4 relative"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                  title="Delete message"
                >
                  <Trash2 size={18} />
                </button>
                
                <div className="flex items-center gap-3 text-orange-500">
                  <User size={18} />
                  <span className="font-bold">{msg.name}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-500 text-sm">
                  <Mail size={16} />
                  <span>{msg.email}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400 text-xs">
                  <Clock size={14} />
                  <span>{new Date(msg.created_at).toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
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
