'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { 
  Phone, Wallet, MessageCircle, CheckCircle, AlertCircle,
  Send, User, Loader2, Crown, Sparkles, Gift
} from 'lucide-react';

const WHATSAPP_NUMBER = '923407146871';
const FREE_PERIOD = 'Limited Time Offer - Free for First 2 Months!';

export default function MashwaraPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budgetMin: '',
    budgetMax: '',
    bodyType: '',
    familySize: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/mashwara', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          const whatsappMsg = encodeURIComponent(
            `Assalam-o-Alaikum Chacha! 🚗\n\n` +
            `Mera naam: ${formData.name}\n` +
            `Phone: ${formData.phone}\n` +
            `Budget: ${formData.budgetMin || 'N/A'} - ${formData.budgetMax || 'N/A'} Lakh\n` +
            `Body Type: ${formData.bodyType || 'N/A'}\n` +
            `Family Size: ${formData.familySize || 'N/A'}\n\n` +
            `Mujhe car mashwara chahiye! (FREE offer)`
          );
          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, '_blank');
        }, 3000);
      } else {
        setError(data.message || 'Failed to submit');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <NextImage
                src="/images/logo/vehiclechacha-logo.png"
                alt="VehicleChacha Logo"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(255,196,0,0.6)]"
                priority
              />
            </motion.div>

            {/* FREE Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-5 py-2 mb-3"
            >
              <Gift size={16} className="text-green-500" />
              <span className="text-green-500 font-bold text-sm">FREE FOR 2 MONTHS!</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Chacha Ka <span className="text-chacha-yellow">Mashwara</span>
            </h1>
            <p className="text-chacha-muted text-lg">
              Personal car advice from Chacha on WhatsApp
            </p>
            <p className="text-green-500 text-sm mt-2 font-medium">
              {FREE_PERIOD}
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-dark p-8 text-center"
            >
              <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
              <p className="text-chacha-muted mb-4">
                Chacha aapko WhatsApp par contact karenge!
              </p>
              <div className="animate-pulse text-chacha-yellow">
                Redirecting to WhatsApp...
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="card-dark p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="text-chacha-yellow" size={20} />
                    Apni Information Bharein
                  </h2>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-3 mb-4 flex items-center gap-2">
                      <AlertCircle size={16} /> {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm mb-1">Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Phone *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                          placeholder="03XXXXXXXXX" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Email (Optional)</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm mb-1">Budget Min (Lakh)</label>
                        <input 
                          type="number" 
                          name="budgetMin" 
                          value={formData.budgetMin} 
                          onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none" 
                          placeholder="Min" 
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Budget Max (Lakh)</label>
                        <input 
                          type="number" 
                          name="budgetMax" 
                          value={formData.budgetMax} 
                          onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none" 
                          placeholder="Max" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm mb-1">Body Type</label>
                        <select
                          name="bodyType"
                          value={formData.bodyType}
                          onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                        >
                          <option value="">Select</option>
                          <option>Hatchback</option>
                          <option>Sedan</option>
                          <option>SUV</option>
                          <option>Crossover</option>
                          <option>MPV</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Family Size</label>
                        <select
                          name="familySize"
                          value={formData.familySize}
                          onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                        >
                          <option value="">Select</option>
                          <option>1-2 People</option>
                          <option>3-4 People</option>
                          <option>5+ People</option>
                          <option>Large Family</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-sm mb-1">Message (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                        placeholder="Koi specific sawal ya requirement..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary w-full py-3 inline-flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Submit & Connect on WhatsApp (FREE)
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column - FREE Info */}
              <div className="space-y-4">
                <div className="card-dark p-6 text-center">
                  <h3 className="text-white font-bold text-lg mb-3 flex items-center justify-center gap-2">
                    <Gift className="text-green-500" size={20} />
                    Special Offer
                  </h3>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-3">
                    <div className="text-4xl font-bold text-green-500 mb-1">FREE</div>
                    <div className="text-chacha-muted text-xs">For First 2 Months</div>
                  </div>
                  <div className="text-chacha-muted text-xs">
                    No payment required. Just fill the form and Chacha will contact you!
                  </div>
                </div>

                <div className="card-dark p-6">
                  <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="text-chacha-yellow" size={20} />
                    How It Works
                  </h3>
                  <ol className="space-y-3 text-sm text-chacha-muted">
                    <li className="flex gap-2">
                      <span className="text-chacha-yellow font-bold">1.</span>
                      Form bharein apni details ke saath
                    </li>
                    <li className="flex gap-2">
                      <span className="text-chacha-yellow font-bold">2.</span>
                      Submit karein - bilkul FREE
                    </li>
                    <li className="flex gap-2">
                      <span className="text-chacha-yellow font-bold">3.</span>
                      Chacha aapko WhatsApp par contact karenge
                    </li>
                    <li className="flex gap-2">
                      <span className="text-chacha-yellow font-bold">4.</span>
                      Personal car recommendation milegi
                    </li>
                  </ol>
                </div>

                <div className="card-dark p-6">
                  <h3 className="text-white font-bold text-lg mb-3">Direct WhatsApp</h3>
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum Chacha! Mujhe car mashwara chahiye.')}`}
                    target="_blank"
                    className="bg-green-500 text-white w-full py-3 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}