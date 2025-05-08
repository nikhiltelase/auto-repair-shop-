"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ChevronUp, Sparkles } from "lucide-react"

export default function BookNowButton() {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const floatingAnimation = {
    y: [-4, 4, -4],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const particleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1.5],
      opacity: [1, 0],
      transition: {
        duration: 1.5,
        ease: "easeOut",
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              ...floatingAnimation
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ 
              scale: 1.15,
              boxShadow: "0 0 20px rgba(255,255,255,0.3)"
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-800 text-white p-3 rounded-full shadow-lg transition-shadow duration-300"
          >
            <ChevronUp size={20} />
          </motion.button>

          <div className="relative">
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute bottom-full mb-2 right-0 bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
              >
                <motion.span
                  animate={{ 
                    color: ["#000", "#ff0000", "#000"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Book your appointment now!
                </motion.span>
                <motion.div 
                  className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"
                  animate={{ rotate: [45, 45] }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                ...floatingAnimation
              }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255,0,0,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 relative overflow-hidden transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Calendar size={18} />
              </motion.div>
              <span className="font-medium relative z-10">Book Now</span>
              
              {/* Enhanced pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-red-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />

              {/* Particle effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: i * 0.3, repeat: Infinity }}
                  className="absolute w-2 h-2 bg-red-400 rounded-full"
                  style={{
                    left: `${30 * i}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}

              {/* Gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-400/30 to-red-600/0"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.a>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
