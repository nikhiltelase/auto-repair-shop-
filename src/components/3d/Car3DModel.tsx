"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { Vector3 } from "three"

// Custom sports car model using Three.js primitives
function SportsCar({ scrollYProgress }) {
  const group = useRef()
  const { viewport } = useThree()

  // Create rotation animation based on scroll
  const rotY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2])
  const posY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = rotY.get()
      group.current.position.y = posY.get()

      // Add subtle floating animation
      group.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01
    }
  })

  return (
    <group ref={group} position={[0, 0, 0]} scale={1}>
      {/* Car body - main chassis */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[4, 0.8, 2]} />
        <meshStandardMaterial color="#cc0000" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Car hood/front */}
      <mesh position={[1.8, 0.4, 0]} castShadow>
        <boxGeometry args={[1, 0.5, 1.8]} />
        <meshStandardMaterial color="#cc0000" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Car cabin/cockpit */}
      <mesh position={[-0.5, 0.9, 0]} castShadow>
        <boxGeometry args={[2, 0.7, 1.7]} />
        <meshStandardMaterial color="#cc0000" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.7, 0.9, 0]} rotation={[0, 0, Math.PI * 0.1]} castShadow>
        <boxGeometry args={[0.7, 0.7, 1.65]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} opacity={0.7} transparent />
      </mesh>

      {/* Rear */}
      <mesh position={[-2, 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, 0.6, 1.9]} />
        <meshStandardMaterial color="#cc0000" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <mesh position={[1.5, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[1.5, 0, -1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-1.5, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-1.5, 0, -1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Headlights */}
      <mesh position={[2.3, 0.4, 0.6]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[2.3, 0.4, -0.6]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.3, 0.5, 0.6]} castShadow>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-2.3, 0.5, -0.6]} castShadow>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>

      {/* Ground reflection effect */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.2} opacity={0.3} transparent />
      </mesh>
    </group>
  )
}

function Effects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      <ChromaticAberration offset={new Vector3(0.0005, 0.0005, 0.0005)} />
    </EffectComposer>
  )
}

export default function Car3DModel() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section ref={containerRef} className="h-screen relative overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-black to-black z-0" />

      {/* Section title */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, 1]) }}
        className="absolute top-10 left-0 right-0 text-center z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold">EXPERIENCE THE DIFFERENCE</h2>
        <p className="text-gray-400 mt-2">Precision engineering meets automotive passion</p>
      </motion.div>

      {/* 3D Car Model */}
      <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#ff0000" />
          <SportsCar scrollYProgress={scrollYProgress} />
          <ContactShadows
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.5, 0]}
            opacity={0.5}
            width={15}
            height={15}
            blur={2.5}
            far={1.5}
          />
          <Environment preset="night" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!isMobile}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          <Effects />
        </Canvas>
      </motion.div>
    </section>
  )
}
