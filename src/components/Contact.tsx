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
    <section id="contact" className="py-12 md:py-24 relative bg-gray-950">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black to-gray-950 z-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-8 md:mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-accent-500 via-primary-500 to-accent-500 bg-clip-text text-transparent bg-[size:200%]"
            animate={{
              backgroundPosition: ['0%', '200%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Contact Us
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4"
          >
            Get in touch with our expert team
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div variants={containerVariants} initial="hidden" animate={controls} className="space-y-6 md:space-y-8">
            {[
              { icon: MapPin, title: "Our Location", content: "232 Fairall St unit 2B, Ajax, ON L1S 1R6" },
              { icon: Phone, title: "Phone", content: ["647-594-4201 (Sales and HR)", "647-575-9785 (Service)"] },
              { icon: Mail, title: "Email", content: "Leslieauto01@gmail.com" },
              { icon: Clock, title: "Hours", content: ["Monday-Friday: 9:30am - 7pm", "Saturday: 9am - 4pm", "Sunday: Closed"] }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-start space-x-4 group p-4 rounded-lg hover:bg-gray-900/30 transition-colors duration-300"
              >
                <motion.div
                  className="bg-accent-500/10 p-3 rounded-lg shrink-0 group-hover:bg-accent-500/20 transition-colors duration-300"
                  variants={iconAnimation}
                  whileHover="hover"
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                  {Array.isArray(item.content) ? (
                    <div className="space-y-1">
                      {item.content.map((line, idx) => (
                        <p key={idx} className="text-gray-400 text-sm md:text-base">{line}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm md:text-base break-words">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-800 shadow-xl"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transform-gpu text-sm md:text-base"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transform-gpu text-sm md:text-base"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  rows={4}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transform-gpu text-sm md:text-base"
                ></motion.textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold py-2.5 md:py-3 px-6 rounded-lg relative overflow-hidden shadow-lg hover:shadow-accent-500/25 transition-shadow"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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