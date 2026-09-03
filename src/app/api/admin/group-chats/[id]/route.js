'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, Send, MessageCircle, Users, Pin, 
  RefreshCw, Car, Trash2, X
} from 'lucide-react';

export default function AdminChatDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchChat = async () => {
    try {
      const response = await fetch(`/api/admin/group-chats/${params.id}`, { cache: 'no-store' });
      const data = await response.json();
      if (response.ok) {
        setChat(data.chat);
        const allMessages = data.messages || [];
        // Separate pinned and regular messages
        setPinnedMessages(allMessages.filter(m => m.isPinned));
        setMessages(allMessages.filter(m => !m.isPinned));
        setParticipants(data.participants || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
    const interval = setInterval(fetchChat, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const response = await fetch(`/api/admin/group-chats/${params.id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage, isAdmin: true }),
      });
      
      if (response.ok) {
        setNewMessage('');
        fetchChat();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSending(false);
    }
  };

  const handlePin = async (messageId, currentPinStatus) => {
    try {
      await fetch(`/api/admin/group-chats/${params.id}/pin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, isPinned: !currentPinStatus }),
      });
      fetchChat();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (messageId) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`/api/admin/group-chats/${params.id}/messages/${messageId}`, {
        method: 'DELETE',
      });
      fetchChat();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-white">
        <RefreshCw className="animate-spin mx-auto mb-2" size={32} />
        Loading chat...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chacha-black flex flex-col">
      {/* Chat Header */}
      <div className="bg-chacha-card border-b border-chacha-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/dashboard/group-chats')} className="text-chacha-muted hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
            <Car size={20} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">
              {chat?.vehicle?.brand?.name} {chat?.vehicle?.name}
            </h1>
            <div className="flex items-center gap-1 text-chacha-muted text-xs">
              <Users size={12} className="text-green-500" />
              {participants.length} participants
            </div>
          </div>
        </div>
        <button onClick={fetchChat} className="text-chacha-muted hover:text-white">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* ===== PINNED MESSAGES SECTION (WhatsApp Style) ===== */}
      {pinnedMessages.length > 0 && (
        <div className="bg-chacha-yellow/5 border-b border-chacha-yellow/20">
          {/* Pinned Header */}
          <div className="flex items-center gap-2 px-4 py-2 text-chacha-yellow">
            <Pin size={14} />
            <span className="text-xs font-bold uppercase tracking-wide">Pinned Messages</span>
            <span className="text-chacha-muted text-xs">({pinnedMessages.length})</span>
          </div>
          
          {/* Pinned Messages List */}
          <div className="px-4 pb-3 space-y-2">
            {pinnedMessages.map((msg) => (
              <div key={msg.id} className="bg-chacha-card border border-chacha-yellow/30 rounded-xl p-3 relative">
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
                  {/* Unpin Button */}
                  <button
                    onClick={() => handlePin(msg.id, true)}
                    className="p-1 text-chacha-muted hover:text-white transition-colors"
                    title="Unpin"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== REGULAR MESSAGES ===== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-chacha-black">
        {messages.length === 0 && pinnedMessages.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="text-chacha-muted mx-auto mb-3" />
            <p className="text-chacha-muted">No messages yet</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] ${msg.isAdmin ? 'order-1' : ''}`}>
                <div className={`px-4 py-2 rounded-2xl text-sm ${
                  msg.isAdmin
                    ? 'bg-chacha-yellow text-chacha-black rounded-br-none'
                    : 'bg-chacha-card text-white rounded-bl-none'
                }`}>
                  {!msg.isAdmin && (
                    <div className="text-green-500 text-xs font-bold mb-1">{msg.userName}</div>
                  )}
                  {msg.isAdmin && (
                    <div className="text-chacha-black/70 text-xs font-bold mb-1">👨🏽 Chacha (Admin)</div>
                  )}
                  {msg.message}
                </div>
                <div className="text-chacha-muted text-[10px] mt-1 flex items-center gap-2">
                  {new Date(msg.createdAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                  {/* Pin Button */}
                  <button
                    onClick={() => handlePin(msg.id, false)}
                    className="text-chacha-muted hover:text-chacha-yellow transition-colors"
                    title="Pin this message"
                  >
                    <Pin size={12} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-chacha-muted hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-chacha-card border-t border-chacha-border p-3">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-chacha-black border border-chacha-border rounded-full px-4 py-2.5 text-white text-sm focus:border-chacha-yellow focus:outline-none"
            placeholder="Type admin message..."
          />
          <button type="submit" disabled={sending} className="w-10 h-10 bg-chacha-yellow rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0">
            <Send size={16} className="text-chacha-black" />
          </button>
        </form>
      </div>
    </div>
  );
}