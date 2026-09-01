import './globals.css';
import WelcomeWrapper from '@/components/intro/WelcomeWrapper';
import ChatbotWidget from '@/components/chat/ChatbotWidget';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

export const metadata = {
  metadataBase: new URL('https://vehiclechacha.vercel.app'),
  title: {
    default: 'VehicleChacha - New Cars in Pakistan | Compare Prices & Find Your Car',
    template: '%s | VehicleChacha',
  },
  description: 'Find the right car for your budget. Compare new cars in Pakistan, check prices, specifications, reviews, and get personalized recommendations. Budget Batao, Gaari Chacha Dhoondhega.',
  keywords: [
    'new cars Pakistan',
    'car prices Pakistan',
    'buy car Pakistan',
    'compare cars Pakistan',
    'best cars Pakistan',
    'Toyota Corolla price',
    'Honda City price',
    'Suzuki Swift price',
    'Kia Sportage price',
    'Hyundai Elantra price',
    'car reviews Pakistan',
    'car comparison Pakistan',
    'find my car',
    'budget cars Pakistan',
    'family cars Pakistan',
    'SUV Pakistan',
    'sedan Pakistan',
    'hatchback Pakistan',
  ],
  authors: [{ name: 'VehicleChacha' }],
  creator: 'VehicleChacha',
  publisher: 'VehicleChacha',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-PK': '/',
      'ur-PK': '/',
    },
  },
  verification: {
    google: 'googleb56284ef43af8364',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://vehiclechacha.vercel.app',
    siteName: 'VehicleChacha',
    title: "VehicleChacha - Pakistan's Trusted Car Advisor",
    description: 'Compare new cars in Pakistan, check prices, read reviews, and find the right car for your budget.',
    images: [
      {
        url: '/images/logo/vehiclechacha-logo.png',
        width: 1200,
        height: 630,
        alt: 'VehicleChacha - Pakistan Car Advisor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VehicleChacha - Pakistan Car Advisor',
    description: 'Find the right car for your budget in Pakistan.',
    images: ['/images/logo/vehiclechacha-logo.png'],
    creator: '@vehiclechacha',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-chacha-black text-white min-h-screen">
        <OrganizationSchema />
        <WelcomeWrapper />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}