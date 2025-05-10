import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, Wrench, Shield, Car, Award, CheckCircle } from 'lucide-react';
import uberImg from '../assets/images/certifications/uber.jpg';
import lyftImg from '../assets/images/certifications/lyft.jpg'; 
import ontarioImg from '../assets/images/certifications/ontario.jpg';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const certificationImages = import.meta.glob('../assets/images/certifications/*.{png,jpg,jpeg,svg}', { eager: true });

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
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const features = [
    'Full-Service Automotive Facility with 7 Service Bays',
    'Licensed & Experienced Mechanics',
    'Certified Safety Inspection Facility',
    'European & Exotic Car Specialists',
    'Advanced Diagnostics Equipment',
    'Custom Performance Builds',
  ];

  const statsData = [
    { icon: Wrench, value: '7', label: 'Service Bays' },
    { icon: Shield, value: '100%', label: 'Certified' },
    { icon: Car, value: '1000+', label: 'Cars Serviced' },
    { icon: Award, value: '15+', label: 'Years Experience' },
  ];

  const certifications = Object.entries(certificationImages).map(([path, module]: [string, any]) => ({
    name: path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '',
    image: module.default
  }));

  return (
    <section id="about" className="py-8 sm:py-16 md:py-24 lg:py-32 relative bg-gradient-to-b from-black to-gray-900">
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80')] bg-fixed bg-cover bg-center opacity-5"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-16">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="w-full lg:w-1/2 space-y-4 sm:space-y-6 md:space-y-8"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-white tracking-tight"
            >
              Leslie Auto <span className="text-accent-500">Performance</span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants} 
              className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 font-light"
            >
              Located in the heart of Ajax, Ontario, we take pride in being a full-service automotive facility. 
              Our state-of-the-art shop features 7 fully equipped service bays, handling everything from routine 
              maintenance to advanced diagnostics and performance builds.
            </motion.p>

            <motion.div 
              variants={scaleIn} 
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(var(--accent-500), 0.1)",
                  }}
                  className="p-3 sm:p-4 md:p-6 rounded-xl border border-gray-800 bg-black/40 backdrop-blur-sm transform transition-all duration-300"
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent-500 mb-2 sm:mb-3 md:mb-4" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-6 sm:mt-8 md:mt-12"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-white"
              >
                Official <span className="text-accent-500">Certifications</span>
              </motion.h3>
              
              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
              >
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col items-center p-4 sm:p-6 rounded-xl border border-gray-800 bg-black/40 backdrop-blur-sm hover:border-accent-500/30 transition-colors duration-300"
                  >
                    <div className="w-full aspect-square flex justify-center items-center bg-gradient-to-r from-gray-900 to-black rounded-xl mb-3 sm:mb-4 p-4 overflow-hidden">
                      <motion.div
                        className="relative w-full h-full flex justify-center items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img 
                          src={cert.image} 
                          alt={`${cert.name} Certification`} 
                          className="w-full h-40  object-contain filter brightness-125 contrast-125" 
                          
                        />
                      </motion.div>
                    </div>
                    <span className="text-accent-500 font-medium text-xs sm:text-sm text-center capitalize">
                      {cert.name.split('-').join(' ')} Certification
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    x: 5,
                    backgroundColor: "rgba(var(--accent-500), 0.05)",
                  }}
                  className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg border border-gray-800/50 hover:border-accent-500/50 transition-all duration-300"
                >
                  <CheckCircle2 className="text-accent-500 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-gray-300 font-medium">{feature}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="mb-8 relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-900/20 mix-blend-overlay"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <img
                src='https://pbs.twimg.com/media/Gqa5qO1WMAA9BqO?format=jpg&name=900x900'
                alt="Performance car showcase" 
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover transform transition-transform duration-700 hover:scale-105"
              />
              <motion.div
                className="absolute inset-0 border border-accent-500/20 rounded-xl md:rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(var(--accent-500), 0.2)',
                    '0 0 40px rgba(var(--accent-500), 0.4)',
                    '0 0 20px rgba(var(--accent-500), 0.2)'
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative rounded-xl overflow-hidden border-2 border-accent-500/50 p-1"
            >
              <div className="bg-black/80 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Shield className="text-accent-500 w-5 h-5 mr-2" />
                    <h4 className="text-lg font-semibold text-white">Certified Inspection Station</h4>
                  </div>
                  <div className="flex space-x-2">
                    <motion.div 
                      animate={floatingAnimation}
                      className="w-12 h-12 rounded-xl bg-black/60 p-2 flex items-center justify-center border border-gray-800"
                    >
                      <img 
                        src={uberImg} 
                        alt="" 
                        className="w-full h-full object-contain filter brightness-125" 
                      />
                    </motion.div>
                    <motion.div 
                      animate={floatingAnimation}
                      transition={{ delay: 0.2 }}
                      className="w-12 h-12 rounded-xl bg-black/60 p-2 flex items-center justify-center border border-gray-800"
                    >
                      <img 
                        src={lyftImg} 
                        alt="Lyft" 
                        className="w-full h-full object-contain filter brightness-125" 
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-gradient-to-b from-green-900/20 to-green-900/10 border border-green-800/30">
                    <img 
                      src={ontarioImg} 
                      alt="Ontario Safety Certification" 
                      className="h-12 object-contain"
                    />
                  </div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div className="flex items-center">
                      <CheckCircle size={14} className="text-accent-500 mr-2" />
                      <span>Licensed by the Ministry of Transportation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} className="text-accent-500 mr-2" />
                      <span>Official Uber & Lyft Safety Provider</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} className="text-accent-500 mr-2" />
                      <span>Complete Ontario Safety Standards Certification</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;