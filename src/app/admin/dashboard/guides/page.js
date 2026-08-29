'use client';

import { Plus } from 'lucide-react';

export default function AdminGuidesPage() {
  return (
    <div className="min-h-screen bg-chacha-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Guides</h1>
            <p className="text-chacha-muted mt-1">Manage car buying guides</p>
          </div>
          <button className="btn-primary inline-flex items-center gap-2">
            <Plus size={20} />
            Add Guide
          </button>
        </div>

        <div className="card-dark p-12 text-center">
          <h3 className="text-white font-semibold text-lg mb-2">No Guides Yet</h3>
          <p className="text-chacha-muted text-sm">Guides will be added in a future update</p>
        </div>
      </div>
    </div>
  );
}