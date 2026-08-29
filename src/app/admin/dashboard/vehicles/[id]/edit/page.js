'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Upload } from 'lucide-react';

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    bodyType: '',
    price: '',
    oldPrice: '',
    engine: '',
    transmission: '',
    fuelType: '',
    fuelEconomy: '',
    seats: '',
    description: '',
    image: '',
    isPopular: false,
    isAvailable: true,
    features: [],
    pros: [],
    cons: [],
  });

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const response = await fetch(`/api/admin/vehicles/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        const vehicle = data.vehicle;
        setFormData({
          brand: vehicle.brand?.name || '',
          name: vehicle.name || '',
          bodyType: vehicle.bodyType || '',
          price: vehicle.price?.toString() || '',
          oldPrice: vehicle.oldPrice?.toString() || '',
          engine: vehicle.engine || '',
          transmission: vehicle.transmission || '',
          fuelType: vehicle.fuelType || '',
          fuelEconomy: vehicle.fuelEconomy || '',
          seats: vehicle.seats?.toString() || '',
          description: vehicle.description || '',
          image: vehicle.image || '',
          isPopular: vehicle.isPopular || false,
          isAvailable: vehicle.isAvailable || true,
          features: JSON.parse(vehicle.features || '[]'),
          pros: JSON.parse(vehicle.pros || '[]'),
          cons: JSON.parse(vehicle.cons || '[]'),
        });
      } else {
        setError(data.message || 'Failed to fetch vehicle');
      }
    } catch (error) {
      setError('Failed to fetch vehicle');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/vehicles/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/dashboard/vehicles');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update vehicle');
      }
    } catch (error) {
      setError('Failed to update vehicle');
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-chacha-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-chacha-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass = "w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none transition-colors";
  const labelClass = "block text-sm font-medium text-white mb-2";

  return (
    <div className="min-h-screen bg-chacha-black p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-chacha-muted hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Vehicles
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Edit Vehicle</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Model Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Body Type</label>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select Body Type</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Crossover">Crossover</option>
                  <option value="MPV">MPV</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Price (PKR)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Old Price (Optional)</label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Engine</label>
                <input
                  type="text"
                  name="engine"
                  value={formData.engine}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., 1.8L"
                />
              </div>

              <div>
                <label className={labelClass}>Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Fuel Economy (km/l)</label>
                <input
                  type="text"
                  name="fuelEconomy"
                  value={formData.fuelEconomy}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Seats</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={handleChange}
                  className="w-4 h-4 accent-chacha-yellow"
                />
                <span className="text-white text-sm">Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-4 h-4 accent-chacha-yellow"
                />
                <span className="text-white text-sm">Available</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={inputClass}
              placeholder="Describe the vehicle..."
            />
          </div>

          {/* Save Buttons */}
          <div className="flex items-center gap-4">
            <motion.button
              type="submit"
              disabled={saving}
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-chacha-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  Update Vehicle
                </>
              )}
            </motion.button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary px-8 py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}