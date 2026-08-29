'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Filter, X } from 'lucide-react';

export default function NewCarsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const filters = {
    bodyType: searchParams.get('bodyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    fuelType: searchParams.get('fuelType') || '',
    transmission: searchParams.get('transmission') || '',
  };

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/new-cars?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/new-cars');
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
        >
          <Filter size={16} />
          Filters
          {hasActiveFilters && (
            <span className="bg-chacha-yellow text-chacha-black rounded-full px-2 py-0.5 text-xs">
              {Object.values(filters).filter(v => v !== '').length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-chacha-muted hover:text-chacha-yellow transition-colors text-sm inline-flex items-center gap-1"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      {isOpen && (
        <div className="card-dark p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Body Type */}
          <div>
            <label className="text-chacha-muted text-xs mb-1 block">Body Type</label>
            <select
              value={filters.bodyType}
              onChange={(e) => handleFilterChange('bodyType', e.target.value)}
              className="w-full bg-chacha-black border border-chacha-border rounded-lg px-3 py-2 text-white text-sm focus:border-chacha-yellow focus:outline-none"
            >
              <option value="">All</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Crossover">Crossover</option>
              <option value="MPV">MPV</option>
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="text-chacha-muted text-xs mb-1 block">Min Price (Lakh)</label>
            <input
              type="number"
              value={filters.minPrice ? parseInt(filters.minPrice) / 100000 : ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? e.target.value * 100000 : '')}
              className="w-full bg-chacha-black border border-chacha-border rounded-lg px-3 py-2 text-white text-sm focus:border-chacha-yellow focus:outline-none"
              placeholder="Min"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="text-chacha-muted text-xs mb-1 block">Max Price (Lakh)</label>
            <input
              type="number"
              value={filters.maxPrice ? parseInt(filters.maxPrice) / 100000 : ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? e.target.value * 100000 : '')}
              className="w-full bg-chacha-black border border-chacha-border rounded-lg px-3 py-2 text-white text-sm focus:border-chacha-yellow focus:outline-none"
              placeholder="Max"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label className="text-chacha-muted text-xs mb-1 block">Fuel Type</label>
            <select
              value={filters.fuelType}
              onChange={(e) => handleFilterChange('fuelType', e.target.value)}
              className="w-full bg-chacha-black border border-chacha-border rounded-lg px-3 py-2 text-white text-sm focus:border-chacha-yellow focus:outline-none"
            >
              <option value="">All</option>
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="text-chacha-muted text-xs mb-1 block">Transmission</label>
            <select
              value={filters.transmission}
              onChange={(e) => handleFilterChange('transmission', e.target.value)}
              className="w-full bg-chacha-black border border-chacha-border rounded-lg px-3 py-2 text-white text-sm focus:border-chacha-yellow focus:outline-none"
            >
              <option value="">All</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}