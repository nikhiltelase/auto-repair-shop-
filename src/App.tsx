import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Partners = lazy(() => import('./components/Partners'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Loader = lazy(() => import('./components/Loader'));
const BookNowButton = lazy(() => import('./components/BookNowButton'));
const VideoDisplay = lazy(() => import('./components/CarVideo'));
const Gallery = lazy(() => import('./components/Gallery'));

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
      <Suspense fallback={<Loader />}>
        <main>
          <Hero />
          <VideoDisplay />
          <Services />
          <About />
          <Gallery />
          <Partners />
          <Contact />
          <BookNowButton />
        </main>
        <Footer />
      </Suspense>
    </motion.div>
  );
}

export default App;