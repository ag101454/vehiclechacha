'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Send, MessageCircle, Users, Pin, Clock, CheckCircle, ArrowDown
} from 'lucide-react';

export default function CarGroupChatPage() {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [regularMessages, setRegularMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [carInfo, setCarInfo] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const lastMessageCount = useRef(0);
  const hasInitialLoaded = useRef(false);

  // Check localStorage for existing user
  useEffect(() => {
    const savedUser = localStorage.getItem('vehiclechacha_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUserName(userData.userName);
      setUserEmail(userData.userEmail || '');
      setShowJoinForm(false);
    }
  }, []);

  // Fetch car info
  useEffect(() => {
    fetchCarInfo();
  }, []);

  // Poll for new messages
  useEffect(() => {
    if (!showJoinForm) {
      fetchMessages(false);
      fetchParticipants();
      
      const interval = setInterval(() => {
        fetchMessages(true);
        fetchParticipants();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [showJoinForm]);

  const isNearBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return true;
    const threshold = 150;
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  };

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end',
      });
    }
  };

  const fetchCarInfo = async () => {
    try {
      const response = await fetch(`/api/group-chat/car?brand=${params.brand}&model=${params.model}`);
      const data = await response.json();
      if (response.ok) setCarInfo(data.car);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMessages = async (isPolling = false) => {
    try {
      const response = await fetch(`/api/group-chat/messages?brand=${params.brand}&model=${params.model}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      if (response.ok) {
        const allMessages = data.messages || [];
        
        // Separate pinned and regular messages
        const pinned = allMessages.filter(m => m.isPinned);
        const regular = allMessages.filter(m => !m.isPinned);
        
        setPinnedMessages(pinned);
        setRegularMessages(regular);
        setMessages(allMessages);
        
        // ONLY scroll on initial load
        if (!isPolling && !hasInitialLoaded.current) {
          setTimeout(() => scrollToBottom(false), 300);
          hasInitialLoaded.current = true;
        }
        
        // Show scroll button if new messages arrive
        if (isPolling && allMessages.length > lastMessageCount.current && !isNearBottom()) {
          setShowScrollButton(true);
        }
        
        lastMessageCount.current = allMessages.length;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await fetch(`/api/group-chat/participants?brand=${params.brand}&model=${params.model}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      if (response.ok) setParticipants(data.participants || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    
    try {
      await fetch('/api/group-chat/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: params.brand, model: params.model, userName, userEmail }),
      });
      
      localStorage.setItem('vehiclechacha_user', JSON.stringify({ userName, userEmail }));
      setShowJoinForm(false);
      hasInitialLoaded.current = false;
      fetchMessages(false);
      fetchParticipants();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userName) return;

    setSending(true);
    try {
      const response = await fetch('/api/group-chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          brand: params.brand, 
          model: params.model, 
          userName, 
          message: newMessage 
        }),
      });
      
      if (response.ok) {
        setNewMessage('');
        await fetchMessages(false);
        setTimeout(() => scrollToBottom(true), 200);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSending(false);
    }
  };

  const handleScroll = () => {
    if (isNearBottom()) {
      setShowScrollButton(false);
    }
  };

  const handleScrollToBottom = () => {
    scrollToBottom(true);
    setShowScrollButton(false);
  };

  const handleLeave = () => {
    localStorage.removeItem('vehiclechacha_user');
    setUserName('');
    setUserEmail('');
    setShowJoinForm(true);
    hasInitialLoaded.current = false;
  };

  if (showJoinForm) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12 flex items-center justify-center">
          <div className="card-dark p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={32} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Join Group Chat</h1>
            <p className="text-chacha-muted text-sm mb-6">
              Enter your name once. You won&apos;t need to enter it again!
            </p>
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-1 text-left">Name *</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1 text-left">Email (Optional)</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  placeholder="Your email"
                />
              </div>
              <button type="submit" className="bg-green-500 text-white w-full py-3 rounded-lg font-bold hover:bg-green-600 transition-colors">
                Join Chat
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-0 flex flex-col">
        {/* Chat Header */}
        <div className="bg-chacha-card border-b border-chacha-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <MessageCircle size={20} className="text-green-500" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">
                {carInfo?.brand?.name} {carInfo?.name} - Group Chat
              </h1>
              <div className="flex items-center gap-1 text-chacha-muted text-xs">
                <Users size={12} className="text-green-500" />
                {participants.length} participants
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">● Live</span>
            <button onClick={handleLeave} className="text-chacha-muted hover:text-red-500 text-xs">
              Leave
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto bg-chacha-black relative"
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        >
          {/* ===== PINNED MESSAGES SECTION (WhatsApp Style) ===== */}
          {pinnedMessages.length > 0 && (
            <div className="bg-chacha-yellow/5 border-b border-chacha-yellow/20 sticky top-0 z-10 backdrop-blur">
              {/* Pinned Header */}
              <div className="flex items-center gap-2 px-4 py-2 text-chacha-yellow">
                <Pin size={14} />
                <span className="text-xs font-bold uppercase tracking-wide">Pinned Messages</span>
                <span className="text-chacha-muted text-xs">({pinnedMessages.length})</span>
              </div>
              
              {/* Pinned Messages */}
              <div className="px-4 pb-3 space-y-2">
                {pinnedMessages.map((msg) => (
                  <div key={msg.id} className="bg-chacha-card border border-chacha-yellow/30 rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <Pin size={14} className="text-chacha-yellow shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="text-xs font-bold text-chacha-yellow mb-1">
                          {msg.isAdmin ? '👨🏽 Chacha (Admin)' : msg.userName}
                        </div>
                        <p className="text-white text-sm">{msg.message}</p>
                        <div className="text-chacha-muted text-[10px] mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Messages */}
          <div className="p-4 space-y-3">
            {regularMessages.length === 0 && pinnedMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle size={48} className="text-chacha-muted mx-auto mb-3" />
                <p className="text-chacha-muted">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              regularMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.userName === userName || msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] ${msg.userName === userName || msg.isAdmin ? 'order-1' : ''}`}>
                    <div className={`px-4 py-2 rounded-2xl text-sm ${
                      msg.isAdmin
                        ? 'bg-chacha-yellow text-chacha-black rounded-br-none'
                        : msg.userName === userName
                        ? 'bg-green-500 text-white rounded-br-none'
                        : 'bg-chacha-card text-white rounded-bl-none'
                    }`}>
                      {msg.userName !== userName && !msg.isAdmin && (
                        <div className="text-green-500 text-xs font-bold mb-1">{msg.userName}</div>
                      )}
                      {msg.isAdmin && (
                        <div className="text-chacha-black/70 text-xs font-bold mb-1">👨🏽 Chacha (Admin)</div>
                      )}
                      {msg.message}
                    </div>
                    <div className="text-chacha-muted text-[10px] mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(msg.createdAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                      {(msg.userName === userName || msg.isAdmin) && <CheckCircle size={10} className="text-green-500" />}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={handleScrollToBottom}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full px-4 py-2 shadow-lg hover:bg-green-600 transition-colors z-20 flex items-center gap-1 text-sm font-medium"
          >
            <ArrowDown size={16} />
            New Messages
          </button>
        )}

        {/* Input Area */}
        <div className="bg-chacha-card border-t border-chacha-border p-3">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-chacha-black border border-chacha-border rounded-full px-4 py-2.5 text-white text-sm focus:border-green-500 focus:outline-none"
              placeholder={`Type as ${userName}...`}
            />
            <button type="submit" disabled={sending} className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shrink-0">
              <Send size={16} className="text-white" />
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}