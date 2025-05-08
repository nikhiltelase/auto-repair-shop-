import { motion } from 'framer-motion';
import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  from = '#fff',
  to = '#fff',
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
      }}
      whileHover={{
        backgroundImage: `linear-gradient(to right, ${to}, ${from})`,
      }}
    >
      {children}
    </motion.span>
  );
};
