'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Assalam-o-Alaikum! Main Chacha hoon. Aapko gaari ke baare mein kuch poochna hai?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = async (userInput) => {
    const inputLower = userInput.toLowerCase();
    
    // Check for greetings
    if (inputLower.includes('salam') || inputLower.includes('hello') || inputLower.includes('hi')) {
      return 'Walaikum Assalam! Main aapki gaari dhoondhne mein madad kar sakta hoon. Budget batayein ya koi sawal poochein!';
    }

    // Check for budget queries
    if (inputLower.includes('budget') || inputLower.includes('kitna') || inputLower.includes('price') || inputLower.includes('qimat')) {
      return 'Aap "Find My Car" section mein ja kar apna budget select karein. Chacha aapke liye best gaariyan suggest karega!';
    }

    // Check for car type queries
    if (inputLower.includes('suv')) {
      return 'SUVs Pakistan mein kaafi popular hain! Kia Sportage aur Hyundai Tucson ache options hain. Family ke liye perfect hain!';
    }
    if (inputLower.includes('sedan')) {
      return 'Sedans mein Toyota Corolla aur Honda City sabse popular hain. Comfortable aur achi resale value!';
    }
    if (inputLower.includes('hatchback') || inputLower.includes('small')) {
      return 'Hatchbacks mein Suzuki Swift aur Cultus ache options hain. Fuel efficient aur city driving ke liye perfect!';
    }

    // Check for fuel queries
    if (inputLower.includes('fuel') || inputLower.includes('petrol') || inputLower.includes('hybrid')) {
      return 'Fuel economy ke hisaab se Suzuki cars best hain. Hybrid options bhi available hain agar aap zyada driving karte hain!';
    }

    // Check for family queries
    if (inputLower.includes('family') || inputLower.includes('khandan')) {
      return 'Family ke liye SUV ya bari sedan best hai. Kia Sportage ya Toyota Corolla check karein!';
    }

    // Check for comparison
    if (inputLower.includes('compare') || inputLower.includes('muqabla') || inputLower.includes('vs')) {
      return 'Aap "Compare" section mein ja kar 2 ya 3 gaariyan compare kar sakte hain. Side by side comparison milta hai!';
    }

    // Default response
    return 'Achha sawal hai! Aap "Find My Car" try karein - wahan Chacha aapke budget aur preferences ke hisaab se best gaari suggest karega.';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    const botResponse = await getBotResponse(input);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Chat' : 'Open Chat Assistant'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-chacha-yellow rounded-full flex items-center justify-center shadow-2xl shadow-chacha-yellow/30 hover:scale-110 transition-all"
        >
        {isOpen ? <X size={24} className="text-chacha-black" /> : <MessageCircle size={24} className="text-chacha-black" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-chacha-card border border-chacha-border rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-chacha-yellow px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-chacha-black rounded-full flex items-center justify-center">
                <Bot size={20} className="text-chacha-yellow" />
              </div>
              <div>
                <div className="text-chacha-black font-bold">Chacha Assistant</div>
                <div className="text-chacha-black/70 text-xs">Online - Ready to help!</div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.type === 'user'
                        ? 'bg-chacha-yellow text-chacha-black rounded-br-none'
                        : 'bg-chacha-black text-white rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-chacha-black text-white px-4 py-2 rounded-2xl rounded-bl-none text-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-chacha-yellow rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-chacha-yellow rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1.5 h-1.5 bg-chacha-yellow rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-chacha-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-chacha-black border border-chacha-border rounded-full px-4 py-2 text-white text-sm placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                  placeholder="Apna sawal poochein..."
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-chacha-yellow rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
                >
                  <Send size={16} className="text-chacha-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}