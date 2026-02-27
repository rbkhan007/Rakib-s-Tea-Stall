import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const ChaiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: "Hello! I'm your Chai Assistant. How can I help you choose the perfect tea today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Simple mock response for demo
    setTimeout(() => {
      const responses = [
        "Our signature Milk Tea is absolutely delicious! Would you like to try it?",
        "For a refreshing choice, I'd recommend our Lemon Tea!",
        "Masala Chai is perfect if you like spicy teas with cardamom and ginger.",
        "Our Green Tea is great for health-conscious customers!",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'bot', text: randomResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const quickReplies = [
    "What's your best seller?",
    "Recommend something refreshing",
    "Show me milk tea options"
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ 
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
          boxShadow: '0 8px 30px rgba(197, 163, 88, 0.4)'
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-36 right-6 z-40 w-80 lg:w-96 rounded-2xl overflow-hidden luxury-card"
            style={{ maxHeight: '500px' }}
          >
            {/* Header */}
            <div 
              className="p-4 flex items-center gap-3"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)'
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Chai Assistant</p>
                <p className="text-white/70 text-xs">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="p-4 space-y-3 overflow-y-auto"
              style={{ height: '280px', backgroundColor: 'var(--bg-secondary)' }}
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'text-white rounded-br-md' 
                        : 'rounded-2xl rounded-bl-md'
                    }`}
                    style={{ 
                      backgroundColor: msg.role === 'user' 
                        ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)'
                        : 'var(--bg-card)',
                      color: msg.role === 'user' ? 'white' : 'var(--text-primary)'
                    }}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-2xl rounded-bl-md" style={{ backgroundColor: 'var(--bg-card)' }}>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent)' }} />
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent)', animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent)', animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInput(reply); }}
                    className="px-3 py-1.5 rounded-full text-xs transition-colors"
                    style={{ 
                      backgroundColor: 'var(--accent-light)', 
                      color: 'var(--accent)' 
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t" style={{ borderColor: 'var(--border-light)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full text-sm"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)'
                  }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChaiBot;
