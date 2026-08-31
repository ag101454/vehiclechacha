'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How does Chacha Match™ work?',
    answer: 'Chacha Match™ scores cars based on 8 factors: budget fit, fuel economy, family suitability, safety, maintenance, resale value, features, and performance. Each factor is weighted for a total score out of 100%.',
  },
  {
    question: 'Are the car prices up to date?',
    answer: 'Yes! We update prices regularly based on official manufacturer announcements and market trends. Each car page shows the last updated date.',
  },
  {
    question: 'Can I trust the recommendations?',
    answer: 'Absolutely! Our recommendations are 100% transparent and based on factual data. We don\'t accept payments for higher scores. Every car is evaluated using the same criteria.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account needed! You can browse cars, compare, and get recommendations completely free without signing up.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-4 py-2 mb-3">
            <HelpCircle size={16} className="text-chacha-yellow" />
            <span className="text-chacha-yellow font-semibold text-sm">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="card-dark overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-semibold">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-chacha-yellow transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-chacha-muted text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/how-we-score" className="text-chacha-yellow hover:text-yellow-400 text-sm font-medium">
            Learn more about our scoring methodology →
          </Link>
        </div>
      </div>
    </section>
  );
}