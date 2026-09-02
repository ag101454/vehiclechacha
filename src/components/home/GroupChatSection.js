'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Users, 
  ArrowRight,
  Zap,
  Star,
  Crown
} from 'lucide-react';

const WHATSAPP_NUMBER = '923407146871';

export default function GroupChatSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10" />
      
      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-dark p-8 md:p-12 relative overflow-hidden border-2 border-green-500/40 hover:border-green-500/70 transition-all duration-300"
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.1) 0%, transparent 60%)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-green-500" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-green-500" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-green-500" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-500" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4"
              >
                <MessageCircle size={16} className="text-green-500" />
                <span className="text-green-500 font-bold text-sm tracking-wide">
                  LIVE COMMUNITY
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Vehicle{' '}
                <motion.span
                  className="text-green-500 inline-block"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Group Chat
                </motion.span>
              </h2>

              <p className="text-chacha-muted text-lg mb-6">
                Join discussions about your favorite cars. Ask questions, share 
                experiences, and get advice from Chacha and other car owners.
              </p>

              {/* Feature List */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: MessageCircle, text: 'Real-time discussions with car owners', color: 'text-green-500' },
                  { icon: Users, text: 'Join community of car enthusiasts', color: 'text-chacha-yellow' },
                  { icon: Crown, text: 'Direct answers from Chacha (Admin)', color: 'text-yellow-400' },
                  { icon: Zap, text: 'Instant messaging - no refresh needed', color: 'text-blue-500' },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${feature.color} bg-white/5`}>
                      <feature.icon size={18} />
                    </div>
                    <span className="text-white">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/group-chat"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all"
                >
                  <MessageCircle size={20} />
                  Join Group Chat
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Right Content - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              {/* Animated Chat Preview */}
              <div className="relative max-w-sm mx-auto">
                {/* Chat Bubble 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-chacha-card border border-green-500/30 rounded-2xl p-4 mb-3 rounded-bl-none max-w-[80%]"
                >
                  <div className="text-green-500 text-xs font-bold mb-1">Ali Raza</div>
                  <div className="text-white text-sm">Is Toyota Corolla good for family?</div>
                </motion.div>

                {/* Chat Bubble 2 - Admin */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="bg-chacha-yellow rounded-2xl p-4 mb-3 rounded-br-none max-w-[80%] ml-auto"
                >
                  <div className="text-chacha-black/70 text-xs font-bold mb-1">👨🏽 Chacha (Admin)</div>
                  <div className="text-chacha-black text-sm">Yes! Corolla is excellent for families. Check our group chat for details!</div>
                </motion.div>

                {/* Chat Bubble 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 }}
                  className="bg-chacha-card border border-green-500/30 rounded-2xl p-4 rounded-bl-none max-w-[80%]"
                >
                  <div className="text-green-500 text-xs font-bold mb-1">Sara Khan</div>
                  <div className="text-white text-sm">What about fuel economy?</div>
                </motion.div>

                {/* Live Badge */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mt-4"
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE DISCUSSION
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}