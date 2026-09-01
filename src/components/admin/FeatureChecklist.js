'use client';

import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { carFeatureCategories } from '@/lib/carFeatures';

export default function FeatureChecklist({ selectedFeatures = [], onChange }) {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFeature = (feature) => {
    const current = [...selectedFeatures];
    if (current.includes(feature)) {
      onChange(current.filter(f => f !== feature));
    } else {
      onChange([...current, feature]);
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  const filterFeatures = (features) => {
    if (!searchTerm) return features;
    return features.filter(f => 
      f.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chacha-muted" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-chacha-black border border-chacha-border rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-chacha-yellow focus:outline-none"
          placeholder="Search features..."
        />
      </div>

      {/* Selected Count */}
      <div className="text-chacha-muted text-sm">
        {selectedFeatures.length} features selected
      </div>

      {/* Categories */}
      {carFeatureCategories.map((cat) => {
        const filteredFeatures = filterFeatures(cat.features);
        const isExpanded = expandedCategories[cat.category] || searchTerm;
        
        return (
          <div key={cat.category} className="border border-chacha-border rounded-lg overflow-hidden">
            {/* Category Header */}
            <button
              type="button"
              onClick={() => toggleCategory(cat.category)}
              className="w-full flex items-center justify-between px-4 py-3 bg-chacha-card hover:bg-chacha-border/50 transition-colors"
            >
              <span className="text-white font-semibold text-sm">
                {cat.category}
                <span className="text-chacha-muted text-xs ml-2">
                  ({cat.features.filter(f => selectedFeatures.includes(f)).length}/{cat.features.length})
                </span>
              </span>
              {isExpanded ? <ChevronUp size={16} className="text-chacha-muted" /> : <ChevronDown size={16} className="text-chacha-muted" />}
            </button>

            {/* Features Grid */}
            {isExpanded && (
              <div className="p-3 bg-chacha-black">
                {filteredFeatures.length === 0 ? (
                  <p className="text-chacha-muted text-sm text-center py-4">No features found</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {filteredFeatures.map((feature) => {
                      const isSelected = selectedFeatures.includes(feature);
                      return (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleFeature(feature)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                            isSelected
                              ? 'bg-chacha-yellow/10 border border-chacha-yellow text-chacha-yellow'
                              : 'bg-chacha-card border border-chacha-border text-chacha-muted hover:border-chacha-yellow/50'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-chacha-yellow text-chacha-black' : 'bg-chacha-black text-chacha-muted border border-chacha-border'
                          }`}>
                            {isSelected ? <Check size={10} strokeWidth={3} /> : <X size={10} />}
                          </span>
                          <span className="flex-1 text-left">{feature}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}