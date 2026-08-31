'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import { generateCarDescription, generatePros, generateCons } from '@/lib/descriptionGenerator';

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    bodyType: 'Sedan',
    price: '',
    oldPrice: '',
    engine: '',
    transmission: 'Manual',
    fuelType: 'Petrol',
    fuelEconomy: '',
    seats: '5',
    description: '',
    image: '',
    images: [],
    isPopular: false,
    isAvailable: true,
    launchYear: '',
    horsepower: '',
    torque: '',
    groundClearance: '',
    bootSpace: '',
    length: '',
    width: '',
    height: '',
    wheelbase: '',
    fuelTankCapacity: '',
    kerbWeight: '',
  });

  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [pros, setPros] = useState([]);
  const [newPro, setNewPro] = useState('');
  const [cons, setCons] = useState([]);
  const [newCon, setNewCon] = useState('');

  const handleGenerateDescription = () => {
    const car = {
      brand: { name: formData.brand },
      bodyType: formData.bodyType,
      price: parseFloat(formData.price),
      fuelEconomy: formData.fuelEconomy,
      engine: formData.engine,
      seats: parseInt(formData.seats),
      horsepower: parseInt(formData.horsepower),
    };
    
    const description = generateCarDescription(car);
    const generatedPros = generatePros(car);
    const generatedCons = generateCons(car);
    
    setFormData({ ...formData, description });
    setPros(generatedPros);
    setCons(generatedCons);
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const response = await fetch(`/api/admin/vehicles/${params.id}`);
      const data = await response.json();

      if (response.ok && data.vehicle) {
        const vehicle = data.vehicle;
        
        // Parse images
        let imagesArray = [];
        try {
          imagesArray = JSON.parse(vehicle.images || '[]');
        } catch {
          imagesArray = vehicle.image ? [vehicle.image] : [];
        }
        
        // Parse features, pros, cons
        let featuresArray = [];
        let prosArray = [];
        let consArray = [];
        try { featuresArray = JSON.parse(vehicle.features || '[]'); } catch { featuresArray = []; }
        try { prosArray = JSON.parse(vehicle.pros || '[]'); } catch { prosArray = []; }
        try { consArray = JSON.parse(vehicle.cons || '[]'); } catch { consArray = []; }

        setFormData({
          brand: vehicle.brand?.name || '',
          name: vehicle.name || '',
          bodyType: vehicle.bodyType || 'Sedan',
          price: vehicle.price?.toString() || '',
          oldPrice: vehicle.oldPrice?.toString() || '',
          engine: vehicle.engine || '',
          transmission: vehicle.transmission || 'Manual',
          fuelType: vehicle.fuelType || 'Petrol',
          fuelEconomy: vehicle.fuelEconomy || '',
          seats: vehicle.seats?.toString() || '5',
          description: vehicle.description || '',
          image: vehicle.image || '',
          images: imagesArray,
          isPopular: vehicle.isPopular || false,
          isAvailable: vehicle.isAvailable !== false,
          launchYear: vehicle.launchYear?.toString() || '',
          horsepower: vehicle.horsepower?.toString() || '',
          torque: vehicle.torque || '',
          groundClearance: vehicle.groundClearance || '',
          bootSpace: vehicle.bootSpace || '',
          length: vehicle.length || '',
          width: vehicle.width || '',
          height: vehicle.height || '',
          wheelbase: vehicle.wheelbase || '',
          fuelTankCapacity: vehicle.fuelTankCapacity || '',
          kerbWeight: vehicle.kerbWeight || '',
        });
        
        setFeatures(featuresArray);
        setPros(prosArray);
        setCons(consArray);
      } else {
        setError(data.message || 'Failed to fetch vehicle');
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      setError('Failed to fetch vehicle');
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

  const handleImagesChange = (urls) => {
    setFormData({
      ...formData,
      images: urls,
      image: urls.length > 0 ? urls[0] : '',
    });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addPro = () => {
    if (newPro.trim()) {
      setPros([...pros, newPro.trim()]);
      setNewPro('');
    }
  };

  const removePro = (index) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const addCon = () => {
    if (newCon.trim()) {
      setCons([...cons, newCon.trim()]);
      setNewCon('');
    }
  };

  const removeCon = (index) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        brand: formData.brand,
        name: formData.name,
        bodyType: formData.bodyType,
        price: formData.price,
        oldPrice: formData.oldPrice || null,
        engine: formData.engine || null,
        transmission: formData.transmission || null,
        fuelType: formData.fuelType || null,
        fuelEconomy: formData.fuelEconomy || null,
        seats: formData.seats || null,
        description: formData.description || null,
        image: formData.image || null,
        images: formData.images || [],
        isPopular: formData.isPopular,
        isAvailable: formData.isAvailable,
        launchYear: formData.launchYear || null,
        horsepower: formData.horsepower || null,
        torque: formData.torque || null,
        groundClearance: formData.groundClearance || null,
        bootSpace: formData.bootSpace || null,
        length: formData.length || null,
        width: formData.width || null,
        height: formData.height || null,
        wheelbase: formData.wheelbase || null,
        fuelTankCapacity: formData.fuelTankCapacity || null,
        kerbWeight: formData.kerbWeight || null,
        features: features,
        pros: pros,
        cons: cons,
      };

      const response = await fetch(`/api/admin/vehicles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Vehicle updated successfully!');
        setTimeout(() => {
          router.push('/admin/dashboard/vehicles');
        }, 1500);
      } else {
        setError(data.message || 'Failed to update vehicle');
      }
    } catch (error) {
      console.error('Update error:', error);
      setError('Failed to update vehicle: ' + error.message);
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

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg p-4 mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Brand *</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Model Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Body Type *</label>
                <select name="bodyType" value={formData.bodyType} onChange={handleChange} className={inputClass} required>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Crossover">Crossover</option>
                  <option value="MPV">MPV</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Price (PKR) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Old Price</label>
                <input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Engine</label>
                <input type="text" name="engine" value={formData.engine} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange} className={inputClass}>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Fuel Type</label>
                <select name="fuelType" value={formData.fuelType} onChange={handleChange} className={inputClass}>
                  <option value="Petrol">Petrol</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Fuel Economy</label>
                <input type="text" name="fuelEconomy" value={formData.fuelEconomy} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Seats</label>
                <input type="number" name="seats" value={formData.seats} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Horsepower</label>
                <input type="number" name="horsepower" value={formData.horsepower} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Launch Year</label>
                <input type="number" name="launchYear" value={formData.launchYear} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="w-4 h-4 accent-chacha-yellow" />
                <span className="text-white text-sm">Mark as Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} className="w-4 h-4 accent-chacha-yellow" />
                <span className="text-white text-sm">Available</span>
              </label>
            </div>
          </div>

          {/* Vehicle Images */}
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Vehicle Images</h2>
            <MultiImageUpload 
              images={formData.images} 
              onChange={handleImagesChange}
              maxImages={3}
            />
          </div>

          {/* Description */}
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={inputClass} />
          </div>

          {/* Features */}
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Features</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }} className={inputClass} placeholder="Add a feature..." />
              <button type="button" onClick={addFeature} className="btn-primary px-4 py-2"><Plus size={20} /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span key={index} className="inline-flex items-center gap-1 bg-chacha-black border border-chacha-border rounded-full px-3 py-1 text-sm text-white">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className="text-chacha-muted hover:text-red-500"><X size={14} /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Pros */}
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Pros</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newPro} onChange={(e) => setNewPro(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPro(); } }} className={inputClass} placeholder="Add a pro..." />
              <button type="button" onClick={addPro} className="btn-primary px-4 py-2"><Plus size={20} /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {pros.map((pro, index) => (
                <span key={index} className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-sm text-green-500">
                  {pro}
                  <button type="button" onClick={() => removePro(index)} className="text-green-500 hover:text-red-500"><X size={14} /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Cons */}
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Cons</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newCon} onChange={(e) => setNewCon(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCon(); } }} className={inputClass} placeholder="Add a con..." />
              <button type="button" onClick={addCon} className="btn-primary px-4 py-2"><Plus size={20} /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {cons.map((con, index) => (
                <span key={index} className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 text-sm text-red-500">
                  {con}
                  <button type="button" onClick={() => removeCon(index)} className="text-red-500 hover:text-red-600"><X size={14} /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Buttons */}
          <div className="flex items-center gap-4">
            <motion.button type="submit" disabled={saving} className="btn-primary inline-flex items-center gap-2 px-8 py-3 disabled:opacity-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {saving ? (
                <div className="w-5 h-5 border-2 border-chacha-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  Update Vehicle
                </>
              )}
            </motion.button>
            <button type="button" onClick={() => router.back()} className="btn-secondary px-8 py-3">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}