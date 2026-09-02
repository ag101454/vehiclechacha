'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Pin, Users, RefreshCw, Car } from 'lucide-react';

export default function AdminGroupChatsPage() {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/admin/group-chats', { cache: 'no-store' });
      const data = await response.json();
      if (response.ok) setChats(data.chats || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-white">Loading group chats...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Group Chats</h1>
          <p className="text-chacha-muted mt-1">{chats.length} active chats</p>
        </div>
        <button onClick={fetchChats} className="btn-secondary flex items-center gap-1 px-4 py-2 text-sm">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {chats.length === 0 ? (
        <div className="card-dark p-12 text-center">
          <MessageCircle size={48} className="text-chacha-muted mx-auto mb-3" />
          <p className="text-chacha-muted">No group chats yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chats.map((chat) => (
            <div key={chat.id} className="card-dark p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Car size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="text-white font-bold">
                    {chat.vehicle?.brand?.name} {chat.vehicle?.name}
                  </div>
                  <div className="text-chacha-muted text-xs flex items-center gap-1">
                    <Users size={10} />
                    {chat.participants?.length || 0} participants
                  </div>
                </div>
              </div>
              <div className="text-chacha-muted text-xs mb-3">
                {chat.messages?.length || 0} messages
              </div>
              <Link
                href={`/admin/dashboard/group-chats/${chat.id}`}
                className="bg-green-500 text-white w-full py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-1"
              >
                <MessageCircle size={14} />
                Open Chat
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}