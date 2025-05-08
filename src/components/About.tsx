import React, { useEffect, Suspense, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, Wrench, Shield, Car, Award } from 'lucide-react';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
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

  return (
    <section id="about" className="py-24 relative bg-black">
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80')] bg-fixed bg-cover bg-center opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:w-1/2"
          >
            <motion.h2 
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgb(var(--accent-500))",
              }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent"
            >
              Leslie Auto Performance
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-lg text-gray-300 mb-6"
            >
              Located in the heart of Ajax, Ontario, we take pride in being a full-service automotive facility. 
              Our state-of-the-art shop features 7 fully equipped service bays, handling everything from routine 
              maintenance to advanced diagnostics and performance builds.
            </motion.p>

            {/* Stats Section with enhanced animations */}
            <motion.div variants={scaleIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(var(--accent-500), 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/40 p-4 rounded-lg border border-accent-500/20 backdrop-blur-sm transform transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <stat.icon className="w-6 h-6 text-accent-500 mb-2" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="text-2xl font-bold text-white"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Features with enhanced animations */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    x: 10,
                    backgroundColor: "rgba(var(--accent-500), 0.1)",
                  }}
                  className="flex items-start bg-black/20 p-3 rounded-lg transition-colors duration-300"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle2 className="text-accent-500 w-5 h-5 mt-1 mr-2 flex-shrink-0" />
                  </motion.div>
                  <p className="text-gray-300">{feature}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Image section with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <motion.div 
              className="relative overflow-hidden rounded-md shadow-xl"
              animate={floatingAnimation}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-500/30 to-primary-900/30 mix-blend-multiply rounded-md"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <img
                src='https://pbs.twimg.com/media/Gqa5qO1WMAA9BqO?format=jpg&name=900x900'
                alt="Performance car showcase" 
                className="w-full h-[500px] object-cover rounded-md transform transition-transform duration-700 hover:scale-110"
              />
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-4 bg-black/70 p-4 rounded-md backdrop-blur-sm"
              >
                <p className="text-sm text-gray-300">Featured: Custom-tuned Sports Cars</p>
              </motion.div>
              <motion.div
                className="absolute inset-0 border border-white/10 rounded-md"
                animate={{
                  boxShadow: ['0 0 20px rgba(var(--accent-500), 0.2)', '0 0 40px rgba(var(--accent-500), 0.4)', '0 0 20px rgba(var(--accent-500), 0.2)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl z-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;