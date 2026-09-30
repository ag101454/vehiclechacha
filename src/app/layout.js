import './globals.css';
import WelcomeWrapper from '@/components/intro/WelcomeWrapper';
import ChatbotWidget from '@/components/chat/ChatbotWidget';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

export const metadata = {
  metadataBase: new URL('https://vehiclechacha.vercel.app'),
  
  // ===== TITLE =====
  title: {
    default: 'VehicleChacha - New Cars in Pakistan 2026 | Compare Prices & Find Your Car',
    template: '%s | VehicleChacha',
  },
  
  // ===== DESCRIPTION =====
  description: 'Find the right car for your budget in Pakistan. Compare new cars, check latest prices, read reviews, and get personalized recommendations from Chacha.',
  
  // ===== KEYWORDS =====
  keywords: [
    'new cars Pakistan',
    'car prices Pakistan',
    'buy car Pakistan',
    'compare cars Pakistan',
    'best cars Pakistan',
    'VehicleChacha',
    'car prices in Pakistan 2026',
    'Toyota Corolla price Pakistan',
    'Honda City price Pakistan',
    'Suzuki Alto price Pakistan',
    'Kia Sportage price Pakistan',
    'Hyundai Elantra price Pakistan',
    'car reviews Pakistan',
    'car comparison Pakistan',
    'find my car',
    'budget cars Pakistan',
    'family cars Pakistan',
    'SUV Pakistan',
    'sedan Pakistan',
    'hatchback Pakistan',
    'electric cars Pakistan',
    'BYD Pakistan',
  ],
  
  // ===== AUTHORS & CREATOR =====
  authors: [{ name: 'VehicleChacha' }],
  creator: 'VehicleChacha',
  publisher: 'VehicleChacha',
  
  // ===== FORMAT DETECTION =====
  formatDetection: { 
    email: false, 
    address: false, 
    telephone: false 
  },
  
  // ===== FAVICON / ICONS =====
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  
  // ===== GOOGLE VERIFICATION =====
  verification: {
    google: 'googleb56284ef43af8364',
  },
  
  // ===== OPEN GRAPH (Facebook, WhatsApp, LinkedIn) =====
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
        type: 'image/png',
      },
    ],
  },
  
  // ===== TWITTER CARDS =====
  twitter: {
    card: 'summary_large_image',
    title: 'VehicleChacha - Pakistan Car Advisor',
    description: 'Find the right car for your budget in Pakistan.',
    images: ['/images/logo/vehiclechacha-logo.png'],
    creator: '@vehiclechacha',
  },
  
  // ===== ROBOTS =====
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  
  // ===== ALTERNATES =====
  alternates: {
    canonical: 'https://vehiclechacha.vercel.app',
  },
  
  // ===== OTHER META =====
  other: {
    'application-name': 'VehicleChacha',
    'apple-mobile-web-app-title': 'VehicleChacha',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#FFC400',
    'theme-color': '#0A0A0A',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0A0A0A" />
        
        {/* Favicon fallback */}
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="bg-chacha-black text-white min-h-screen">
        <OrganizationSchema />
        <WelcomeWrapper />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}