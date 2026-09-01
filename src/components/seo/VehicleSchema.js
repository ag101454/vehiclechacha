export default function VehicleSchema({ vehicle }) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Car',
      name: `${vehicle.brand.name} ${vehicle.name}`,
      brand: {
        '@type': 'Brand',
        name: vehicle.brand.name,
      },
      vehicleModelDate: vehicle.launchYear?.toString(),
      bodyType: vehicle.bodyType,
      fuelType: vehicle.fuelType,
      numberOfDoors: 4,
      vehicleSeatingCapacity: vehicle.seats,
      offers: {
        '@type': 'Offer',
        price: vehicle.price,
        priceCurrency: 'PKR',
        availability: vehicle.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      },
      aggregateRating: vehicle.averageRating > 0 ? {
        '@type': 'AggregateRating',
        ratingValue: vehicle.averageRating,
        reviewCount: vehicle.totalReviews,
        bestRating: 5,
        worstRating: 1,
      } : undefined,
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }