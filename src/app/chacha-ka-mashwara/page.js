'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NextImage from 'next/image';  // Rename to avoid conflict
import { motion } from 'framer-motion';
import { 
  Phone, Wallet, MessageCircle, CheckCircle, AlertCircle,
  Send, User, Mail, Loader2, Crown, Upload, Camera
} from 'lucide-react';

const WHATSAPP_NUMBER = '923407146871';
const JAZZCASH_NUMBER = '03407146871';
const JAZZCASH_NAME = 'Abdul Ghani';
const CONSULTATION_FEE = 2000;

export default function MashwaraPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [screenshot, setScreenshot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budgetMin: '',
    budgetMax: '',
    bodyType: '',
    familySize: '',
    message: '',
    transactionId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Compress image using window.Image
  const compressImage = (file, maxWidth = 800, quality = 0.6) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image(); // Use window.Image
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              const reader2 = new FileReader();
              reader2.onload = (e2) => resolve(e2.target.result);
              reader2.readAsDataURL(blob);
            } else {
              resolve(null);
            }
          }, 'image/jpeg', quality);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleScreenshotUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      setError('Screenshot too large. Max 5MB.');
      return;
    }
    
    try {
      const compressed = await compressImage(file);
      setScreenshot(compressed);
      setError('');
    } catch (err) {
      setError('Failed to upload screenshot. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/mashwara', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, screenshot }),
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
            `Transaction ID: ${formData.transactionId}\n\n` +
            `Mujhe car mashwara chahiye!`
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

            <div className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-5 py-2 mb-3">
              <Crown size={16} className="text-chacha-yellow" />
              <span className="text-chacha-yellow font-bold text-sm">PREMIUM SERVICE</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Chacha Ka <span className="text-chacha-yellow">Mashwara</span>
            </h1>
            <p className="text-chacha-muted text-lg">Personal car advice from Chacha on WhatsApp</p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-dark p-8 text-center"
            >
              <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
              <p className="text-chacha-muted mb-4">Chacha aapko WhatsApp par contact karenge!</p>
              <div className="animate-pulse text-chacha-yellow">Redirecting to WhatsApp...</div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="card-dark p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Apni Information Bharein</h2>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-3 mb-4 flex items-center gap-2">
                      <AlertCircle size={16} /> {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm mb-1">Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none" required />
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Phone *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                          placeholder="03XXXXXXXXX" required />
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Budget Min (Lakh)</label>
                        <input type="number" name="budgetMin" value={formData.budgetMin} onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none" placeholder="Min" />
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Budget Max (Lakh)</label>
                        <input type="number" name="budgetMax" value={formData.budgetMax} onChange={handleChange}
                          className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none" placeholder="Max" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-sm mb-1">JazzCash Transaction ID *</label>
                      <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange}
                        className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-2.5 text-white focus:border-chacha-yellow focus:outline-none"
                        placeholder="e.g., JC123456789" required />
                    </div>

                    {/* Screenshot Upload */}
                    <div>
                      <label className="block text-white text-sm mb-1">Payment Screenshot *</label>
                      <div
                        className="border-2 border-dashed border-chacha-border rounded-lg p-4 text-center hover:border-chacha-yellow transition-colors cursor-pointer"
                        onClick={() => document.getElementById('screenshot-input').click()}
                      >
                        {screenshot ? (
                          <img src={screenshot} alt="Payment Screenshot" className="max-h-40 mx-auto rounded" />
                        ) : (
                          <div className="text-chacha-muted">
                            <Upload size={24} className="mx-auto mb-1" />
                            Click to upload JazzCash screenshot
                          </div>
                        )}
                        <input
                          id="screenshot-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleScreenshotUpload}
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={loading}
                      className="btn-primary w-full py-3 inline-flex items-center justify-center gap-2">
                      {loading ? <><Loader2 className="animate-spin" size={18} /> Submitting...</> : <><Send size={18} /> Submit & Connect on WhatsApp</>}
                    </button>
                  </form>
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                <div className="card-dark p-6">
                  <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                    <Wallet className="text-chacha-yellow" size={20} /> Payment Details
                  </h3>
                  <div className="bg-chacha-black rounded-lg p-4 mb-3">
                    <div className="text-chacha-muted text-xs mb-1">Service Fee</div>
                    <div className="text-2xl font-bold text-chacha-yellow">Rs. {CONSULTATION_FEE}</div>
                  </div>
                  <div className="bg-chacha-black rounded-lg p-4">
                    <div className="text-chacha-muted text-xs mb-1">JazzCash Account</div>
                    <div className="text-white font-semibold">{JAZZCASH_NAME}</div>
                    <div className="text-chacha-yellow">{JAZZCASH_NUMBER}</div>
                  </div>
                </div>

                <div className="card-dark p-6">
                  <h3 className="text-white font-bold text-lg mb-3">Direct WhatsApp</h3>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum Chacha!')}`}
                    target="_blank"
                    className="bg-green-500 text-white w-full py-3 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                    <MessageCircle size={18} /> Chat on WhatsApp
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