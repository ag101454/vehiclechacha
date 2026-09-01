'use client';

import { useState, useEffect } from 'react';
import { User, Phone, Mail, Wallet, Check, X, RefreshCw, Camera, Eye, Star } from 'lucide-react';

export default function AdminMashwaraPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/mashwara', { cache: 'no-store' });
      const data = await response.json();
      if (response.ok) setRequests(data.requests || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/mashwara/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: status }),
      });
      fetchRequests();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-white">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Mashwara Requests</h1>
          <p className="text-chacha-muted mt-1">{requests.length} total requests</p>
        </div>
        <button onClick={fetchRequests} className="btn-secondary flex items-center gap-1 px-4 py-2 text-sm">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card-dark p-4 text-center">
          <div className="text-2xl font-bold text-white">{requests.length}</div>
          <div className="text-chacha-muted text-xs">Total</div>
        </div>
        <div className="card-dark p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">{requests.filter(r => r.paymentStatus === 'pending').length}</div>
          <div className="text-chacha-muted text-xs">Pending</div>
        </div>
        <div className="card-dark p-4 text-center">
          <div className="text-2xl font-bold text-green-500">{requests.filter(r => r.paymentStatus === 'verified').length}</div>
          <div className="text-chacha-muted text-xs">Verified</div>
        </div>
        <div className="card-dark p-4 text-center">
          <div className="text-2xl font-bold text-red-500">{requests.filter(r => r.paymentStatus === 'rejected').length}</div>
          <div className="text-chacha-muted text-xs">Rejected</div>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="card-dark p-12 text-center text-chacha-muted">No requests yet</div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="card-dark p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-white font-bold">{req.name}</div>
                  <div className="text-chacha-muted text-xs flex items-center gap-1"><Phone size={12} /> {req.phone}</div>
                  {req.email && <div className="text-chacha-muted text-xs flex items-center gap-1"><Mail size={12} /> {req.email}</div>}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  req.paymentStatus === 'verified' ? 'bg-green-500/10 text-green-500' :
                  req.paymentStatus === 'rejected' ? 'bg-red-500/10 text-red-500' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {req.paymentStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div className="bg-chacha-black rounded-lg p-2">
                  <div className="text-chacha-muted text-xs">Budget</div>
                  <div className="text-white font-medium">{req.budgetMin || '-'} - {req.budgetMax || '-'} Lakh</div>
                </div>
                <div className="bg-chacha-black rounded-lg p-2">
                  <div className="text-chacha-muted text-xs">Transaction ID</div>
                  <div className="text-chacha-yellow font-mono">{req.transactionId}</div>
                </div>
              </div>

              {/* Screenshot */}
              {req.screenshot && (
                <div className="mb-3">
                  <button
                    onClick={() => setSelectedScreenshot(req.screenshot)}
                    className="inline-flex items-center gap-2 text-chacha-yellow text-sm hover:text-yellow-400"
                  >
                    <Camera size={14} />
                    View Payment Screenshot
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 border-t border-chacha-border pt-3">
                <button
                  onClick={() => updateStatus(req.id, 'verified')}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 text-xs font-medium"
                >
                  <Check size={14} /> Verify
                </button>
                <button
                  onClick={() => updateStatus(req.id, 'rejected')}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-medium"
                >
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Screenshot Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedScreenshot(null)}>
          <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedScreenshot} alt="Payment Screenshot" className="w-full rounded-lg" />
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}