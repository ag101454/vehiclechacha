'use client';

import { useState } from 'react';
import { Save, Lock } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('Settings saved successfully!');
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="min-h-screen bg-chacha-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        {message && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg p-4 mb-6">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock size={20} className="text-chacha-yellow" />
              Admin Credentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Username</label>
                <input type="text" value="admin" disabled className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-chacha-muted" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Password</label>
                <input type="password" value="vehiclechacha2024" disabled className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-chacha-muted" />
              </div>
            </div>
            <p className="text-chacha-muted text-xs mt-3">
              Change credentials in environment variables (ADMIN_USERNAME, ADMIN_PASSWORD)
            </p>
          </div>

          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recommendation Weights</h2>
            <p className="text-chacha-muted text-sm mb-4">
              These weights determine how Chacha Match™ scores cars
            </p>
            <div className="space-y-3">
              {[
                { label: 'Budget Fit', weight: '25%' },
                { label: 'Fuel Economy', weight: '15%' },
                { label: 'Family Suitability', weight: '15%' },
                { label: 'Safety', weight: '15%' },
                { label: 'Maintenance', weight: '10%' },
                { label: 'Resale', weight: '10%' },
                { label: 'Features', weight: '5%' },
                { label: 'Performance', weight: '5%' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-chacha-black rounded-lg p-3">
                  <span className="text-white">{item.label}</span>
                  <span className="text-chacha-yellow font-semibold">{item.weight}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-primary inline-flex items-center gap-2 px-6 py-3">
            <Save size={20} />
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}