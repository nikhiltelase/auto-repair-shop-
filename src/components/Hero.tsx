import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';


const carSlides = [
  {
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    title: 'PERFORMANCE',
    subtitle: 'Unleash Your Car\'s Potential',
  },
  {
    image: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg',
    title: 'PRECISION',
    subtitle: 'Expert Craftsmanship',
  },
  {
    image: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg',
    title: 'PERFECTION',
    subtitle: 'Every Detail Matters',
  },
];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carSlides.length);
    }, 5000);

    // GSAP animations
    gsap.from('.hero-title', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
      delay: 0.5
    });

    gsap.from('.hero-subtitle', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: 'power4.out',
      delay: 0.8
    });

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carSlides.length) % carSlides.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-center items-center pt-16 md:pt-20 overflow-hidden"
    >
      {/* Background slider with enhanced overlay */}
      <div className="absolute inset-0 bg-black z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${carSlides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-8 relative px-2 sm:px-4 w-full max-w-4xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 md:mb-4 tracking-tight leading-tight">
                {carSlides[currentSlide].title}
                <span className="hero-subtitle block text-accent-500 mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                  {carSlides[currentSlide].subtitle}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
          
          <motion.p 
            className="text-base md:text-lg text-gray-300 max-w-xs md:max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Premium automotive services and customization in Ajax, Ontario.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full max-w-sm md:max-w-none mx-auto px-6 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto text-center bg-accent-500 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-accent-600 shadow-lg hover:shadow-xl hover:shadow-accent-500/30 text-base tracking-wider uppercase"
            >
              Explore Services
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto text-center bg-white/10 backdrop-blur text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-white/20 shadow-lg hover:shadow-xl hover:shadow-white/10 text-base tracking-wider uppercase border border-white/20"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced slider controls */}
      <div className="absolute top-1/2 hidden md:flex left-4 right-4 justify-between items-center z-20 -translate-y-1/2">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)" }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)" }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Mobile-optimized slide indicators */}
      <div className="absolute bottom-24 sm:bottom-20 left-0 right-0 flex justify-center gap-3 px-4">
        {carSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-accent-500 w-8 sm:w-12' 
                : 'bg-white/30 w-4 sm:w-6 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
        >
          <ChevronDown size={24} className="text-accent-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;