import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RecommendationResults from '@/components/recommendation/RecommendationResults';

export const metadata = {
  title: "Chacha's Recommendations - VehicleChacha",
  description: "See Chacha's personalized car recommendations based on your budget and requirements.",
};

export default function ResultsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Chacha's <span className="text-chacha-yellow">Recommendations</span>
            </h1>
            <p className="text-chacha-muted text-lg">
              Based on your budget and requirements, these are the cars Chacha thinks you should consider.
            </p>
          </div>
          <RecommendationResults />
        </div>
      </main>
      <Footer />
    </>
  );
}