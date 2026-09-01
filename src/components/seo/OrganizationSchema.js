export default function OrganizationSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'VehicleChacha',
      url: 'https://vehiclechacha.vercel.app',
      logo: 'https://vehiclechacha.vercel.app/images/logo/vehiclechacha-logo.png',
      description: 'Pakistan\'s trusted car advisor. Compare new cars, check prices, and get personalized recommendations.',
      sameAs: [
        'https://facebook.com/vehiclechacha',
        'https://twitter.com/vehiclechacha',
        'https://instagram.com/vehiclechacha',
        'https://youtube.com/@vehiclechacha',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'abdulghani4920@gmail.com',
        availableLanguage: ['en', 'ur'],
      },
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }