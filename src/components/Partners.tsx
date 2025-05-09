import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Use Vite's import.meta.glob to import all images
const images = import.meta.glob('../assets/images/brand-parterns/*.{png,jpg,jpeg,svg}', { eager: true });
console.log(images);

const partnerLogos = Object.entries(images).map(([path, module]: [string, any]) => ({
  name: path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '',
  image: module.default
}));
console.log(partnerLogos);

const Partners = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + itemsPerSlide >= partnerLogos.length ? 0 : prev + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev - itemsPerSlide < 0 ? partnerLogos.length - itemsPerSlide : prev - itemsPerSlide
    );
  };

  // Add auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section id="partners" className="py-12 md:py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Our Partners</h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            We work with the best brands in the automotive industry
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative overflow-hidden py-4 md:py-8"
        >
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-black/70 hover:bg-black/90 p-2 md:p-3 rounded-r transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <div className="flex transition-transform duration-500 ease-in-out" 
               style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` }}>
            {partnerLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-2 md:px-4"
              >
                <div className="bg-gray-900/50 rounded-lg p-4 md:p-6 hover:bg-gray-900/70 transition-all duration-300">
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="h-24 md:h-32 w-auto object-contain mx-auto filter hover:brightness-110 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-black/70 hover:bg-black/90 p-2 md:p-3 rounded-l transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </motion.div>

        <div className="mt-12 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-md overflow-hidden group"
          >
            <img 
              src="https://pbs.twimg.com/media/GqZ4bDEWAAAaz-T?format=jpg&name=360x360" 
              alt="Performance Service" 
              className="w-full h-64 object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
           
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-md overflow-hidden group"
          >
            <img 
              src="https://pbs.twimg.com/media/GqZ4jJCXkAAWGS1?format=jpg&name=small" 
              alt="Custom Work" 
              className="w-full h-64 object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
              
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-md overflow-hidden group"
          >
            <img 
              src="https://pbs.twimg.com/media/GqZ4ouhXcAAGy1I?format=jpg&name=small" 
              alt="Wheel Service" 
              className="w-full h-64 object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
             
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative rounded-md overflow-hidden group"
          >
            <img 
              src="https://pbs.twimg.com/media/GqZ4ubQWUAA-iZG?format=jpg&name=small" 
              alt="Interior Work" 
              className="w-full h-64 object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;