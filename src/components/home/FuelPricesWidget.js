'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fuel, RefreshCw, Zap, Droplet, Flame, Clock, TrendingUp, 
  TrendingDown, Info, ChevronRight, Activity, CheckCircle, AlertCircle 
} from 'lucide-react';

export default function FuelPricesWidget() {
  const [prices, setPrices] = useState(null);
  const [previousPrices, setPreviousPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timeAgo, setTimeAgo] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('petrol');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Load previous prices from localStorage
    const cached = localStorage.getItem('fuel_prices_cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setPreviousPrices(parsed);
      } catch (e) {}
    }
    
    fetchPrices();
  }, []);

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
    const interval = setInterval(updateTimeAgo, 60000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const fetchPrices = async (manual = false) => {
    try {
      if (manual) setRefreshing(true);
      else setLoading(true);

      const response = await fetch('/api/fuel-prices', {
        cache: manual ? 'no-store' : 'default',
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      
      // Save previous prices before updating
      if (prices) {
        setPreviousPrices(prices);
        localStorage.setItem('fuel_prices_cache', JSON.stringify(prices));
      }
      
      setPrices(data);
      setLastUpdated(data.cached_at || new Date().toISOString());
      setError(null);
    } catch (err) {
      setError('Prices temporarily unavailable');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Calculate price change
  const getPriceChange = (current, previous) => {
    if (!current || !previous) return null;
    const diff = current - previous;
    const percent = (diff / previous) * 100;
    return { diff, percent, direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same' };
  };

  // ===== LOADING STATE =====
  if (loading) {
    return (
      <div className="card-dark p-6 border border-chacha-yellow/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-chacha-yellow/5 to-transparent animate-pulse" />
        <div className="relative flex items-center justify-center gap-3 py-8">
          <div className="relative">
            <div className="w-10 h-10 border-2 border-chacha-yellow/20 border-t-chacha-yellow rounded-full animate-spin" />
          </div>
          <span className="text-chacha-muted text-sm">Loading live fuel prices...</span>
        </div>
      </div>
    );
  }

  // ===== ERROR STATE =====
  if (error || !prices) {
    return (
      <div className="card-dark p-6 border border-red-500/20">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <div>
            <div className="font-semibold text-sm">Prices Temporarily Unavailable</div>
            <div className="text-xs text-chacha-muted mt-1">Please try again later</div>
          </div>
          <button
            onClick={() => fetchPrices(true)}
            className="ml-auto p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    );
  }

  const fuelTypes = [
    {
      id: 'petrol',
      label: 'Petrol',
      sublabel: 'MS',
      description: 'Motor Spirit',
      icon: Fuel,
      price: prices.petrol?.price,
      previousPrice: previousPrices?.petrol?.price,
      color: 'green',
      gradient: 'from-green-500 to-green-400',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-500',
      borderColor: 'border-green-500/30',
    },
    {
      id: 'diesel',
      label: 'Diesel',
      sublabel: 'HSD',
      description: 'High Speed Diesel',
      icon: Droplet,
      price: prices.diesel?.price,
      previousPrice: previousPrices?.diesel?.price,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-400',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-500',
      borderColor: 'border-orange-500/30',
    },
    {
      id: 'octane',
      label: 'High Octane',
      sublabel: 'HOBC',
      description: 'Premium Petrol',
      icon: Zap,
      price: prices.octane?.price,
      previousPrice: previousPrices?.octane?.price,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-400',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-500',
      borderColor: 'border-purple-500/30',
    },
    {
      id: 'kerosene',
      label: 'Kerosene',
      sublabel: 'SKO',
      description: 'Kerosene Oil',
      icon: Flame,
      price: prices.kerosene?.price,
      previousPrice: previousPrices?.kerosene?.price,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-400',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500/30',
    },
  ].filter(fuel => fuel.price);

  const selectedFuelData = fuelTypes.find(f => f.id === selectedFuel) || fuelTypes[0];
  const selectedChange = getPriceChange(selectedFuelData?.price, selectedFuelData?.previousPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-dark border border-chacha-yellow/20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-50">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-chacha-yellow/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 p-5">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-11 h-11 bg-gradient-to-br from-chacha-yellow to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-chacha-yellow/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Fuel className="text-chacha-black" size={22} />
            </motion.div>
            <div>
              <div className="text-white font-bold text-base flex items-center gap-2">
                Pakistan Fuel Prices
                <span className="flex items-center gap-1 bg-green-500/10 text-green-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="text-chacha-muted text-xs flex items-center gap-1 mt-0.5">
                <Clock size={10} />
                Updated {timeAgo}
              </div>
            </div>
          </div>

          <motion.button
            onClick={() => fetchPrices(true)}
            disabled={refreshing}
            className="p-2.5 text-chacha-muted hover:text-chacha-yellow hover:bg-chacha-yellow/10 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Refresh prices"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          </motion.button>
        </div>

        {/* ===== MAIN PRICE CARDS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {fuelTypes.map((fuel, index) => {
            const change = getPriceChange(fuel.price, fuel.previousPrice);
            const isSelected = selectedFuel === fuel.id;

            return (
              <motion.button
                key={fuel.id}
                onClick={() => setSelectedFuel(fuel.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `${fuel.borderColor} ${fuel.bgColor} shadow-lg`
                    : 'border-chacha-border/50 bg-chacha-black hover:border-chacha-yellow/30'
                }`}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="selectedFuel"
                    className={`absolute inset-0 rounded-xl border-2 ${fuel.borderColor.replace('/30', '')}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative">
                  {/* Icon & Sublabel */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${fuel.bgColor}`}>
                      <fuel.icon className={fuel.textColor} size={14} />
                    </div>
                    <span className="text-chacha-muted text-[9px] font-semibold uppercase">
                      {fuel.sublabel}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="text-white text-xs font-semibold mb-1">
                    {fuel.label}
                  </div>

                  {/* Price */}
                  <div className={`font-bold text-lg ${isSelected ? fuel.textColor : 'text-chacha-yellow'}`}>
                    Rs. {fuel.price?.toFixed(2)}
                  </div>

                  {/* Price Change */}
                  {change && change.direction !== 'same' && (
                    <div className={`flex items-center gap-0.5 text-[10px] mt-1 ${
                      change.direction === 'up' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {change.direction === 'up' ? (
                        <TrendingUp size={10} />
                      ) : (
                        <TrendingDown size={10} />
                      )}
                      <span>{Math.abs(change.diff).toFixed(2)}</span>
                      <span>({Math.abs(change.percent).toFixed(1)}%)</span>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ===== SELECTED FUEL DETAILS ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFuel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`relative p-4 rounded-xl border ${selectedFuelData?.borderColor} bg-gradient-to-br ${selectedFuelData?.bgColor} to-transparent`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-chacha-black/50`}>
                  <selectedFuelData.icon className={selectedFuelData.textColor} size={20} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">
                    {selectedFuelData.label} ({selectedFuelData.sublabel})
                  </div>
                  <div className="text-chacha-muted text-xs">
                    {selectedFuelData.description}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-chacha-muted hover:text-white text-xs transition-colors"
              >
                {showDetails ? 'Less' : 'More'}
                <ChevronRight 
                  size={14} 
                  className={`transition-transform ${showDetails ? 'rotate-90' : ''}`} 
                />
              </button>
            </div>

            {/* Expandable Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-chacha-border/30">
                    <div className="text-center">
                      <div className="text-chacha-muted text-[10px] mb-1">Effective From</div>
                      <div className="text-white text-xs font-semibold">
                        {prices.petrol?.effective_date || 'N/A'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-chacha-muted text-[10px] mb-1">Unit</div>
                      <div className="text-white text-xs font-semibold">Per {selectedFuelData.unit || 'Litre'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-chacha-muted text-[10px] mb-1">Source</div>
                      <div className="text-white text-xs font-semibold">PSO / Shell</div>
                    </div>
                    <div className="text-center">
                      <div className="text-chacha-muted text-[10px] mb-1">Updated</div>
                      <div className="text-white text-xs font-semibold">{timeAgo}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* ===== FOOTER ===== */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-chacha-border/30">
          <div className="flex items-center gap-2 text-chacha-muted text-[10px]">
            <Activity size={12} className="text-chacha-yellow" />
            <span>Auto-updates hourly</span>
          </div>

          <div className="flex items-center gap-2 text-chacha-muted text-[10px]">
            <CheckCircle size={12} className="text-green-500" />
            <span>Verified Source</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}