import Image from 'next/image';
import { Check, X, Minus } from 'lucide-react';

function formatPrice(price) {
  if (!price) return 'N/A';
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  }
  return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
}

export default function ComparisonTable({ vehicles }) {
  const specs = [
    { label: 'Price', key: 'price', format: formatPrice },
    { label: 'Body Type', key: 'bodyType' },
    { label: 'Engine', key: 'engine' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Fuel Economy', key: 'fuelEconomy', suffix: ' km/l' },
    { label: 'Seats', key: 'seats' },
    { label: 'Horsepower', key: 'horsepower', suffix: ' HP' },
    { label: 'Torque', key: 'torque' },
    { label: 'Ground Clearance', key: 'groundClearance' },
    { label: 'Boot Space', key: 'bootSpace' },
    { label: 'Length', key: 'length' },
    { label: 'Width', key: 'width' },
    { label: 'Height', key: 'height' },
    { label: 'Wheelbase', key: 'wheelbase' },
    { label: 'Fuel Tank', key: 'fuelTankCapacity' },
    { label: 'Kerb Weight', key: 'kerbWeight' },
  ];

  const getValue = (vehicle, key) => {
    const value = vehicle[key];
    if (value === null || value === undefined || value === '') {
      return 'N/A';
    }
    return value;
  };

  return (
    <div className="space-y-8">
      {/* Vehicle Headers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="card-dark p-6 text-center">
            <div className="relative aspect-video bg-chacha-black rounded-lg overflow-hidden mb-4">
              {vehicle.image ? (
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.brand.name} ${vehicle.name}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🚗
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-white">
              {vehicle.brand.name} {vehicle.name}
            </h2>
            <div className="text-chacha-yellow font-bold text-2xl mt-2">
              {formatPrice(vehicle.price)}
            </div>
          </div>
        ))}
      </div>

      {/* Specifications Table */}
      <div className="card-dark overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-chacha-border">
              <th className="text-left p-4 text-chacha-muted font-medium w-1/4">
                Specification
              </th>
              {vehicles.map((vehicle) => (
                <th key={vehicle.id} className="text-left p-4 text-white font-semibold">
                  {vehicle.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.key} className="border-b border-chacha-border last:border-0">
                <td className="p-4 text-chacha-muted">{spec.label}</td>
                {vehicles.map((vehicle) => {
                  const value = getValue(vehicle, spec.key);
                  return (
                    <td key={vehicle.id} className="p-4 text-white">
                      {spec.format ? spec.format(value) : value}
                      {spec.suffix && value !== 'N/A' ? spec.suffix : ''}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Features */}
            <tr className="border-b border-chacha-border">
              <td className="p-4 text-chacha-muted font-medium">Features</td>
              {vehicles.map((vehicle) => {
                const features = JSON.parse(vehicle.features || '[]');
                return (
                  <td key={vehicle.id} className="p-4">
                    <ul className="space-y-1">
                      {features.map((feature, index) => (
                        <li key={index} className="text-white text-sm flex items-center gap-2">
                          <Check size={14} className="text-green-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {features.length === 0 && (
                        <li className="text-chacha-muted text-sm">No features listed</li>
                      )}
                    </ul>
                  </td>
                );
              })}
            </tr>

            {/* Pros */}
            <tr className="border-b border-chacha-border">
              <td className="p-4 text-chacha-muted font-medium">Pros</td>
              {vehicles.map((vehicle) => {
                const pros = JSON.parse(vehicle.pros || '[]');
                return (
                  <td key={vehicle.id} className="p-4">
                    <ul className="space-y-1">
                      {pros.map((pro, index) => (
                        <li key={index} className="text-green-500 text-sm flex items-center gap-2">
                          <Check size={14} className="shrink-0" />
                          {pro}
                        </li>
                      ))}
                      {pros.length === 0 && (
                        <li className="text-chacha-muted text-sm">No pros listed</li>
                      )}
                    </ul>
                  </td>
                );
              })}
            </tr>

            {/* Cons */}
            <tr>
              <td className="p-4 text-chacha-muted font-medium">Cons</td>
              {vehicles.map((vehicle) => {
                const cons = JSON.parse(vehicle.cons || '[]');
                return (
                  <td key={vehicle.id} className="p-4">
                    <ul className="space-y-1">
                      {cons.map((con, index) => (
                        <li key={index} className="text-red-500 text-sm flex items-center gap-2">
                          <X size={14} className="shrink-0" />
                          {con}
                        </li>
                      ))}
                      {cons.length === 0 && (
                        <li className="text-chacha-muted text-sm">No cons listed</li>
                      )}
                    </ul>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chacha's Verdict */}
      <div className="card-dark p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Chacha's <span className="text-chacha-yellow">Verdict</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => {
            const score = Math.floor(Math.random() * 15) + 75; // Placeholder - will be replaced with real scoring
            return (
              <div key={vehicle.id} className="bg-chacha-black rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-chacha-yellow">{score}%</div>
                <div className="text-chacha-muted text-sm mt-1">Chacha Match</div>
                <div className="text-white font-semibold mt-2">{vehicle.name}</div>
                <div className="text-chacha-muted text-xs mt-1">
                  {score >= 85 ? 'Excellent Choice' : score >= 80 ? 'Good Choice' : 'Consider Options'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}