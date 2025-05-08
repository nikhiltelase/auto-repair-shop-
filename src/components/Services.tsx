import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Car, Gauge, Disc, Activity, LayoutGrid, File as Oil, Mic2 } from 'lucide-react';

const serviceData = [
  {
    title: 'Customization',
    description: 'Custom body kits, interior modifications, and personalized styling solutions.',
    icon: <LayoutGrid className="w-8 h-8 text-accent-500" />,
  },
  {
    title: 'Maintenance',
    description: 'Regular maintenance and preventive care to keep your vehicle in top condition.',
    icon: <Wrench className="w-8 h-8 text-accent-500" />,
  },
  {
    title: 'Performance',
    description: 'Performance upgrades to enhance your vehicle\'s power, handling, and capabilities.',
    icon: <Car className="w-8 h-8 text-accent-500" />,
  },
  {
    title: 'Wheels / Tires',
    description: 'Premium wheel and tire packages tailored to your vehicle and driving style.',
    icon: <Disc className="w-8 h-8 text-accent-500" />,
  },
  {
    title: 'Brakes',
    description: 'High-performance brake systems for improved stopping power and safety.',
    icon: <Activity className="w-8 h-8 text-accent-500" />,
  },
  {
    title: 'Suspension',
    description: 'Custom suspension setups for optimal handling and ride comfort.',
    icon: <Gauge className="w-8 h-8 text-accent-500" />,
  },
  {
    title: 'Oil / Filter',
    description: 'Premium oil changes and filter replacements using high-quality products.',
    icon: <Oil className="w-8 h-8 text-accent-500" />,
  },
  {
    title: 'ECU Tuning',
    description: 'Professional ECU tuning for optimized performance and efficiency.',
    icon: <Mic2 className="w-8 h-8 text-accent-500" />,
  },
];

const ServiceCard = ({ service, index }: { service: typeof serviceData[0], index: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { 
      y: 100,
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-900 p-6 rounded-md service-card border border-gray-800 hover:border-accent-500 transition-colors duration-300"
    >
      <motion.div 
        className="mb-4"
        whileHover={{ 
          rotate: 360,
          scale: 1.2,
          transition: { duration: 0.6 }
        }}
      >
        {service.icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-400">{service.description}</p>
    </motion.div>
  );
};

const Services = () => {
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

  const titleVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.17, 0.67, 0.83, 0.67],
        when: "beforeChildren",
        staggerChildren: 0.2
      },
    },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.5
      }
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black z-0"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(var(--accent-500), 0.1) 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 }
              }
            }}
          >
            Premium automotive services delivered with precision and expertise
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;