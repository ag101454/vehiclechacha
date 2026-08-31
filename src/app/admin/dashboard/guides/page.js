'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, RefreshCw, FileText, Trash2, Edit, Search } from 'lucide-react';

export default function AdminGuidesPage() {
  const router = useRouter();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Buying Guide',
    excerpt: '',
    content: '',
  });

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/guides', { cache: 'no-store' });
      const data = await response.json();
      if (response.ok) {
        setGuides(data.guides || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/admin/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowForm(false);
        setFormData({ title: '', category: 'Buying Guide', excerpt: '', content: '' });
        fetchGuides();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this guide?')) return;
    try {
      await fetch(`/api/admin/guides/${id}`, { method: 'DELETE' });
      fetchGuides();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredGuides = guides.filter(g =>
    g.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 text-center text-white">
        <RefreshCw className="animate-spin mx-auto mb-2" size={32} />
        Loading guides...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Guides</h1>
          <p className="text-chacha-muted mt-1">{guides.length} guides</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchGuides} className="btn-secondary flex items-center gap-1 px-4 py-2 text-sm">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-1 px-4 py-2 text-sm">
            <Plus size={14} /> Add Guide
          </button>
        </div>
      </div>

      {/* Add Guide Form */}
      {showForm && (
        <div className="card-dark p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4">Add New Guide</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                >
                  <option>Buying Guide</option>
                  <option>Comparison</option>
                  <option>Fuel Guide</option>
                  <option>Driving Guide</option>
                  <option>Financial Guide</option>
                  <option>Family Guide</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-white text-sm mb-1">Excerpt</label>
              <input
                type="text"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                placeholder="Short description..."
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-1">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                required
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary px-6 py-2.5">
              {saving ? 'Saving...' : 'Save Guide'}
            </button>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chacha-muted" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-chacha-card border border-chacha-border rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-chacha-yellow focus:outline-none"
          placeholder="Search guides..."
        />
      </div>

      {/* Guides List */}
      {filteredGuides.length === 0 ? (
        <div className="card-dark p-12 text-center">
          <FileText className="mx-auto text-chacha-muted mb-3" size={48} />
          <h3 className="text-white font-semibold text-lg mb-1">No Guides Yet</h3>
          <p className="text-chacha-muted text-sm">Click "Add Guide" to create your first guide</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="card-dark p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-chacha-yellow text-xs bg-chacha-yellow/10 px-2 py-1 rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg">{guide.title}</h3>
                  <p className="text-chacha-muted text-sm mt-1">{guide.excerpt}</p>
                  <div className="text-chacha-muted text-xs mt-2">
                    {new Date(guide.createdAt).toLocaleDateString('en-PK')}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(guide.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}