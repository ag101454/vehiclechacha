'use client';

import { motion } from 'framer-motion';
import { Car, Star, Shield, TrendingUp } from 'lucide-react';

export default function StatsBar({ carCount, reviewCount }) {
  const stats = [
    { icon: Car, label: 'Cars Listed', value: `${carCount}+`, color: 'text-chacha-yellow' },
    { icon: Star, label: 'User Reviews', value: `${reviewCount}+`, color: 'text-green-500' },
    { icon: Shield, label: 'Trusted Brands', value: '7+', color: 'text-blue-500' },
    { icon: TrendingUp, label: 'Match Accuracy', value: '93%', color: 'text-purple-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="card-dark p-4 text-center"
        >
          <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-chacha-muted text-xs">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}