'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Check, Wallet, Car, Users, MapPin, Fuel, 
  Settings, Heart, Zap, Loader2, Star, Shield, Sparkles, Gauge, Crown,
  Globe, Languages, ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const steps = [
  { id: 'language', icon: Globe },
  { id: 'budget', icon: Wallet },
  { id: 'bodyType', icon: Car },
  { id: 'familySize', icon: Users },
  { id: 'driving', icon: MapPin },
  { id: 'fuel', icon: Fuel },
  { id: 'transmission', icon: Settings },
  { id: 'priorities', icon: Heart },
];

const languageOptions = [
  { 
    label: 'English', 
    value: 'en', 
    flag: '🇬🇧',
    desc: 'Continue in English',
  },
  { 
    label: 'Roman Urdu', 
    value: 'ur', 
    flag: '🇵🇰',
    desc: 'Roman Urdu mein jaari rakhein',
  },
];

const budgetOptions = [
  { label: 'Under 20 Lakh', labelUr: '20 Lakh se kam', value: 'under-20', min: 0, max: 2000000, tag: 'Budget Pick', tagUr: 'Budget' },
  { label: '20-30 Lakh', labelUr: '20-30 Lakh', value: '20-30', min: 2000000, max: 3000000, tag: 'Popular', tagUr: 'Popular' },
  { label: '30-40 Lakh', labelUr: '30-40 Lakh', value: '30-40', min: 3000000, max: 4000000, tag: 'Mid Range', tagUr: 'Mid Range' },
  { label: '40-50 Lakh', labelUr: '40-50 Lakh', value: '40-50', min: 4000000, max: 5000000, tag: 'Premium', tagUr: 'Premium' },
  { label: '50-70 Lakh', labelUr: '50-70 Lakh', value: '50-70', min: 5000000, max: 7000000, tag: 'Executive', tagUr: 'Executive' },
  { label: '70 Lakh+', labelUr: '70 Lakh+', value: '70-plus', min: 7000000, max: 20000000, tag: 'Luxury', tagUr: 'Luxury' },
];

const bodyTypeOptions = [
  { label: 'Hatchback', labelUr: 'Hatchback', value: 'hatchback', desc: 'Compact & Efficient', descUr: 'Compact aur efficient' },
  { label: 'Sedan', labelUr: 'Sedan', value: 'sedan', desc: 'Classic & Comfortable', descUr: 'Classic aur comfortable' },
  { label: 'SUV', labelUr: 'SUV', value: 'suv', desc: 'Spacious & Powerful', descUr: 'Spacious aur powerful' },
  { label: 'Crossover', labelUr: 'Crossover', value: 'crossover', desc: 'Versatile & Modern', descUr: 'Versatile aur modern' },
  { label: 'MPV', labelUr: 'MPV', value: 'mpv', desc: 'Family Oriented', descUr: 'Family ke liye' },
  { label: 'No Preference', labelUr: 'Koi bhi', value: 'no-preference', desc: 'Show All', descUr: 'Sab dekhein' },
];

const familySizeOptions = [
  { label: '1-2 People', labelUr: '1-2 Log', value: '1-2', desc: 'Solo or Couple', descUr: 'Solo ya couple' },
  { label: '3-4 People', labelUr: '3-4 Log', value: '3-4', desc: 'Small Family', descUr: 'Chota family' },
  { label: '5+ People', labelUr: '5+ Log', value: '5-plus', desc: 'Full Family', descUr: 'Poora family' },
  { label: 'Large Family', labelUr: 'Bara family', value: 'large', desc: 'Need Max Space', descUr: 'Zyada space chahiye' },
];

const drivingOptions = [
  { label: 'Mostly City', labelUr: 'Zyada city', value: 'city', desc: 'Daily Commute', descUr: 'Daily commute' },
  { label: 'Mostly Highway', labelUr: 'Zyada highway', value: 'highway', desc: 'Long Drives', descUr: 'Long drives' },
  { label: 'Mixed', labelUr: 'Dono barabar', value: 'mixed', desc: 'Both Equal', descUr: 'Mixed driving' },
];

const fuelOptions = [
  { label: 'Petrol', labelUr: 'Petrol', value: 'petrol', desc: 'Classic Choice', descUr: 'Classic choice' },
  { label: 'Hybrid', labelUr: 'Hybrid', value: 'hybrid', desc: 'Fuel Saver', descUr: 'Fuel saver' },
  { label: 'Electric', labelUr: 'Electric', value: 'electric', desc: 'Future Ready', descUr: 'Future ready' },
  { label: 'No Preference', labelUr: 'Koi bhi', value: 'no-preference', desc: 'Any Fuel', descUr: 'Koi bhi fuel' },
];

