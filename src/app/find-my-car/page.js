import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RecommendationWizard from '@/components/recommendation/RecommendationWizard';
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

export const metadata = {
  title: 'Find My Car - VehicleChacha',
  description: 'Tell Chacha your budget and requirements. Get personalized car recommendations.',
};

export default function FindMyCarPage() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-chacha-black -z-10" />
        
        <div className="container-custom py-8 md:py-12">
          {/* Language Switcher */}
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Find <span className="text-chacha-yellow">My Car</span>
            </h1>
          </div>

          <RecommendationWizard />
        </div>
      </main>
      <Footer />
    </LanguageProvider>
  );
}