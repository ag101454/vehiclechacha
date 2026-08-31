'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Check, X, Trash2, User, Mail, Car, MessageSquare, AlertCircle } from 'lucide-react';

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, approved, pending

  useEffect(() => {
    checkAuth();
    fetchReviews();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      const data = await response.json();
      if (!data.authenticated) {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews');
      const data = await response.json();
      if (response.ok) {
        setReviews(data.reviews || []);
      } else {
        setError(data.message || 'Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (reviewId, isApproved) => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved }),
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'approved') return review.isApproved;
    if (filter === 'pending') return !review.isApproved;
    return true;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-chacha-yellow text-chacha-yellow' : 'text-chacha-border'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-chacha-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-chacha-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chacha-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">User Reviews</h1>
            <p className="text-chacha-muted mt-1">
              {reviews.length} total reviews
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="btn-secondary px-4 py-2 text-sm"
          >
            Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {[
            { value: 'all', label: `All (${reviews.length})` },
            { value: 'approved', label: `Approved (${reviews.filter(r => r.isApproved).length})` },
            { value: 'pending', label: `Pending (${reviews.filter(r => !r.isApproved).length})` },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.value
                  ? 'bg-chacha-yellow text-chacha-black'
                  : 'bg-chacha-card text-chacha-muted hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="card-dark p-12 text-center">
            <MessageSquare className="mx-auto text-chacha-muted mb-3" size={48} />
            <h3 className="text-white font-semibold text-lg mb-1">No Reviews Found</h3>
            <p className="text-chacha-muted text-sm">No reviews in this category yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="card-dark p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-chacha-yellow/10 rounded-full flex items-center justify-center">
                      <User size={20} className="text-chacha-yellow" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{review.userName}</div>
                      <div className="flex items-center gap-1 text-chacha-muted text-xs mt-0.5">
                        <Mail size={12} />
                        {review.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="flex items-center gap-2 bg-chacha-black rounded-lg p-2 mb-3">
                  <Car size={14} className="text-chacha-yellow" />
                  <span className="text-chacha-muted text-sm">
                    {review.vehicle?.brand?.name} {review.vehicle?.name}
                  </span>
                </div>

                {/* Review Title */}
                {review.title && (
                  <div className="text-white font-bold mb-1">{review.title}</div>
                )}

                {/* Review Content */}
                <p className="text-chacha-muted text-sm leading-relaxed mb-3">
                  {review.review}
                </p>

                {/* Pros & Cons */}
                {review.pros && (
                  <div className="text-green-500 text-xs mb-1">
                    👍 {review.pros}
                  </div>
                )}
                {review.cons && (
                  <div className="text-red-500 text-xs mb-2">
                    👎 {review.cons}
                  </div>
                )}

                {/* Date */}
                <div className="text-chacha-muted text-xs mb-3">
                  {new Date(review.createdAt).toLocaleDateString('en-PK', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-chacha-border pt-3">
                  <button
                    onClick={() => handleApproval(review.id, !review.isApproved)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      review.isApproved
                        ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                    }`}
                  >
                    {review.isApproved ? <Check size={12} /> : <AlertCircle size={12} />}
                    {review.isApproved ? 'Approved' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}