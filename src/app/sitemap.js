import { prisma } from '@/lib/db';

export default async function sitemap() {
  const baseUrl = 'https://vehiclechacha.vercel.app';

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
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const budgetPages = [
    'under-20-lakh', 'under-30-lakh', 'under-40-lakh', 'under-50-lakh',
    'under-60-lakh', 'under-70-lakh', '70-lakh-plus',
  ].map(slug => ({
    url: `${baseUrl}/best-cars/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  let vehiclePages = [];
  let brandPages = [];
  let guidePages = [];

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isAvailable: true },
      include: { brand: true },
    });

    vehiclePages = vehicles.map(v => ({
      url: `${baseUrl}/new-cars/${v.brand.slug}/${v.slug}`,
      lastModified: v.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const brands = await prisma.brand.findMany();
    brandPages = brands.map(b => ({
      url: `${baseUrl}/new-cars/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const guides = await prisma.guide.findMany();
    guidePages = guides.map(g => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: g.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap error:', error);
  }

  return [...staticPages, ...budgetPages, ...brandPages, ...vehiclePages, ...guidePages];
}