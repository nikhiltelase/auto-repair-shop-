import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black relative pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center mb-6">
              <img 
                src="https://pbs.twimg.com/media/GqZ1YMWW8AAN8VH?format=jpg&name=900x900" 
                alt="Leslie Auto Performance Logo" 
                className="h-40 w-auto"
              />
            </a>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium automotive services with a focus on quality, precision, and customer satisfaction. 
              From routine maintenance to custom performance builds.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: '#f97316' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: '#f97316' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: '#f97316' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: '#f97316' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#partners" className="text-gray-400 hover:text-white transition-colors">Partners</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Customization</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Performance</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Maintenance</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">ECU Tuning</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Safety Inspections</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Leslie Auto Performance. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            className="bg-gray-900 p-3 rounded-full"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="text-accent-500" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;