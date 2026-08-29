'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, X, Scale, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CompareSelector({ vehicles }) {
  const router = useRouter();
  const [selectedCars, setSelectedCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCar = (car) => {
    if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const handleRemoveCar = (carId) => {
    setSelectedCars(selectedCars.filter(c => c.id !== carId));
  };

  const handleCompare = () => {
    if (selectedCars.length >= 2) {
      const slugs = selectedCars.map(c => c.slug).join('-vs-');
      router.push(`/compare/${slugs}`);
    }
  };

  const filteredVehicles = vehicles.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
    }
    return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
  };

  return (
    <div className="space-y-8">
      {/* Selected Cars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => {
          const car = selectedCars[index];
          return (
            <div
              key={index}
              className={`card-dark p-4 min-h-[200px] ${
                car ? 'border-chacha-yellow/50' : 'border-dashed'
              }`}
            >
              {car ? (
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="relative w-20 h-20 bg-chacha-black rounded-lg overflow-hidden">
                      {car.image ? (
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🚗
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveCar(car.id)}
                      className="text-chacha-muted hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{car.name}</div>
                    <div className="text-chacha-muted text-sm">{car.brand.name}</div>
                  </div>
                  <div className="text-chacha-yellow font-semibold">
                    {formatPrice(car.price)}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-chacha-muted">
                  <div className="text-center">
                    <Plus size={32} className="mx-auto mb-2" />
                    <p className="text-sm">Add a car to compare</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Compare Button */}
      <div className="text-center">
        <button
          onClick={handleCompare}
          disabled={selectedCars.length < 2}
          className="btn-primary inline-flex items-center gap-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Scale size={20} />
          Compare Cars
          <ArrowRight size={20} />
        </button>
        {selectedCars.length < 2 && (
          <p className="text-chacha-muted text-sm mt-2">
            Select at least 2 cars to compare
          </p>
        )}
      </div>

      {/* Car Selection */}
      <div className="card-dark p-6">
        <h2 className="text-white font-bold text-xl mb-4">Select Cars</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
            placeholder="Search cars by brand or model..."
          />
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
          {filteredVehicles.map((car) => {
            const isSelected = selectedCars.find(c => c.id === car.id);
            return (
              <button
                key={car.id}
                onClick={() => isSelected ? handleRemoveCar(car.id) : handleAddCar(car)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  isSelected
                    ? 'bg-chacha-yellow/10 border-chacha-yellow'
                    : 'bg-chacha-black border-chacha-border hover:border-chacha-yellow/50'
                }`}
              >
                <div className="w-10 h-10 bg-chacha-card rounded-lg flex items-center justify-center shrink-0">
                  {car.image ? (
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={40}
                      height={40}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-lg">🚗</span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white text-sm font-medium">{car.name}</div>
                  <div className="text-chacha-muted text-xs">{car.brand.name}</div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-chacha-yellow rounded-full flex items-center justify-center">
                    <span className="text-chacha-black text-xs">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}