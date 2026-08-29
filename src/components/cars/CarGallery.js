'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Car as CarIcon } from 'lucide-react';

export default function CarGallery({ images, carName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesList, setImagesList] = useState(() => {
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        return parsed.length > 0 ? parsed : (images ? [images] : []);
      } catch {
        return images ? [images] : [];
      }
    }
    return images || [];
  });

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imagesList.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  if (imagesList.length === 0) {
    return (
      <div className="relative aspect-[16/10] bg-chacha-black rounded-lg overflow-hidden flex items-center justify-center">
        <CarIcon size={64} className="text-chacha-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] bg-chacha-black rounded-lg overflow-hidden border border-chacha-border">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={imagesList[currentIndex]}
              alt={`${carName} - Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {imagesList.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-chacha-black/70 hover:bg-chacha-black/90 text-white rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-chacha-black/70 hover:bg-chacha-black/90 text-white rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {imagesList.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-chacha-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
            {currentIndex + 1} / {imagesList.length}
          </div>
        )}
      </div>

      {imagesList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {imagesList.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors shrink-0 ${
                index === currentIndex
                  ? 'border-chacha-yellow'
                  : 'border-transparent hover:border-chacha-yellow/50'
              }`}
            >
              <Image
                src={image}
                alt={`${carName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
