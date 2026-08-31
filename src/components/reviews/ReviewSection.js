'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, User, Mail, Send, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function ReviewSection({ vehicleId, vehicleName }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [breakdown, setBreakdown] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    rating: 5,
    title: '',
    review: '',
    pros: '',
    cons: '',
  });

  useEffect(() => {
    fetchReviews();
  }, [vehicleId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?vehicleId=${vehicleId}`);
      const data = await response.json();
      if (response.ok) {
        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
        setBreakdown(data.breakdown || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId,
          ...formData,
          rating: parseInt(formData.rating),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Review submitted successfully!');
        setShowForm(false);
        setFormData({ userName: '', email: '', rating: 5, title: '', review: '', pros: '', cons: '' });
        fetchReviews();
      } else {
        setError(data.message || 'Failed to submit review');
      }
    } catch (error) {
      setError('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, size = 20) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < rating ? 'fill-chacha-yellow text-chacha-yellow' : 'text-chacha-border'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="card-dark p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-chacha-yellow">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-chacha-muted text-sm mt-1">{totalReviews} Reviews</div>
          </div>

          {/* Rating Breakdown */}
          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-chacha-muted text-xs w-8">{star} Star</span>
                <div className="flex-1 h-2 bg-chacha-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-chacha-yellow rounded-full"
                    style={{ width: totalReviews > 0 ? `${(breakdown[star] / totalReviews) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-chacha-muted text-xs w-8">{breakdown[star]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary inline-flex items-center gap-2 px-8 py-3"
        >
          <Star size={20} />
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="card-dark p-6">
              {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <CheckCircle size={16} />
                  {success}
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Rating *</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1"
                      >
                        <Star
                          size={32}
                          className={star <= formData.rating ? 'fill-chacha-yellow text-chacha-yellow' : 'text-chacha-border'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Review Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                    placeholder="e.g., Best car in this range!"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Your Review *</label>
                  <textarea
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    rows={4}
                    className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                    placeholder="Share your experience with this car..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Pros</label>
                    <input
                      type="text"
                      value={formData.pros}
                      onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                      className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                      placeholder="What do you like?"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Cons</label>
                    <input
                      type="text"
                      value={formData.cons}
                      onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
                      className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                      placeholder="What could be better?"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary inline-flex items-center gap-2 px-8 py-3 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : (
                    <>
                      <Send size={18} />
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="card-dark p-8 text-center">
            <Star className="mx-auto text-chacha-muted mb-2" size={32} />
            <p className="text-chacha-muted">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-dark p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-chacha-yellow/10 rounded-full flex items-center justify-center">
                    <User size={20} className="text-chacha-yellow" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{review.userName}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {renderStars(review.rating, 14)}
                    </div>
                  </div>
                </div>
                <div className="text-chacha-muted text-xs">
                  {new Date(review.createdAt).toLocaleDateString('en-PK')}
                </div>
              </div>

              {review.title && (
                <div className="text-white font-bold mb-2">{review.title}</div>
              )}

              <p className="text-chacha-muted text-sm leading-relaxed mb-3">{review.review}</p>

              {review.pros && (
                <div className="flex items-start gap-2 mb-1">
                  <ThumbsUp size={14} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-green-500 text-xs">{review.pros}</span>
                </div>
              )}
              {review.cons && (
                <div className="flex items-start gap-2">
                  <ThumbsDown size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <span className="text-red-500 text-xs">{review.cons}</span>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}