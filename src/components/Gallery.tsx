import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Use Vite's import.meta.glob to import all images
const images = import.meta.glob('../assets/images/gellary/*.{png,jpg,jpeg,svg}', { eager: true });
console.log(images);

const partnerLogos = Object.entries(images).map(([path, module]: [string, any]) => ({
  name: path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '',
  image: module.default
}));
console.log(partnerLogos);

const Gallery = () => {
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
    <section id="partners" className="py-12 md:py-24 relative bg-gradient-to-br from-gray-950 via-zinc-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.7)_0%,_transparent_70%)] opacity-70"></div>
      <div className="absolute inset-0 bg-grid-white/[0.01]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-8 md:mb-16"
        >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-zinc-600">Our Workplace</h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto px-4">
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
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-black/50 p-2 rounded-r block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
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
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-auto w-full max-w-[200px] md:max-w-[250px] object-contain mx-auto filter transition-all duration-300"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-black/50 p-2 rounded-l block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;