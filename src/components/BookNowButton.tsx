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
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3 md:gap-4">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-900 text-white p-2 md:p-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
          >
            <ChevronUp size={16} className="md:w-5 md:h-5" />
          </motion.button>

          <div className="relative">
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 right-0 bg-white text-gray-800 px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-lg text-xs md:text-sm whitespace-nowrap"
                >
                  <span className="font-medium">Schedule Your Appointment</span>
                  <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.a
              href="#contact"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-[length:200%_100%] hover:bg-[100%] text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-md hover:shadow-xl flex items-center gap-2 relative overflow-hidden transition-all duration-500 text-sm md:text-base animate-pulse-subtle"
            >
              <Calendar size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="font-semibold relative z-10">Book Now</span>
            </motion.a>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
