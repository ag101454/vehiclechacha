'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Flame, MessageCircle, Users, TrendingUp, 
  Clock, ArrowRight, Star
} from 'lucide-react';

export default function HottestChats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHottestChats();
    // Poll every 10 seconds
    const interval = setInterval(fetchHottestChats, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchHottestChats = async () => {
    try {
      const response = await fetch('/api/group-chat/hottest', { cache: 'no-store' });
      const data = await response.json();
      if (response.ok) setChats(data.chats || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (chats.length === 0) {
    return null;
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-2 mb-3"
          >
            <Flame size={18} className="text-orange-500 animate-pulse" />
            <span className="text-orange-500 font-bold text-sm tracking-wide">
              TRENDING NOW
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            🔥 Hottest Group Chats
          </h2>
          <p className="text-chacha-muted text-lg">
            Most active discussions - Join the conversation!
          </p>
        </div>

        {/* Chat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {chats.map((chat, index) => {
            const isHottest = index === 0;
            const vehicle = chat.vehicle;
            
            return (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/group-chat/${vehicle.brand.slug}/${vehicle.slug}`}
                  className={`block card-dark overflow-hidden transition-all duration-300 hover:-translate-y-2 group ${
                    isHottest 
                      ? 'border-2 border-orange-500 shadow-xl shadow-orange-500/20' 
                      : 'border border-chacha-border hover:border-orange-500/50'
                  }`}
                >
                  {/* Rank Badge */}
                  <div className={`px-4 py-2 flex items-center justify-between ${
                    isHottest ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 'bg-chacha-card'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Flame size={16} className={isHottest ? 'text-white' : 'text-orange-500'} />
                      <span className={`font-bold text-sm ${isHottest ? 'text-white' : 'text-orange-500'}`}>
                        #{index + 1} {isHottest ? 'HOTTEST' : 'TRENDING'}
                      </span>
                    </div>
                    <span className={`text-xs font-medium ${isHottest ? 'text-white/80' : 'text-chacha-muted'}`}>
                      {chat.participantCount} members
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                        <MessageCircle size={20} className="text-orange-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold group-hover:text-orange-500 transition-colors">
                          {vehicle.brand.name} {vehicle.name}
                        </h3>
                        <div className="text-chacha-muted text-xs">{vehicle.bodyType}</div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-chacha-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Users size={12} className="text-orange-500" />
                        {chat.participantCount} members
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={12} className="text-orange-500" />
                        {chat.messageCount} messages
                      </span>
                    </div>

                    {/* Last Message Preview */}
                    {chat.lastMessage && (
                      <div className="bg-chacha-black rounded-lg p-2 mb-3">
                        <div className="text-orange-500 text-xs font-bold mb-0.5">
                          {chat.lastMessage.isAdmin ? '👨🏽 Chacha (Admin)' : chat.lastMessage.userName}
                        </div>
                        <p className="text-chacha-muted text-xs truncate">
                          {chat.lastMessage.message}
                        </p>
                      </div>
                    )}

                    {/* Join Button */}
                    <div className={`w-full py-2 rounded-lg text-sm font-bold text-center transition-all ${
                      isHottest 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white' 
                        : 'bg-chacha-card text-white group-hover:bg-orange-500/20'
                    }`}>
                      Join Chat
                      <ArrowRight size={14} className="inline ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}