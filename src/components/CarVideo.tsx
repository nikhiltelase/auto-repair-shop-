import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import videoSrc from "../assets/videos/WhatsApp Video 2025-05-08 at 21.04.05_8799cf46.mp4"

export default function VideoDisplay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(error => console.log("Video autoplay failed:", error))
    }
  }, [])

  return (
    <section ref={containerRef} className="h-[100svh] relative overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 z-0" />

      {/* Section title */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, 1]) }}
        className="absolute top-8 sm:top-12 md:top-16 left-0 right-0 text-center z-10 px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-wider text-white drop-shadow-lg">
          EXPERIENCE THE DIFFERENCE
        </h2>
        <p className="text-gray-200 mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          Precision engineering meets automotive passion
        </p>
      </motion.div>

      {/* Video Display */}
      <motion.div 
        style={{ 
          opacity, 
          scale,
          filter: "brightness(0.8) contrast(1.1)"
        }} 
        className="absolute inset-0 flex items-center justify-center z-0"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          poster="/video-poster.jpg"
        />
      </motion.div>
    </section>
  )
}
