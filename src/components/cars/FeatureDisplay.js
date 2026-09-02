'use client';

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function FeatureDisplay({ features }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Ensure features is an array
  const featuresArray = Array.isArray(features) ? features : [];

  // Filter features
  const filteredFeatures = searchTerm
    ? featuresArray.filter(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
    : featuresArray;

  // Show first 12 features by default, or all if showAll is true
  const displayedFeatures = showAll ? filteredFeatures : filteredFeatures.slice(0, 12);

  if (featuresArray.length === 0) {
    return (
      <div className="text-chacha-muted text-sm">
        No features listed for this vehicle.
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      {featuresArray.length > 12 && (
        <div className="relative mb-4 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chacha-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-chacha-black border border-chacha-border rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:border-chacha-yellow focus:outline-none"
            placeholder="Search features..."
          />
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {displayedFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-chacha-muted text-sm bg-chacha-black rounded-lg px-3 py-2">
            <Check size={14} className="text-chacha-yellow shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {featuresArray.length > 12 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-chacha-yellow hover:text-yellow-400 text-sm font-medium flex items-center gap-1"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp size={14} />
            </>
          ) : (
            <>
              Show All ({featuresArray.length} features) <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
}