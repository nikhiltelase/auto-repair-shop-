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

  return (
    <section id="contact" className="py-24 relative bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-950 z-0"></div>
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
            className="text-4xl md:text-5xl font-bold mb-4"
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="flex items-start">
              <div className="bg-accent-500/10 p-3 rounded-md mr-4">
                <MapPin className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Our Location</h3>
                <p className="text-gray-400">232 Fairall St unit 2B, Ajax, ON L1S 1R6</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start">
              <div className="bg-accent-500/10 p-3 rounded-md mr-4">
                <Phone className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Phone</h3>
                <p className="text-gray-400">(905) 555-1234</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start">
              <div className="bg-accent-500/10 p-3 rounded-md mr-4">
                <Mail className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email</h3>
                <p className="text-gray-400">info@leslieautoperformance.com</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start">
              <div className="bg-accent-500/10 p-3 rounded-md mr-4">
                <Clock className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Hours</h3>
                <p className="text-gray-400">Monday-Friday: 8am - 6pm</p>
                <p className="text-gray-400">Saturday: 9am - 4pm</p>
                <p className="text-gray-400">Sunday: Closed</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900 p-8 rounded-lg border border-gray-800"
          >
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent-500 text-black font-bold py-3 px-6 rounded-md transition-all hover:bg-accent-600"
                type="button"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;