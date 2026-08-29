'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function EmptyState({ 
  icon = '🚗', 
  title = 'Nothing here yet', 
  description = 'Chacha is working on adding content.',
  actionText = 'Go Home',
  actionHref = '/',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <motion.div
        className="text-6xl mb-6"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-chacha-muted mb-6">{description}</p>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="btn-primary inline-flex items-center gap-2 px-6 py-3"
        >
          {actionText}
          <ArrowRight size={20} />
        </Link>
      )}
    </motion.div>
  );
}