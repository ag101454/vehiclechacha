'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, Shield, Car, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('vehiclechacha2024');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Submitting login form...');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        // Store token in cookie
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400; samesite=strict`;
        console.log('Login successful, redirecting...');
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-chacha-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card-dark p-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-chacha-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Car size={32} className="text-chacha-black" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Vehicle<span className="text-chacha-yellow">Chacha</span>
            </h1>
            <p className="text-chacha-muted mt-2">Admin Panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-4 flex items-start gap-2"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Login failed</p>
                <p className="text-xs mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Info Box */}
          <div className="bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-lg p-3 mb-4">
            <p className="text-chacha-yellow text-xs">
              Default credentials: admin / vehiclechacha2024
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-chacha-muted" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-chacha-muted" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-chacha-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Shield size={18} />
                  Login to Admin Panel
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-chacha-muted text-xs text-center mt-6">
            Authorized personnel only
          </p>
        </motion.div>
      </div>
    </div>
  );
}