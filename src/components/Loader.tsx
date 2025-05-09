import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center relative px-4"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute w-full h-full bg-accent-500/20 blur-[50px] md:blur-[100px]"
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Spanner animation */}
        <motion.div
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-6 md:mb-8"
          animate={{
            rotate: [-30, 30, -30]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(var(--accent-500-rgb),0.5)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" 
                  className="stroke-accent-500"/>
          </motion.svg>
        </motion.div>

        {/* Enhanced progress bar */}
        <div className="w-48 sm:w-56 md:w-64 h-1.5 md:h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-500/40 via-accent-500 to-accent-500/40"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            style={{
              boxShadow: '0 0 25px var(--accent-500)',
            }}
          />
        </div>
        <motion.p
          className="mt-3 md:mt-4 text-sm md:text-base text-gray-400 font-mono tracking-wider"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading... {progress}%
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;