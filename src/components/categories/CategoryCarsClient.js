'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Crown, Fuel, Users, Settings, Car as CarIcon, TrendingUp, ArrowUpDown } from 'lucide-react';

function formatPrice(price) {
  if (!price) return 'N/A';
  if (price >= 10000000) return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
}

function renderStars(rating, size = 16) {
  return [...Array(5)].map((_, i) => (
    <Star
      key={i}
      size={size}
      className={i < Math.round(rating) ? 'fill-chacha-yellow text-chacha-yellow' : 'text-chacha-border'}
    />
  ));
}

export default function CategoryCarsClient({ cars, bestCar, categoryName }) {
  const [sortBy, setSortBy] = useState('rating');
  const [sortedCars, setSortedCars] = useState(cars);

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...cars];
    if (value === 'rating') {
      sorted.sort((a, b) => b.averageRating - a.averageRating);
    } else if (value === 'price_low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === 'price_high') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedCars(sorted);
  };

  const remainingCars = sortedCars.filter(car => car.id !== bestCar?.id);

  return (
    <div>
      {/* Best Car of the Month - BIG */}
      {bestCar && bestCar.averageRating > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Crown size={24} className="text-chacha-yellow" />
            <h2 className="text-2xl font-bold text-white">Best Car of the Month</h2>
          </div>
          
          <Link
            href={`/new-cars/${bestCar.brand.slug}/${bestCar.slug}`}
            className="block card-dark border-2 border-chacha-yellow shadow-2xl shadow-chacha-yellow/20 overflow-hidden hover:-translate-y-1 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[16/10] bg-chacha-black">
                {bestCar.image ? (
                  <Image src={bestCar.image} alt={bestCar.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CarIcon size={64} className="text-chacha-muted" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-chacha-yellow text-chacha-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Crown size={14} /> BEST RATED
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {bestCar.brand.name} {bestCar.name}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">{renderStars(bestCar.averageRating, 20)}</div>
                  <span className="text-chacha-yellow font-bold text-xl">{bestCar.averageRating.toFixed(1)}</span>
                  <span className="text-chacha-muted">({bestCar.totalReviews} reviews)</span>
                </div>
                <div className="text-chacha-yellow font-bold text-2xl mb-4">{formatPrice(bestCar.price)}</div>
                <div className="flex items-center gap-4 text-chacha-muted text-sm">
                  {bestCar.fuelType && <span className="flex items-center gap-1"><Fuel size={14} /> {bestCar.fuelType}</span>}
                  {bestCar.transmission && <span className="flex items-center gap-1"><Settings size={14} /> {bestCar.transmission}</span>}
                  {bestCar.seats && <span className="flex items-center gap-1"><Users size={14} /> {bestCar.seats} Seats</span>}
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Sort Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">All Cars in {categoryName}</h3>
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-chacha-muted" />
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-chacha-card border border-chacha-border rounded-lg px-3 py-2 text-white text-sm focus:border-chacha-yellow focus:outline-none"
          >
            <option value="rating">Sort by Rating</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Cars Grid */}
      {remainingCars.length === 0 ? (
        <div className="card-dark p-12 text-center">
          <CarIcon size={48} className="text-chacha-muted mx-auto mb-3" />
          <p className="text-chacha-muted">No cars in this category yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {remainingCars.map((car) => (
            <Link
              key={car.id}
              href={`/new-cars/${car.brand.slug}/${car.slug}`}
              className="card-dark overflow-hidden hover:border-chacha-yellow transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] bg-chacha-black">
                {car.image ? (
                  <Image src={car.image} alt={car.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CarIcon size={40} className="text-chacha-muted" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-white font-semibold group-hover:text-chacha-yellow transition-colors">
                  {car.brand.name} {car.name}
                </h4>
                <div className="flex items-center gap-2 mt-1 mb-2">
                  <div className="flex gap-0.5">{renderStars(car.averageRating, 12)}</div>
                  <span className="text-chacha-yellow text-xs font-semibold">
                    {car.averageRating > 0 ? car.averageRating.toFixed(1) : '-'}
                  </span>
                  <span className="text-chacha-muted text-xs">({car.totalReviews})</span>
                </div>
                <div className="text-chacha-yellow font-bold">{formatPrice(car.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}