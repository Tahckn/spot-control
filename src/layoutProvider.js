'use client';
import { motion } from 'framer-motion';

export default function layoutProvider(children) {
  return (
    <motion.div
      initial={{ y: '-30%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout>
      {children}
    </motion.div>
  );
}
