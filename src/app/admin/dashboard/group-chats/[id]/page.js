'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Send, MessageCircle, Users, Pin, 
  RefreshCw, Car, Trash2, CheckCircle
} from 'lucide-react';

export default function AdminChatDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
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
        setMessages(data.messages || []);
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
    // Poll every 5 seconds for new messages
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

  const handlePin = async (messageId, isPinned) => {
    try {
      await fetch(`/api/admin/group-chats/${params.id}/pin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, isPinned: !isPinned }),
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
          <button
            onClick={() => router.push('/admin/dashboard/group-chats')}
            className="text-chacha-muted hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
            <Car size={20} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">
              {chat?.vehicle?.brand?.name} {chat?.vehicle?.name} - Chat
            </h1>
            <div className="flex items-center gap-1 text-chacha-muted text-xs">
              <Users size={12} className="text-green-500" />
              {participants.length} participants
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">● Live</span>
          <button onClick={fetchChat} className="text-chacha-muted hover:text-white">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-chacha-black">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="text-chacha-muted mx-auto mb-3" />
            <p className="text-chacha-muted">No messages yet</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] ${msg.isAdmin ? 'order-1' : ''}`}>
                {/* Pin badge */}
                {msg.isPinned && (
                  <div className="flex items-center gap-1 text-chacha-yellow text-xs mb-1">
                    <Pin size={12} /> Pinned Message
                  </div>
                )}
                
                {/* Message bubble */}
                <div className={`px-4 py-2 rounded-2xl text-sm ${
                  msg.isAdmin
                    ? 'bg-chacha-yellow text-chacha-black rounded-br-none'
                    : 'bg-chacha-card text-white rounded-bl-none'
                }`}>
                  {!msg.isAdmin && (
                    <div className="text-green-500 text-xs font-bold mb-1">{msg.userName}</div>
                  )}
                  {msg.isAdmin && (
                    <div className="text-chacha-black/70 text-xs font-bold mb-1">Admin</div>
                  )}
                  {msg.message}
                  {msg.image && (
                    <img src={msg.image} alt="chat" className="mt-2 rounded max-h-40" />
                  )}
                </div>
                
                {/* Timestamp & Actions */}
                <div className="text-chacha-muted text-[10px] mt-1 flex items-center gap-2">
                  {new Date(msg.createdAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                  
                  {/* Admin actions */}
                  <button
                    onClick={() => handlePin(msg.id, msg.isPinned)}
                    className={`hover:text-chacha-yellow ${msg.isPinned ? 'text-chacha-yellow' : ''}`}
                    title={msg.isPinned ? 'Unpin' : 'Pin'}
                  >
                    <Pin size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="hover:text-red-500"
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