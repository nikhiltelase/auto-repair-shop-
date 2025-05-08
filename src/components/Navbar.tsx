import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from "../images/logo-removebg-preview.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const carX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const carRotate = useTransform(scrollYProgress, [0, 0.1], [0, -5]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Partners', href: '#partners' },
    { name: 'Contact', href: '#contact' },
  ];

  const CarAnimation = () => (
    <motion.div
      className="absolute bottom-0 left-0 w-full h-1 overflow-hidden"
      style={{ opacity: scrolled ? 1 : 0 }}
    >
      {/* Speed lines */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-accent-500/30"
          style={{
            left: `${i * 10}%`,
            width: "50px",
            opacity: scrolled ? 1 : 0,
          }}
          animate={{
            x: [-50, window.innerWidth],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "linear",
          }}
        />
      ))}

      {/* Car animation */}
      <motion.div
        className="absolute bottom-1 h-8"
        style={{ x: carX, rotate: carRotate }}
      >
        <svg width="60" height="20" viewBox="0 0 60 20" className="fill-accent-500">
          <motion.path
            d="M5,15 L10,15 C15,15 20,12 25,12 L35,12 C40,12 45,15 50,15 L55,15 C57,15 58,14 58,12 L58,10 C58,8 57,7 55,7 L50,7 C45,7 40,4 35,4 L25,4 C20,4 15,7 10,7 L5,7 C3,7 2,8 2,10 L2,12 C2,14 3,15 5,15 Z"
          />
          {/* Wheels */}
          <motion.circle
            cx="20"
            cy="15"
            r="3"
            className="fill-gray-800"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="40"
            cy="15"
            r="3"
            className="fill-gray-800"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {/* Headlight glow */}
          <motion.circle
            cx="55"
            cy="11"
            r="2"
            className="fill-yellow-500/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass backdrop-blur-lg bg-black/30 py-1 shadow-lg border-b border-accent-500/20' 
          : 'bg-transparent py-2'
      }`}
    >
      {/* Add car animation */}
      <CarAnimation />
      
      <nav className="container mx-auto px-4 -m-8 flex justify-between items-center">
        <motion.a 
          href="#home" 
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img 
            src={logo} 
            alt="Leslie Auto Performance Logo" 
            className="h-40 w-auto drop-shadow-2xl filter brightness-125 contrast-125"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.li
              key={link.name}
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <a
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors hover:text-accent-500"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 transform scale-x-0 transition-transform group-hover:scale-x-100" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 backdrop-blur-lg bg-black/80 z-50 md:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="h-full flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-white focus:outline-none"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
              <ul className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <a
                      href={link.href}
                      className="text-3xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;