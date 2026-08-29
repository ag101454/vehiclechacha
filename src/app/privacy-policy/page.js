import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | VehicleChacha',
  description: 'Privacy policy for VehicleChacha',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="card-dark p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
              <p className="text-chacha-muted leading-relaxed">
                VehicleChacha collects minimal information necessary to provide our services. 
                This may include basic usage data to improve our recommendations.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">How We Use Information</h2>
              <p className="text-chacha-muted leading-relaxed">
                We use collected information to improve our car recommendation engine, 
                analyze user preferences, and enhance the overall user experience.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Data Protection</h2>
              <p className="text-chacha-muted leading-relaxed">
                We take reasonable measures to protect your information from unauthorized 
                access or disclosure.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
              <p className="text-chacha-muted leading-relaxed">
                If you have questions about this privacy policy, please contact us through 
                our contact page.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}