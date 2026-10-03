'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fuel, RefreshCw, Zap, Droplet, Flame, Clock } from 'lucide-react';

export default function FuelPricesWidget() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    fetchPrices();
  }, []);

  // Update "time ago" every minute
  useEffect(() => {
    if (!lastUpdated) return;

    const updateTimeAgo = () => {
      const diffMs = Date.now() - new Date(lastUpdated).getTime();
      const mins = Math.floor(diffMs / 60000);

      if (mins < 1) setTimeAgo('just now');
      else if (mins < 60) setTimeAgo(`${mins}m ago`);
      else {
        const hours = Math.floor(mins / 60);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lastUpdated]);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      // Add cache: 'no-store' to force fresh fetch on manual refresh
      const response = await fetch('/api/fuel-prices');

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setPrices(data);
      setLastUpdated(data.cached_at || new Date().toISOString());
      setError(null);
    } catch (err) {
      setError('Prices temporarily unavailable');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card-dark p-5 flex items-center justify-center gap-3">
        <RefreshCw className="animate-spin text-chacha-yellow" size={20} />
        <span className="text-chacha-muted text-sm">Loading fuel prices...</span>
      </div>
    );
  }

  if (error || !prices) {
    return (
      <div className="card-dark p-5 text-center">
        <Fuel className="mx-auto text-chacha-muted mb-2" size={24} />
        <span className="text-chacha-muted text-sm">{error || 'Prices unavailable'}</span>
      </div>
    );
  }

  const fuelItems = [
    {
      label: 'Petrol',
      sublabel: 'MS',
      icon: Fuel,
      price: prices.petrol?.price,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Diesel',
      sublabel: 'HSD',
      icon: Droplet,
      price: prices.diesel?.price,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'High Octane',
      sublabel: 'HOBC',
      icon: Zap,
      price: prices.octane?.price,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Kerosene',
      sublabel: 'SKO',
      icon: Flame,
      price: prices.kerosene?.price,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ].filter(item => item.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-dark p-5 border border-chacha-yellow/20 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-chacha-yellow/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-chacha-yellow/10 rounded-lg flex items-center justify-center">
              <Fuel className="text-chacha-yellow" size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Pakistan Fuel Prices</div>
              <div className="text-chacha-muted text-xs flex items-center gap-1">
                <Clock size={10} />
                Updated {timeAgo}
              </div>
            </div>
          </div>
          <button
            onClick={fetchPrices}
            className="p-2 text-chacha-muted hover:text-chacha-yellow hover:bg-chacha-yellow/10 rounded-lg transition-colors"
            title="Refresh prices"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Prices Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fuelItems.map((item) => (
            <div
              key={item.label}
              className="bg-chacha-black rounded-xl p-3 border border-chacha-border/50 hover:border-chacha-yellow/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${item.bgColor}`}>
                  <item.icon className={item.color} size={12} />
                </div>
                <div className="text-chacha-muted text-[10px] font-medium">
                  {item.sublabel}
                </div>
              </div>
              <div className="text-white font-bold text-sm mb-0.5">
                {item.label}
              </div>
              <div className="text-chacha-yellow font-bold text-lg">
                Rs. {item.price?.toFixed(2)}
              </div>
              <div className="text-chacha-muted text-[10px] mt-0.5">
                per {prices.petrol?.unit || 'litre'}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-chacha-border/50">
          <div className="text-chacha-muted text-[10px]">
            {prices.petrol?.effective_date && (
              <>Effective: {prices.petrol.effective_date}</>
            )}
          </div>
          <div className="flex items-center gap-1 text-chacha-muted text-[10px]">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Source: PSO &amp; Shell
          </div>
        </div>

        {/* Cache Info */}
        <div className="text-center text-chacha-muted text-[10px] mt-2">
          Auto-refreshes every hour • {prices.cache_duration || '1 hour'} cache
        </div>
      </div>
    </motion.div>
  );
}