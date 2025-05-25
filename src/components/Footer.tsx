import React, { useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black relative pt-16 pb-8 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2"
          >
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-6"
            >
              <motion.img 
                src="https://pbs.twimg.com/media/GqZ1YMWW8AAN8VH?format=jpg&name=900x900" 
                alt="Leslie Auto Performance Logo" 
                className="h-40 w-auto"
                whileHover={{ filter: "brightness(1.2)" }}
              />
            </motion.a>
            
            <motion.p variants={itemVariants} className="text-gray-400 mb-6 max-w-md">
              Premium automotive services with a focus on quality, precision, and customer satisfaction. 
              From routine maintenance to custom performance builds.
            </motion.p>

            <motion.div className="flex space-x-4">
              {[
                { icon: Facebook, color: '#1877f2', link: 'https://www.facebook.com/share/16GZ3kthpD/' },
                { icon: Instagram, color: '#e4405f', link: 'https://www.instagram.com/leslieautoperformance' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link || "#"}
                  whileHover={{ 
                    y: -5,
                    scale: 1.2,
                    color: social.color,
                    boxShadow: `0 0 20px ${social.color}40`
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white p-2 rounded-full bg-gray-800/50 backdrop-blur-sm"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          {['Quick Links', 'Services'].map((title, index) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="relative"
            >
              <motion.h3 
                whileHover={{ color: 'var(--accent-500)' }}
                className="text-lg font-bold mb-4"
              >
                {title}
              </motion.h3>
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
              >
                {title === 'Quick Links' ? (
                  ['Home', 'Services', 'About', 'Partners', 'Contact'].map((link, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 5, color: 'var(--accent-500)' }}
                      className="transition-colors duration-200"
                    >
                      <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </motion.li>
                  ))
                ) : (
                  ['Customization', 'Performance', 'Maintenance', 'ECU Tuning', 'Safety Inspections'].map((service, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 5, color: 'var(--accent-500)' }}
                      className="transition-colors duration-200"
                    >
                      <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                        {service}
                      </a>
                    </motion.li>
                  ))
                )}
              </motion.ul>
            </motion.div>
          ))}
        </div>
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.p 
            variants={itemVariants}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} Leslie Auto Performance. All rights reserved.
          </motion.p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ 
              y: -5,
              boxShadow: '0 0 20px var(--accent-500)'
            }}
            className="bg-gray-900 p-3 rounded-full relative group overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-accent-500 opacity-0 group-hover:opacity-20 transition-opacity"
              animate={{
                scale: [1, 1.5, 1],
                transitionEnd: { display: "none" }
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <ArrowUp size={20} className="text-accent-500 relative z-10" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;