import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const partnerLogos = [
  {
    name: 'Partner 1',
    image: 'https://pbs.twimg.com/media/GqZ39D1XAAAbIKv?format=jpg&name=small'
  },
  {
    name: 'Partner 2',
    image: 'https://pbs.twimg.com/media/GqZ4H4cW0AAGxBX?format=jpg&name=small'
  },
  {
    name: 'Extra 1',
    image: 'https://pbs.twimg.com/media/GqZ39D1XAAAbIKv?format=jpg&name=small'
  },
  {
    name: 'Extra 2',
    image: 'https://pbs.twimg.com/media/GqZ4H4cW0AAGxBX?format=jpg&name=small'
  },
];

// Duplicate the logos for continuous scroll effect
const extendedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

const Partners = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <section id="partners" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We work with the best brands in the automotive industry
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative overflow-hidden py-8 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-gradient-to-l after:from-black after:to-transparent"
        >
          <div className="flex animate-marquee">
            {extendedLogos.map((logo, index) => (
              <div
                key={index}
                className="mx-8 flex min-w-[140px] items-center justify-center"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-12  md:h-40 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Extra service showcase images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-md overflow-hidden group"
          >
            <img 
              src="https://pbs.twimg.com/media/GqZ4bDEWAAAaz-T?format=jpg&name=360x360" 
              alt="Performance Service" 
              className="w-full h-64  object-fill transition-transform duration-700 group-hover:scale-110"
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
              className="w-full h-64 object-fill transition-transform duration-700 group-hover:scale-110"
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
              className="w-full h-64 object-fill transition-transform duration-700 group-hover:scale-110"
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
              className="w-full h-64 object-fill transition-transform duration-700 group-hover:scale-110"
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