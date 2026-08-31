import './globals.css';
import WelcomeWrapper from '@/components/intro/WelcomeWrapper';
import ChatbotWidget from '@/components/chat/ChatbotWidget';

export const metadata = {
  title: 'VehicleChacha - New Cars in Pakistan | Compare Prices & Find Your Car',
  description: 'Find the right car for your budget. Compare new cars in Pakistan, check prices and specifications.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-chacha-black text-white min-h-screen">
        <WelcomeWrapper />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}