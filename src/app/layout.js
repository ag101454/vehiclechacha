import './globals.css';
import WelcomeWrapper from '@/components/intro/WelcomeWrapper';

export const metadata = {
  title: 'VehicleChacha - New Cars in Pakistan | Compare Prices & Find Your Car',
  description: 'Find the right car for your budget. Compare new cars in Pakistan, check prices and specifications. Budget Batao, Gaari Chacha Dhoondhega.',
  keywords: 'new cars pakistan, car prices pakistan, buy car pakistan, compare cars pakistan',
  openGraph: {
    title: 'VehicleChacha - New Cars in Pakistan',
    description: 'Find the right car for your budget. Compare new cars in Pakistan.',
    type: 'website',
    locale: 'en_PK',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-chacha-black text-white min-h-screen">
        <WelcomeWrapper />
        {children}
      </body>
    </html>
  );
}