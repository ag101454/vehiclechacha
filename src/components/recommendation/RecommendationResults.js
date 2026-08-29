'use client';

import { useState, useEffect, createElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight,
  Trophy,
  Car as CarIcon,
  Star,
  Fuel,
  Users,
  Settings,
  Award,
  ThumbsUp,
  Crown,
  Zap
} from 'lucide-react';

function formatPrice(price) {
  if (!price) return 'N/A';
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  }
  return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
}

export default function RecommendationResults() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = sessionStorage.getItem('recommendations');
    if (data) {
      setRecommendations(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-chacha-yellow border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!recommendations || !recommendations.bestOverall) {
    return (
      <div className="text-center py-12">
        <CarIcon className="mx-auto text-chacha-muted mb-4" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Oho! Koi Gaari Nahi Mili</h2>
        <p className="text-chacha-muted mb-6">Chacha ko aapke requirements ke mutabiq koi gaari nahi mili.</p>
        <Link href="/find-my-car" className="btn-primary inline-flex items-center gap-2">
          Try Again <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  const { bestOverall, bestAlternative, bestValue, allRecommendations, categoryWinners } = recommendations;

  const getMainImage = (car) => {
    if (!car) return null;
    if (car.images && Array.isArray(car.images) && car.images.length > 0) return car.images[0];
    if (car.images && typeof car.images === 'string') {
      try {
        const parsed = JSON.parse(car.images);
        return parsed[0] || car.image || null;
      } catch {
        return car.image || null;
      }
    }
    return car.image || null;
  };

  const getMatchColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-chacha-yellow';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const renderTopCard = (car, rank) => {
    if (!car) return null;
    const image = getMainImage(car);
    const isBest = rank === 0;
    const labels = ['BEST MATCH', 'GOOD ALTERNATIVE', 'BEST VALUE'];
    const RankIcon = isBest ? Crown : rank === 1 ? ThumbsUp : Star;

    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: rank * 0.1, duration: 0.4 }}
        className="h-full"
      >
        <Link
          href={`/new-cars/${car.brand?.slug || ''}/${car.slug}`}
          className={`block h-full rounded-2xl overflow-hidden group transition-all duration-300 ${
            isBest 
              ? 'bg-chacha-card border-2 border-chacha-yellow hover:shadow-2xl hover:shadow-chacha-yellow/20' 
              : 'bg-chacha-card border border-chacha-border hover:border-chacha-yellow/60 hover:shadow-xl'
          }`}
        >
          {/* Image Section */}
          <div className="relative aspect-[4/3] bg-chacha-black overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={`${car.brand?.name} ${car.name}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={rank === 0}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <CarIcon size={56} className="text-chacha-muted" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-chacha-black/95 via-chacha-black/20 to-transparent" />

            {/* Match % Badge */}
            <div className="absolute top-3 left-3 bg-chacha-black/80 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Zap size={14} className="text-chacha-yellow" />
              <span className="text-chacha-yellow font-bold text-sm">{car.chachaMatch}%</span>
              <span className="text-chacha-muted text-xs">Match</span>
            </div>

            {/* Rank Badge */}
            <div className={`absolute top-3 right-3 rounded-full px-3 py-1.5 flex items-center gap-1.5 ${
              isBest ? 'bg-chacha-yellow' : 'bg-chacha-black/80 backdrop-blur'
            }`}>
              <RankIcon size={14} className={isBest ? 'text-chacha-black' : 'text-chacha-yellow'} />
              <span className={`text-xs font-bold ${isBest ? 'text-chacha-black' : 'text-white'}`}>
                {labels[rank]}
              </span>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white mb-0.5">
                {car.brand?.name} {car.name}
              </h3>
              <div className="text-chacha-yellow font-bold text-lg">
                {formatPrice(car.price)}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4">
            {/* Quick Specs */}
            <div className="flex items-center justify-between mb-3 text-xs text-chacha-muted">
              {car.fuelType && (
                <span className="flex items-center gap-1">
                  <Fuel size={13} className="text-chacha-yellow" /> {car.fuelType}
                </span>
              )}
              {car.transmission && (
                <span className="flex items-center gap-1">
                  <Settings size={13} className="text-chacha-yellow" /> {car.transmission}
                </span>
              )}
              {car.seats && (
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-chacha-yellow" /> {car.seats}
                </span>
              )}
            </div>

            {/* Top Strength */}
            {car.strengths?.[0] && (
              <div className="flex items-center gap-1.5 text-xs text-green-400 mb-3">
                <CheckCircle size={13} className="shrink-0" />
                <span>{car.strengths[0]}</span>
              </div>
            )}

            {/* View Button */}
            <div className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isBest 
                ? 'bg-chacha-yellow text-chacha-black group-hover:bg-yellow-400' 
                : 'bg-chacha-black text-white group-hover:bg-chacha-border border border-chacha-border'
            }`}>
              View Details
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-5 py-2 mb-3"
        >
          <Trophy size={16} className="text-chacha-yellow" />
          <span className="text-chacha-yellow font-bold text-sm">CHACHA KI PASAND</span>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Aapki <span className="text-chacha-yellow">Perfect Gaariyan</span>
        </h1>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {renderTopCard(bestOverall, 0)}
        {renderTopCard(bestAlternative, 1)}
        {renderTopCard(bestValue, 2)}
      </div>

      {/* Category Winners */}
      {categoryWinners && Object.keys(categoryWinners).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Award className="text-chacha-yellow" size={20} />
            Category Winners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(categoryWinners).map(([category, car]) => (
              car && (
                <Link
                  key={category}
                  href={`/new-cars/${car.brand?.slug || ''}/${car.slug}`}
                  className="bg-chacha-card border border-chacha-border rounded-xl p-3 text-center hover:border-chacha-yellow transition-all group"
                >
                  <div className="relative w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden">
                    {getMainImage(car) ? (
                      <Image src={getMainImage(car)} alt={car.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-chacha-black flex items-center justify-center">
                        <CarIcon size={24} className="text-chacha-muted" />
                      </div>
                    )}
                  </div>
                  <div className="text-chacha-muted text-[10px] uppercase tracking-wide mb-0.5">
                    {category.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="text-white text-sm font-semibold group-hover:text-chacha-yellow transition-colors">
                    {car.name}
                  </div>
                  <div className="text-chacha-yellow text-xs mt-0.5">{car.chachaMatch}%</div>
                </Link>
              )
            ))}
          </div>
        </motion.div>
      )}

      {/* Other Matches */}
      {allRecommendations && allRecommendations.length > 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white font-bold text-lg mb-4">
            Other Matches
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {allRecommendations.slice(3, 10).map((car) => {
              const matchColor = getMatchColor(car.chachaMatch);
              return (
                <Link
                  key={car.id}
                  href={`/new-cars/${car.brand?.slug || ''}/${car.slug}`}
                  className="flex-shrink-0 w-40 bg-chacha-card border border-chacha-border rounded-xl overflow-hidden hover:border-chacha-yellow transition-all group"
                >
                  <div className="relative aspect-[4/3] bg-chacha-black">
                    {getMainImage(car) ? (
                      <Image src={getMainImage(car)} alt={car.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CarIcon size={28} className="text-chacha-muted" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-chacha-black/80 rounded-full px-2 py-0.5">
                      <span className={`text-xs font-bold ${matchColor}`}>{car.chachaMatch}%</span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <div className="text-white text-sm font-medium truncate group-hover:text-chacha-yellow transition-colors">
                      {car.name}
                    </div>
                    <div className="text-chacha-muted text-xs">{formatPrice(car.price)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}