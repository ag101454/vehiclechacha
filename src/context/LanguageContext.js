'use client';

import { createContext, useContext, useState } from 'react';
import { languages } from '@/lib/language';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = languages[language]?.wizard;
    for (const key of keys) {
      value = value?.[key];
    }
    return value || languages.en.wizard[keys[keys.length - 1]] || path;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}