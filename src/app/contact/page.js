import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, MessageSquare, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact VehicleChacha',
  description: 'Get in touch with VehicleChacha for questions, feedback, or suggestions.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Contact <span className="text-chacha-yellow">Us</span>
            </h1>
            <p className="text-chacha-muted text-lg">
              Have a question, feedback, or suggestion? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card-dark p-6 text-center">
              <div className="w-12 h-12 bg-chacha-yellow/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="text-chacha-yellow" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-chacha-muted text-sm">
                Send us an email and we'll get back to you.
              </p>
            </div>
            <div className="card-dark p-6 text-center">
              <div className="w-12 h-12 bg-chacha-yellow/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-chacha-yellow" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Feedback</h3>
              <p className="text-chacha-muted text-sm">
                Your feedback helps us improve VehicleChacha.
              </p>
            </div>
            <div className="card-dark p-6 text-center">
              <div className="w-12 h-12 bg-chacha-yellow/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Send className="text-chacha-yellow" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Suggestions</h3>
              <p className="text-chacha-muted text-sm">
                Have an idea? Share it with us!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-dark p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-chacha-black border border-chacha-border rounded-lg px-4 py-3 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}