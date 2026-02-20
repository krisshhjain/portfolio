import React from 'react';
import { motion } from 'framer-motion';

// Animate sections only ONCE when they first scroll into view (downward).
// Using viewport: { once: true } prevents re-triggering when scrolling back up.
const MotionWrap = (Component, classNames) => function HOC() {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${classNames} `}
    >
      <Component />
    </motion.div>
  );
};

export default MotionWrap;
