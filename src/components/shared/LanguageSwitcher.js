'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-chacha-yellow hover:bg-chacha-yellow/5 transition-colors"
      >
        <Globe size={16} />
        <span>{languages[language].flag}</span>
        <span className="hidden sm:block">{languages[language].label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-40 bg-chacha-card/95 backdrop-blur-xl border border-chacha-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
          >
            {Object.entries(languages).map(([key, lang]) => (
              <button
                key={key}
                onClick={() => {
                  changeLanguage(key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  language === key
                    ? 'text-chacha-yellow bg-chacha-yellow/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="flex-1 text-left">{lang.label}</span>
                {language === key && <Check size={14} className="text-chacha-yellow" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}