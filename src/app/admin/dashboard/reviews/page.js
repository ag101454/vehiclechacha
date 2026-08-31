'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, User, Mail, Car, RefreshCw, Check, Trash2 } from 'lucide-react';

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/reviews', {
        cache: 'no-store',
      });
      const data = await response.json();
      console.log('Fetched reviews count:', data.count);
      console.log('Fetched reviews:', data.reviews);
      
      if (response.ok) {
        setReviews(data.reviews || []);
      } else {
        setError(data.error || 'Failed to fetch');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return;
    try {
      await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-white">
        <RefreshCw className="animate-spin mx-auto mb-2" size={32} />
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">
          Reviews ({reviews.length})
        </h1>
        <button 
          onClick={fetchReviews}
          className="btn-secondary flex items-center gap-1 px-4 py-2 text-sm"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="text-chacha-muted text-center py-12">
          No reviews found in database
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={review.id || index} className="bg-chacha-card border border-chacha-border rounded-xl p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-chacha-yellow/10 rounded-full flex items-center justify-center">
                    <User size={20} className="text-chacha-yellow" />
                  </div>
                  <div>
                    <div className="text-white font-bold">
                      {index + 1}. {review.userName}
                    </div>
                    <div className="flex items-center gap-1 text-chacha-muted text-xs">
                      <Mail size={12} />
                      {review.email}
                    </div>
                  </div>
                </div>
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < (review.rating || 0) ? 'fill-chacha-yellow text-chacha-yellow' : 'text-chacha-border'}
                    />
                  ))}
                </div>
              </div>

              {/* Car Info */}
              <div className="bg-chacha-black rounded-lg px-3 py-2 mb-3 inline-flex items-center gap-2">
                <Car size={14} className="text-chacha-yellow" />
                <span className="text-chacha-muted text-sm">
                  {review.vehicle?.brand?.name || 'Unknown'} {review.vehicle?.name || 'Car'}
                </span>
              </div>

              {/* Review Title */}
              {review.title && (
                <div className="text-white font-semibold mb-1">{review.title}</div>
              )}

              {/* Review Content */}
              <p className="text-chacha-muted text-sm leading-relaxed mb-3">
                {review.review}
              </p>

              {/* Pros/Cons */}
              {review.pros && (
                <div className="text-green-500 text-xs mb-1">👍 {review.pros}</div>
              )}
              {review.cons && (
                <div className="text-red-500 text-xs mb-2">👎 {review.cons}</div>
              )}

              {/* Date & Status */}
              <div className="flex items-center justify-between border-t border-chacha-border pt-3">
                <div className="text-chacha-muted text-xs">
                  {new Date(review.createdAt).toLocaleDateString('en-PK', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${review.isApproved ? 'text-green-500' : 'text-yellow-500'}`}>
                    {review.isApproved ? '✅ Approved' : '⚠️ Pending'}
                  </span>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}