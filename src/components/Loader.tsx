import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../images/logo-removebg-preview.png'

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
        className="flex flex-col items-center"
      >
        <img
          src={logo}
          alt="Logo"
          className=" h-60 w-auto"
        />
        
        <div className="w-64 h-1 bg-gray-800 rounded-full  -mt-12 overflow-hidden">
          <motion.div
        className="h-full bg-accent-500 loader"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
          />
        </div>
        <p className="-mt-5 text-gray-400 text-sm">{progress}%</p>
      </motion.div>
    </div>
  );
};

export default Loader;