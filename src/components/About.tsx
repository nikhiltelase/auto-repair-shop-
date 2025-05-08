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
        staggerChildren: 0.2,
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
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80')] bg-fixed bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        

        {/* Rest of the content */}
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

            {/* Stats Section */}
            <motion.div 
              variants={scaleIn}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/40 p-4 rounded-lg border border-accent-500/20 backdrop-blur-sm"
                >
                  <stat.icon className="w-6 h-6 text-accent-500 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-black/20 p-3 rounded-lg"
                >
                  <CheckCircle2 className="text-accent-500 w-5 h-5 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-300">{feature}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative overflow-hidden rounded-md shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/30 to-primary-900/30 mix-blend-multiply rounded-md"></div>
              <img
              src='https://sdmntprwestus3.oaiusercontent.com/files/00000000-b638-61fd-ad82-14e67db5e400/raw?se=2025-05-08T09%3A43%3A22Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-08T01%3A53%3A32Z&ske=2025-05-09T01%3A53%3A32Z&sks=b&skv=2024-08-04&sig=0FCRp21bCUFqOPMQsmyhPzYJcb8D9w/8i2R/rO4DVQQ%3D' 
                alt="Performance car showcase" 
                className="w-full h-[500px] object-cover rounded-md"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 p-4 rounded-md">
                <p className="text-sm text-gray-300">Featured: Custom-tuned Sports Cars</p>
              </div>
              <div className="absolute inset-0 border border-white/10 rounded-md"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;