const transmissionOptions = [
  { label: 'Manual', labelUr: 'Manual', value: 'manual', desc: 'Full Control', descUr: 'Full control' },
  { label: 'Automatic', labelUr: 'Automatic', value: 'automatic', desc: 'Easy Drive', descUr: 'Easy drive' },
  { label: 'No Preference', labelUr: 'Koi bhi', value: 'no-preference', desc: 'Either Works', descUr: 'Dono chalega' },
];

const priorityOptions = [
  { label: 'Fuel Economy', labelUr: 'Fuel Economy', value: 'fuel-economy', icon: Fuel },
  { label: 'Safety', labelUr: 'Safety', value: 'safety', icon: Shield },
  { label: 'Features', labelUr: 'Features', value: 'features', icon: Sparkles },
  { label: 'Comfort', labelUr: 'Comfort', value: 'comfort', icon: Crown },
  { label: 'Performance', labelUr: 'Performance', value: 'performance', icon: Gauge },
  { label: 'Resale Value', labelUr: 'Resale Value', value: 'resale', icon: Star },
  { label: 'Low Maintenance', labelUr: 'Low Maintenance', value: 'maintenance', icon: Settings },
  { label: 'Family Friendly', labelUr: 'Family Friendly', value: 'family', icon: Users },
  { label: 'Value for Money', labelUr: 'Value for Money', value: 'value', icon: Wallet },
];

const translations = {
  en: {
    step: 'Step',
    of: 'of',
    complete: 'Complete',
    back: 'Back',
    next: 'Next',
    findCar: 'Chacha, Find My Car!',
    finding: 'Chacha is searching...',
    trust: 'Chacha Match™ Scoring System - 100% Transparent',
    steps: {
      language: { title: 'Choose Your Language', subtitle: 'Select your preferred language', description: 'Which language would you like to use?' },
      budget: { title: "What's Your Budget?", subtitle: 'Select your price range', description: 'Tell Chacha how much you want to spend' },
      bodyType: { title: 'Which Body Type?', subtitle: 'Choose your preferred style', description: 'Sedan, SUV, or Hatchback - what do you like?' },
      familySize: { title: 'How Many People Travel?', subtitle: 'Based on family size', description: 'Chacha will find the best car for your family' },
      driving: { title: 'Where Do You Drive?', subtitle: 'City, Highway, or Both', description: 'Based on your driving habits' },
      fuel: { title: 'Fuel Preference?', subtitle: 'Petrol, Hybrid, or Electric', description: 'How important is fuel economy to you?' },
      transmission: { title: 'Gear Preference?', subtitle: 'Manual or Automatic', description: 'Which transmission do you prefer?' },
      priorities: { title: "What's Most Important?", subtitle: 'Select your priorities', description: 'Chacha will use these in scoring' },
    },
    getLabel: (opt) => opt.label,
    getDesc: (opt) => opt.desc,
    getTag: (opt) => opt.tag,
  },
  ur: {
    step: 'Step',
    of: 'of',
    complete: 'Complete',
    back: 'Peeche',
    next: 'Aage Barho',
    findCar: 'Chacha, Gaari Dhoondo!',
    finding: 'Chacha dhoondh raha hai...',
    trust: 'Chacha Match™ Scoring System - 100% Transparent',
    steps: {
      language: { title: 'Zuban Chunein', subtitle: 'Apni pasandida zuban chunein', description: 'Kaunsi zuban use karna chahenge?' },
      budget: { title: 'Kitna Budget Hai?', subtitle: 'Apna budget range chunein', description: 'Chacha ko batayein kitna kharcha karna chahte hain' },
      bodyType: { title: 'Kaunsi Body Type?', subtitle: 'Apni pasand chunein', description: 'Sedan, SUV, ya Hatchback - kya pasand hai?' },
      familySize: { title: 'Kitne Log Safar Karenge?', subtitle: 'Family size ke hisaab se', description: 'Chacha family ke liye best gaari dhoondhega' },
      driving: { title: 'Kahan Chalate Hain?', subtitle: 'City, Highway, ya Dono', description: 'Aapki driving habits ke mutabiq' },
      fuel: { title: 'Fuel Kya Pasand?', subtitle: 'Petrol, Hybrid, ya Electric', description: 'Fuel economy kitni important hai?' },
      transmission: { title: 'Gear Kaise?', subtitle: 'Manual ya Automatic', description: 'Aapko kaunsi transmission chahiye?' },
      priorities: { title: 'Kya Sabse Zaroori Hai?', subtitle: 'Apni priorities chunein', description: 'Chacha in priorities ko scoring mein rakhega' },
    },
    getLabel: (opt) => opt.labelUr || opt.label,
    getDesc: (opt) => opt.descUr || opt.desc,
    getTag: (opt) => opt.tagUr || opt.tag,
  },
};

