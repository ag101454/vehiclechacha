import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Mail, MessageSquare, Send, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact VehicleChacha - Get Car Buying Help | VehicleChacha',
  description: 'Contact VehicleChacha for car buying advice, feedback, or suggestions. Get help choosing the right car in Pakistan. Email us at abdulghani4920@gmail.com.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-4 py-2 mb-3">
              <MessageCircle size={16} className="text-chacha-yellow" />
              <span className="text-chacha-yellow font-semibold text-sm">GET IN TOUCH</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="text-chacha-yellow">VehicleChacha</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl mx-auto">
              Have a question about cars, need buying advice, or want to share feedback? 
              Chacha is here to help you make the right car decision.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="card-dark p-6 text-center">
              <div className="w-14 h-14 bg-chacha-yellow/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="text-chacha-yellow" size={28} />
              </div>
              <h3 className="text-white font-bold mb-2">Email Us</h3>
              <p className="text-chacha-muted text-sm mb-2">Send us an email anytime</p>
              <a href="mailto:abdulghani4920@gmail.com" className="text-chacha-yellow text-sm hover:text-yellow-400">
                abdulghani4920@gmail.com
              </a>
            </div>
            <div className="card-dark p-6 text-center">
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-green-500" size={28} />
              </div>
              <h3 className="text-white font-bold mb-2">WhatsApp</h3>
              <p className="text-chacha-muted text-sm mb-2">Quick response on WhatsApp</p>
              <a href="https://wa.me/923407146871" target="_blank" className="text-green-500 text-sm hover:text-green-400">
                0340 7146871
              </a>
            </div>
            <div className="card-dark p-6 text-center">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-500" size={28} />
              </div>
              <h3 className="text-white font-bold mb-2">Response Time</h3>
              <p className="text-chacha-muted text-sm mb-2">We typically respond within</p>
              <span className="text-chacha-yellow text-sm">24 Hours</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-dark p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4" action="mailto:abdulghani4920@gmail.com" method="post" encType="text/plain">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                  placeholder="What is this about?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                  placeholder="Share your question, feedback, or suggestion..."
                  required
                />
              </div>
              <button type="submit" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section - Adds Content */}
          <div className="card-dark p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-1">How long does it take to get a response?</h3>
                <p className="text-chacha-muted text-sm">We typically respond to all inquiries within 24 hours.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Can I suggest a car to add to the website?</h3>
                <p className="text-chacha-muted text-sm">Yes! Send us the car details and we&apos;ll add it to our database after verification.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Do you provide personal car buying assistance?</h3>
                <p className="text-chacha-muted text-sm">
                  Yes! Check out our <Link href="/chacha-ka-mashwara" className="text-chacha-yellow hover:text-yellow-400">Chacha Ka Mashwara</Link> service for personal consultation.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links - Adds Outgoing Links */}
          <div className="card-dark p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/new-cars" className="text-chacha-yellow hover:text-yellow-400 text-sm">Browse New Cars</Link>
              <Link href="/car-prices" className="text-chacha-yellow hover:text-yellow-400 text-sm">Car Prices</Link>
              <Link href="/compare" className="text-chacha-yellow hover:text-yellow-400 text-sm">Compare Cars</Link>
              <Link href="/find-my-car" className="text-chacha-yellow hover:text-yellow-400 text-sm">Find My Car</Link>
              <Link href="/guides" className="text-chacha-yellow hover:text-yellow-400 text-sm">Car Guides</Link>
              <Link href="/how-we-score" className="text-chacha-yellow hover:text-yellow-400 text-sm">How We Score</Link>
              <Link href="/chacha-ka-mashwara" className="text-chacha-yellow hover:text-yellow-400 text-sm">Chacha Ka Mashwara</Link>
              <Link href="/about" className="text-chacha-yellow hover:text-yellow-400 text-sm">About Us</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}