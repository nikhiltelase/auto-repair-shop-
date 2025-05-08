import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import BookNowButton from './components/BookNowButton';
import Car3DModel from './components/3d/Car3DModel';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-black text-white min-h-screen"
    >
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Car3DModel />
        <About />
        <Partners />
        <Contact />
        <BookNowButton />
        
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;