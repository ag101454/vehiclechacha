export function generateSEO({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
  }) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vehiclechacha.vercel.app';
    const fullUrl = `${siteUrl}${url || ''}`;
    const defaultImage = `${siteUrl}/images/logo/vehiclechacha-logo.png`;
  
    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: fullUrl,
      },
      openGraph: {
        title,
        description,
        url: fullUrl,
        siteName: 'VehicleChacha',
        type,
        images: [
          {
            url: image || defaultImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'en_PK',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image || defaultImage],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  }