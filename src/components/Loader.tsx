import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../images/logo-removebg-preview.png';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center relative"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute w-full h-full bg-accent-500/20 blur-3xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Car animation */}
        <motion.div
          className="relative w-96 h-48 mb-8"
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Smoke particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-8 bottom-12 w-2 h-2 rounded-full bg-gray-500/30"
              animate={{
                x: [-10, -50],
                y: [-10, -30],
                opacity: [0, 0.5, 0],
                scale: [1, 2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Car body */}
          <motion.svg
            viewBox="0 0 100 40"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Car chassis */}
            <motion.path
              d="M5,25 L20,25 C25,25 30,20 35,20 L65,20 C70,20 75,25 80,25 L95,25 C97,25 98,23 98,21 L98,19 C98,17 97,15 95,15 L80,15 C75,15 70,10 65,10 L35,10 C30,10 25,15 20,15 L5,15 C3,15 2,17 2,19 L2,21 C2,23 3,25 5,25 Z"
              fill="url(#car-gradient)"
              stroke="#fff"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Wheels */}
            {[30, 70].map((cx, i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy="25"
                r="5"
                fill="#333"
                stroke="#fff"
                strokeWidth="0.5"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformOrigin: `${cx}px 25px` }}
              />
            ))}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="car-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-500)', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: 'var(--accent-500)', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-500)', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Enhanced progress bar */}
        <div className="w-64 h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-500/50 via-accent-500 to-accent-500/50"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            style={{
              boxShadow: '0 0 20px var(--accent-500)',
            }}
          />
        </div>
        <motion.p
          className="mt-4 text-gray-400 font-mono"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Loading... {progress}%
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;