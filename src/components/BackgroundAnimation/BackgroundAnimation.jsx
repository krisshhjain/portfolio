import React from 'react';
import { motion } from 'framer-motion';
import './BackgroundAnimation.scss';

const BackgroundAnimation = () => {
  return (
    <div className="background-animation">
      {/* Floating geometric shapes */}
      <motion.div
        className="floating-shape shape-1"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="floating-shape shape-2"
        animate={{
          y: [20, -30, 20],
          x: [-10, 10, -10],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="floating-shape shape-3"
        animate={{
          y: [-30, 15, -30],
          x: [15, -15, 15],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grid pattern */}
      <div className="grid-pattern">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="grid-dot"
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="gradient-orb orb-1"
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="gradient-orb orb-2"
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Scanning lines */}
      <motion.div
        className="scan-line"
        animate={{
          y: [-100, window.innerHeight + 100],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
