'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Car } from 'lucide-react';

export default function AdminBrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/admin/brands');
      const data = await response.json();
      if (response.ok) {
        setBrands(data.brands || []);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-chacha-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-chacha-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chacha-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Brands</h1>
            <p className="text-chacha-muted mt-1">{brands.length} brands in database</p>
          </div>
          <Link href="/admin/dashboard/vehicles/new" className="btn-primary inline-flex items-center gap-2">
            <Plus size={20} />
            Add Vehicle
          </Link>
        </div>

        <div className="card-dark overflow-hidden">
          {brands.length === 0 ? (
            <div className="p-12 text-center">
              <Car className="mx-auto text-chacha-muted mb-4" size={48} />
              <h3 className="text-white font-semibold text-lg">No Brands Yet</h3>
              <p className="text-chacha-muted text-sm">Brands are created automatically when you add vehicles</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-chacha-border">
                  <th className="text-left p-4 text-chacha-muted font-medium">Brand</th>
                  <th className="text-left p-4 text-chacha-muted font-medium">Slug</th>
                  <th className="text-left p-4 text-chacha-muted font-medium">Country</th>
                  <th className="text-left p-4 text-chacha-muted font-medium">Vehicles</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand.id} className="border-b border-chacha-border last:border-0">
                    <td className="p-4 text-white font-medium">{brand.name}</td>
                    <td className="p-4 text-chacha-muted">{brand.slug}</td>
                    <td className="p-4 text-chacha-muted">{brand.country || '-'}</td>
                    <td className="p-4 text-chacha-yellow">{brand.vehicles?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}