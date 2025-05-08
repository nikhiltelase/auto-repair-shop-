"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ChevronUp } from "lucide-react"

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

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
          {/* Scroll to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-800 text-white p-3 rounded-full shadow-lg"
          >
            <ChevronUp size={20} />
          </motion.button>

          {/* Book now button with tooltip */}
          <div className="relative">
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full mb-2 right-0 bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
              >
                Book your appointment now!
                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
              </motion.div>
            )}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 relative overflow-hidden"
            >
              <Calendar size={18} />
              <span className="font-medium">Book Now</span>

              {/* Animated pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-red-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </motion.a>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
