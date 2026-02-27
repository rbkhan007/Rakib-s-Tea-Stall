import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

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

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: `You are "Chai Bot", a friendly assistant for "Rakib's Tea Stall" in Gulshan, Dhaka. 
          Our menu includes: 
          - Milk Tea (Dudh Cha) - 40 BDT (Creamy, signature)
          - Black Tea (Rong Cha) - 20 BDT (Strong, aromatic)
          - Lemon Tea (Lebu Cha) - 25 BDT (Zesty, refreshing)
          - Green Tea - 35 BDT (Healthy, organic)
          - Masala Chai - 50 BDT (Spiced with cardamom, ginger)
          - Ginger Tea - 25 BDT (Classic with fresh ginger)
          - Iced Lemon Tea - 45 BDT (Chilled with mint)
          - Honey Green Tea - 55 BDT (Sweetened with honey)
          
          Be helpful, polite, and use a bit of local Bangladeshi charm (e.g., using "Bhai", "Apni"). 
          Recommend teas based on user mood (e.g., if tired, recommend Masala Chai or Ginger Tea). 
          Keep responses concise.`,
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Would you like to try our signature Milk Tea?";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Oops! My tea kettle is acting up. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-8 z-40 bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
        <span className="absolute right-full mr-4 bg-white dark:bg-stone-900 text-stone-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-2">
          <Sparkles size={14} className="text-orange-500" />
          Ask Chai Bot
        </span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-48 right-8 z-50 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-2xl border dark:border-stone-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-gradient p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Chai Bot</h3>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online & Brewing
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow p-6 overflow-y-auto space-y-4 bg-stone-50 dark:bg-stone-950/50"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-orange-500 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-stone-900 border-t dark:border-stone-800">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our tea..."
                  className="w-full pl-4 pr-12 py-3 rounded-full bg-stone-100 dark:bg-stone-800 border-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <Send size={16} />
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
