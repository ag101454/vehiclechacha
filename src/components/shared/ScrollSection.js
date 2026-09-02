'use client';

import { motion } from 'framer-motion';

export default function ScrollSection({ children, direction = 'up', delay = 0 }) {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
    none: { y: 0, x: 0 },
  };

  const initialOffset = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: initialOffset.y, 
        x: initialOffset.x,
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
      }}
      viewport={{ 
        once: false, // Repeats when scrolling back
        margin: '-100px',
        amount: 0.15,
      }}
      transition={{ 
        duration: 0.9,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}