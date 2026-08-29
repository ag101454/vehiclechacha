import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service | VehicleChacha',
  description: 'Terms of service for VehicleChacha',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="card-dark p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Acceptance of Terms</h2>
              <p className="text-chacha-muted leading-relaxed">
                By using VehicleChacha, you agree to these terms of service. If you do not 
                agree, please do not use our website.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Use of Service</h2>
              <p className="text-chacha-muted leading-relaxed">
                VehicleChacha provides car recommendations and information for personal, 
                non-commercial use. All information is provided in good faith but may not 
                be 100% accurate.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Disclaimer</h2>
              <p className="text-chacha-muted leading-relaxed">
                Car prices and specifications may change. Always verify information with 
                official dealers before making a purchase decision.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
              <p className="text-chacha-muted leading-relaxed">
                VehicleChacha is not liable for any decisions made based on information 
                provided on this website.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}