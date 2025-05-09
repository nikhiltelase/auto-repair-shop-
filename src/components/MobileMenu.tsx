import React from 'react';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  navLinks: Array<{ name: string; href: string }>;
  onClose: () => void;
}

const MobileMenu = ({ navLinks, onClose }: MobileMenuProps) => {
  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      
      {/* Menu */}
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={menuVariants}
        className="fixed right-0 top-0 h-[calc(100vh-4rem)] w-[300px] bg-black/95 backdrop-blur-lg lg:hidden"
      >
        <nav className="h-full flex flex-col">
          <ul className="flex flex-col items-start justify-center h-full space-y-8 px-8">
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                variants={itemVariants}
                className="w-full border-b border-accent-500/20"
              >
                <a
                  href={link.href}
                  className="text-xl font-medium tracking-wide block py-2 hover:text-accent-500 transition-colors"
                  onClick={onClose}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

export default React.memo(MobileMenu);
