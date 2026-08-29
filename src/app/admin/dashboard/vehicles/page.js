'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Car } from 'lucide-react';

export default function AdminVehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/admin/vehicles');
      const data = await response.json();

      if (response.ok) {
        setVehicles(data.vehicles);
      } else {
        setError(data.message || 'Failed to fetch vehicles');
        if (response.status === 401) {
          router.push('/admin/login');
        }
      }
    } catch (error) {
      setError('Failed to fetch vehicles');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/vehicles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVehicles(vehicles.filter(v => v.id !== id));
        alert('Vehicle deleted successfully');
      } else {
        alert('Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete vehicle');
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
    }
    return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
  };

  const filteredVehicles = vehicles.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-white">Vehicles</h1>
            <p className="text-chacha-muted mt-1">
              {vehicles.length} vehicles in database
            </p>
          </div>
          <Link
            href="/admin/dashboard/vehicles/new"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Vehicle
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-chacha-muted" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-chacha-card border border-chacha-border rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
              placeholder="Search vehicles..."
            />
          </div>
        </div>

        {/* Vehicles Table */}
        {filteredVehicles.length === 0 ? (
          <div className="card-dark p-12 text-center">
            <Car className="mx-auto text-chacha-muted mb-4" size={48} />
            <h3 className="text-white font-semibold text-lg mb-2">No Vehicles Found</h3>
            <p className="text-chacha-muted mb-4">
              {searchTerm ? 'Try a different search term' : 'Add your first vehicle to get started'}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/dashboard/vehicles/new"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Add Vehicle
              </Link>
            )}
          </div>
        ) : (
          <div className="card-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-chacha-border">
                    <th className="text-left p-4 text-chacha-muted font-medium">Vehicle</th>
                    <th className="text-left p-4 text-chacha-muted font-medium">Brand</th>
                    <th className="text-left p-4 text-chacha-muted font-medium">Price</th>
                    <th className="text-left p-4 text-chacha-muted font-medium">Body Type</th>
                    <th className="text-left p-4 text-chacha-muted font-medium">Status</th>
                    <th className="text-right p-4 text-chacha-muted font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="border-b border-chacha-border last:border-0 hover:bg-chacha-black/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {vehicle.image ? (
                            <img
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-chacha-black rounded-lg flex items-center justify-center">
                              <Car size={20} className="text-chacha-muted" />
                            </div>
                          )}
                          <span className="text-white font-medium">{vehicle.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-chacha-muted">{vehicle.brand?.name || '-'}</td>
                      <td className="p-4 text-chacha-yellow font-semibold">
                        {formatPrice(vehicle.price)}
                      </td>
                      <td className="p-4 text-chacha-muted">{vehicle.bodyType}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                          vehicle.isAvailable
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {vehicle.isAvailable ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => router.push(`/admin/dashboard/vehicles/${vehicle.id}/edit`)}
                            className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}