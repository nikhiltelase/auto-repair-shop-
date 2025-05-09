import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from "../assets/images/logo-removebg-preview.png";

// Throttle function for scroll handling
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Lazy load the mobile menu
const MobileMenu = lazy(() => import('./MobileMenu'));

const Navbar = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Partners', href: '#partners' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled 
          ? 'bg-black/30 backdrop-blur-lg py-1 shadow-md border-b border-accent-500/20' 
          : 'bg-transparent py-2'
      }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <img 
            src={logo} 
            alt="Leslie Auto Performance Logo" 
            className=" h-36 -m-10 ml-1 md:h-36 md:-m-5 w-auto object-contain max-w-none"
            loading="eager"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              <a
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors hover:text-accent-500"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500 transform scale-x-0 transition-transform group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2 rounded-md bg-accent-500/10"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <Suspense fallback={<div className="fixed inset-0 top-16 bg-black/95" />}>
            <MobileMenu navLinks={navLinks} onClose={() => setIsOpen(false)} />
          </Suspense>
        )}
      </nav>
    </header>
  );
});

export default Navbar;