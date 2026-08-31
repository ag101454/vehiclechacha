'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, Tag, Plus, RefreshCw, Search } from 'lucide-react';

export default function AdminBrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/brands', { cache: 'no-store' });
      const data = await response.json();
      if (response.ok) {
        setBrands(data.brands || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 text-center text-white">
        <RefreshCw className="animate-spin mx-auto mb-2" size={32} />
        Loading brands...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Brands</h1>
          <p className="text-chacha-muted mt-1">
            {brands.length} brands - Auto-created when adding vehicles
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchBrands} className="btn-secondary flex items-center gap-1 px-4 py-2 text-sm">
            <RefreshCw size={14} /> Refresh
          </button>
          <Link href="/admin/dashboard/vehicles/new" className="btn-primary flex items-center gap-1 px-4 py-2 text-sm">
            <Plus size={14} /> Add Vehicle
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chacha-muted" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-chacha-card border border-chacha-border rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-chacha-yellow focus:outline-none"
          placeholder="Search brands..."
        />
      </div>

      {/* Brands Grid */}
      {filteredBrands.length === 0 ? (
        <div className="card-dark p-12 text-center">
          <Tag className="mx-auto text-chacha-muted mb-3" size={48} />
          <h3 className="text-white font-semibold text-lg mb-1">No Brands Yet</h3>
          <p className="text-chacha-muted text-sm">
            Brands are created automatically when you add a vehicle
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBrands.map((brand) => (
            <div key={brand.id} className="card-dark p-5 hover:border-chacha-yellow transition-all">
              {/* Brand Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-chacha-yellow/10 rounded-xl flex items-center justify-center">
                  <span className="text-chacha-yellow font-bold text-xl">
                    {brand.name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{brand.name}</div>
                  <div className="text-chacha-muted text-xs">/{brand.slug}</div>
                </div>
              </div>

              {/* Country */}
              {brand.country && (
                <div className="text-chacha-muted text-xs mb-2">
                  Country: {brand.country}
                </div>
              )}

              {/* Description */}
              {brand.description && (
                <p className="text-chacha-muted text-sm mb-3">{brand.description}</p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 border-t border-chacha-border pt-3">
                <div className="text-center">
                  <div className="text-chacha-yellow font-bold text-lg">
                    {brand._count?.vehicles || brand.vehicles?.length || 0}
                  </div>
                  <div className="text-chacha-muted text-[10px]">Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-green-500 font-bold text-lg">
                    {brand.vehicles?.filter(v => v.isAvailable).length || 0}
                  </div>
                  <div className="text-chacha-muted text-[10px]">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-orange-500 font-bold text-lg">
                    {brand.vehicles?.filter(v => v.isPopular).length || 0}
                  </div>
                  <div className="text-chacha-muted text-[10px]">Popular</div>
                </div>
              </div>

              {/* Vehicle List */}
              {brand.vehicles?.length > 0 && (
                <div className="mt-3 space-y-1">
                  {brand.vehicles.slice(0, 3).map((vehicle) => (
                    <Link
                      key={vehicle.id}
                      href={`/admin/dashboard/vehicles/${vehicle.id}/edit`}
                      className="flex items-center gap-2 text-chacha-muted text-xs hover:text-chacha-yellow transition-colors"
                    >
                      <Car size={12} />
                      {vehicle.name} - Rs. {(vehicle.price / 100000).toFixed(1)} Lakh
                    </Link>
                  ))}
                  {brand.vehicles.length > 3 && (
                    <div className="text-chacha-muted text-xs">
                      +{brand.vehicles.length - 3} more vehicles
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}