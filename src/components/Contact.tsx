import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
  };

  const iconAnimation = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-gray-950">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black to-gray-950 z-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-500 via-primary-500 to-accent-500 bg-clip-text text-transparent bg-[size:200%]"
            animate={{
              backgroundPosition: ['0%', '200%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Contact Us
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Get in touch with our expert team
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate={controls} className="space-y-8">
            {[
              { icon: MapPin, title: "Our Location", content: "232 Fairall St unit 2B, Ajax, ON L1S 1R6" },
              { icon: Phone, title: "Phone", content: "(905) 555-1234" },
              { icon: Mail, title: "Email", content: "info@leslieautoperformance.com" },
              { icon: Clock, title: "Hours", content: ["Monday-Friday: 8am - 6pm", "Saturday: 9am - 4pm", "Sunday: Closed"] }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-start group"
              >
                <motion.div
                  className="bg-accent-500/10 p-3 rounded-md mr-4 group-hover:bg-accent-500/20 transition-colors duration-300"
                  variants={iconAnimation}
                  whileHover="hover"
                >
                  <item.icon className="w-6 h-6 text-accent-500" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  {Array.isArray(item.content) ? (
                    item.content.map((line, idx) => <p key={idx} className="text-gray-400">{line}</p>)
                  ) : (
                    <p className="text-gray-400">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 shadow-xl"
            whileHover={{ boxShadow: "0 0 30px rgba(var(--accent-500), 0.2)" }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 transform-gpu"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 transform-gpu"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  rows={4}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 transform-gpu"
                ></motion.textarea>
              </div>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(var(--accent-500), 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-accent-500 to-primary-500 text-black font-bold py-3 px-6 rounded-md relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
                <span className="relative z-10">Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;