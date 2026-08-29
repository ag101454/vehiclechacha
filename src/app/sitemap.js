import { prisma } from '@/lib/db';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/new-cars`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/car-prices`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/find-my-car`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/how-we-score`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Budget pages
  const budgetPages = [
    'under-20-lakh',
    'under-30-lakh',
    'under-40-lakh',
    'under-50-lakh',
    'under-60-lakh',
    'under-70-lakh',
    '70-lakh-plus',
  ].map(slug => ({
    url: `${baseUrl}/best-cars/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Guide pages
  const guideSlugs = [
    'how-to-choose-a-car-in-pakistan',
    'sedan-vs-suv',
    'petrol-vs-hybrid',
    'manual-vs-automatic',
    'car-ownership-costs',
    'best-family-cars',
  ];
  
  const guidePages = guideSlugs.map(slug => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic vehicle pages
  let vehiclePages = [];
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isAvailable: true },
      include: { brand: true },
    });

    vehiclePages = vehicles.map(vehicle => ({
      url: `${baseUrl}/new-cars/${vehicle.brand.slug}/${vehicle.slug}`,
      lastModified: vehicle.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching vehicles for sitemap:', error);
  }

  return [...staticPages, ...budgetPages, ...guidePages, ...vehiclePages];
}