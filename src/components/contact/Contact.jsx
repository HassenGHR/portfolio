import React, { useRef, useState, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { ContactForm } from "./Form";

// ===== STARS BACKGROUND COMPONENT =====
const Stars = (props) => {
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );
  const ref = useRef();
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  return (
    <div className='w-full h-full absolute inset-0 z-0'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

// ===== SOCIAL LINKS DATA =====
const socialLinks = [
  {
    name: "LinkedIn",
    url: import.meta.env.VITE_LINKEDIN_URL,
    icon: "💼",
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "GitHub",
    url: import.meta.env.VITE_GITHUB_URL,
    icon: "💻",
    color: "from-gray-700 to-gray-900"
  },
  {
    name: "DataCamp",
    url: import.meta.env.VITE_DATACAMP_URL,
    icon: "📊",
    color: "from-green-600 to-teal-700"
  }
];



// ===== MAIN PAGE COMPONENT =====
const ContactPage = () => {
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Animated Stars Background */}
      <StarsCanvas />

      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Get In{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Touch
            </span>
            <span className="text-purple-400">.</span>
          </h1>
        </motion.div>

        {/* Contact Form and Social Links Container */}
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-12"
          >
            <ContactForm />
          </motion.div>

          {/* Social Links Section - Below Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-white text-xl font-bold mb-8">Connect With Me</h3>
            <div className="flex gap-6 flex-wrap justify-center">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all duration-300`}>
                    {social.icon}
                  </div>
                  <div className="text-sm text-center mt-2 text-gray-400 group-hover:text-white transition-colors">
                    {social.name}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;