export default function RecommendationWizard() {
  const router = useRouter();
  const { language, changeLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1);

  const t = translations[language] || translations.en;

  const handleAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    if (key === 'language') {
      changeLanguage(value);
    }
  };

  const handleNext = () => {
    setDirection(1);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const preferences = {
      budget: answers.budget ? budgetOptions.find(b => b.value === answers.budget) : null,
      bodyType: answers.bodyType,
      familySize: answers.familySize,
      driving: answers.driving,
      fuel: answers.fuel,
      transmission: answers.transmission,
      priorities: answers.priorities || [],
    };

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem('recommendations', JSON.stringify(data.recommendations));
        sessionStorage.setItem('preferences', JSON.stringify(preferences));
        router.push('/find-my-car/results');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentOptions = () => {
    switch (steps[currentStep].id) {
      case 'language': return { options: languageOptions, key: 'language', multiSelect: false, isLanguageStep: true };
      case 'budget': return { options: budgetOptions, key: 'budget', multiSelect: false };
      case 'bodyType': return { options: bodyTypeOptions, key: 'bodyType', multiSelect: false };
      case 'familySize': return { options: familySizeOptions, key: 'familySize', multiSelect: false };
      case 'driving': return { options: drivingOptions, key: 'driving', multiSelect: false };
      case 'fuel': return { options: fuelOptions, key: 'fuel', multiSelect: false };
      case 'transmission': return { options: transmissionOptions, key: 'transmission', multiSelect: false };
      case 'priorities': return { options: priorityOptions, key: 'priorities', multiSelect: true };
      default: return { options: [], key: '', multiSelect: false };
    }
  };

  const { options, key, multiSelect, isLanguageStep } = getCurrentOptions();
  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;
  const stepText = t.steps[currentStepData.id];
  const isLastStep = currentStep === steps.length - 1;
  const isAnswered = multiSelect 
    ? (answers[key] || []).length > 0
    : answers[key] !== undefined;

  const handleMultiSelect = (value) => {
    const current = answers[key] || [];
    if (current.includes(value)) {
      handleAnswer(key, current.filter(v => v !== value));
    } else {
      handleAnswer(key, [...current, value]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-chacha-muted text-xs font-medium tracking-wider uppercase">
            {t.step} {currentStep + 1} {t.of} {steps.length}
          </span>
          <motion.span
            key={currentStep}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-chacha-yellow font-bold text-sm"
          >
            {Math.round(((currentStep + 1) / steps.length) * 100)}% {t.complete}
          </motion.span>
        </div>
        <div className="h-1.5 bg-chacha-card rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-chacha-yellow to-yellow-400"
            initial={false}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="card-dark p-6 md:p-8 relative overflow-hidden"
        >
          {/* Decorative accents */}
          <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-chacha-yellow to-transparent" />
          <div className="absolute top-0 left-0 w-1 h-24 bg-gradient-to-b from-chacha-yellow to-transparent" />
          <div className="absolute bottom-0 right-0 w-24 h-1 bg-gradient-to-l from-chacha-yellow to-transparent" />
          <div className="absolute bottom-0 right-0 w-1 h-24 bg-gradient-to-t from-chacha-yellow to-transparent" />
          
          <div className="relative z-10">
            {/* Step Header */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-chacha-yellow/10 border border-chacha-yellow/20 flex items-center justify-center shrink-0"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <StepIcon className="text-chacha-yellow" size={24} />
              </motion.div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {stepText.title}
                </h2>
                <p className="text-chacha-yellow text-xs font-medium">
                  {stepText.subtitle}
                </p>
                <p className="text-chacha-muted text-xs mt-1">
                  {stepText.description}
                </p>
              </div>
            </div>

            {/* Language Step - Special Design */}
            {isLanguageStep ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {languageOptions.map((option) => {
                  const isSelected = answers.language === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer('language', option.value)}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-chacha-yellow bg-chacha-yellow/10 shadow-lg shadow-chacha-yellow/20'
                          : 'border-chacha-border hover:border-chacha-yellow/50 hover:bg-chacha-yellow/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-center">
                        <div className="text-5xl mb-3">{option.flag}</div>
                        <div className={`font-bold text-lg mb-1 ${isSelected ? 'text-chacha-yellow' : 'text-white'}`}>
                          {option.label}
                        </div>
                        <div className="text-chacha-muted text-sm">
                          {option.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-chacha-yellow flex items-center justify-center"
                        >
                          <Check size={14} className="text-chacha-black" strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              /* Regular Options */
              <div className={`grid grid-cols-1 ${multiSelect ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'} gap-3`}>
                {options.map((option) => {
                  const isSelected = multiSelect
                    ? (answers[key] || []).includes(option.value)
                    : answers[key] === option.value;

                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => {
                        if (multiSelect) {
                          handleMultiSelect(option.value);
                        } else {
                          handleAnswer(key, option.value);
                        }
                      }}
                      className={`relative p-4 rounded-lg border transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-chacha-yellow bg-chacha-yellow/10 shadow-lg shadow-chacha-yellow/10'
                          : 'border-chacha-border hover:border-chacha-yellow/50 hover:bg-chacha-yellow/5'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        {multiSelect && option.icon && (
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-chacha-yellow text-chacha-black' : 'bg-chacha-black text-chacha-muted'
                          }`}>
                            <option.icon size={16} />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className={`font-semibold text-sm ${
                            isSelected ? 'text-chacha-yellow' : 'text-white'
                          }`}>
                            {t.getLabel(option)}
                          </div>
                          {t.getDesc(option) && (
                            <div className="text-chacha-muted text-xs mt-0.5">
                              {t.getDesc(option)}
                            </div>
                          )}
                          {t.getTag(option) && (
                            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1 ${
                              isSelected 
                                ? 'bg-chacha-yellow text-chacha-black' 
                                : 'bg-chacha-black text-chacha-muted'
                            }`}>
                              {t.getTag(option)}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-chacha-yellow flex items-center justify-center shrink-0 mt-1"
                          >
                            <Check size={12} className="text-chacha-black" strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-chacha-border/50">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentStep === 0
                    ? 'text-chacha-muted opacity-50 cursor-not-allowed'
                    : 'text-chacha-muted hover:text-white hover:bg-chacha-card'
                }`}
              >
                <ArrowLeft size={16} />
                {t.back}
              </button>

              {isLastStep ? (
                <motion.button
                  onClick={handleSubmit}
                  disabled={!isAnswered || loading}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                    !isAnswered || loading
                      ? 'opacity-50 cursor-not-allowed bg-chacha-card text-chacha-muted'
                      : 'bg-chacha-yellow text-chacha-black hover:bg-yellow-400 hover:shadow-lg hover:shadow-chacha-yellow/30'
                  }`}
                  whileHover={isAnswered && !loading ? { scale: 1.05 } : {}}
                  whileTap={isAnswered && !loading ? { scale: 0.95 } : {}}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      {t.finding}
                    </>
                  ) : (
                    <>
                      <Zap size={16} className="fill-chacha-black" />
                      {t.findCar}
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                    !isAnswered
                      ? 'opacity-50 cursor-not-allowed bg-chacha-card text-chacha-muted'
                      : 'bg-chacha-yellow text-chacha-black hover:bg-yellow-400 hover:shadow-lg hover:shadow-chacha-yellow/30'
                  }`}
                  whileHover={isAnswered ? { scale: 1.05 } : {}}
                  whileTap={isAnswered ? { scale: 0.95 } : {}}
                >
                  {t.next}
                  <ArrowRight size={16} />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className={`rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'bg-chacha-yellow w-6 h-1.5'
                : index < currentStep
                ? 'bg-chacha-yellow/40 w-1.5 h-1.5'
                : 'bg-chacha-border w-1.5 h-1.5'
            }`}
            animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1.5, repeat: index === currentStep ? Infinity : 0 }}
          />
        ))}
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <Shield size={14} className="text-chacha-yellow" />
        <span className="text-chacha-muted text-xs">{t.trust}</span>
      </div>
    </div>
  );
}