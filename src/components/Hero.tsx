import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


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
      className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden"
    >
      {/* Background slider */}
      <div className="absolute inset-0 bg-black z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 5, scale: 1.1 }}
            animate={{ opacity: 10, scale: 1 }}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-8 relative"
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
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 tracking-tight">
                {carSlides[currentSlide].title}
                <span className="block text-accent-500 mt-2">
                  {carSlides[currentSlide].subtitle}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Premium automotive services and customization in Ajax, Ontario.
          </motion.p>
          
          <motion.div className="flex justify-center gap-4">
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-accent-500 text-white font-bold py-3 px-8 rounded-sm transition-all hover:bg-accent-600"
            >
              EXPLORE SERVICES
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-black font-bold py-3 px-8 rounded-sm transition-all hover:bg-gray-100"
            >
              CONTACT US
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Slider controls */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center z-20 -translate-y-1/2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={32} className="text-accent-500" />
        </motion.div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
        {carSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-accent-500 w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;