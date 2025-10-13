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

// ===== CONTACT INFO COMPONENT =====
const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/hassen-goumghar-profile23/",
    icon: "💼",
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "GitHub",
    url: "https://github.com/HassenGHR",
    icon: "💻",
    color: "from-gray-700 to-gray-900"
  },
  {
    name: "DataCamp",
    url: "https://www.datacamp.com/portfolio/goumhassan",
    icon: "📊",
    color: "from-green-600 to-teal-700"
  }
];

export const ContactInfo = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Get In{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Touch
          </span>
          <span className="text-purple-400">.</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Have a project in mind? Let's create something amazing together.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 mb-12"
      >
        {[
          { icon: "📧", title: "Email", value: "contact@example.com" },
          { icon: "📱", title: "Phone", value: "+213 XXX XXX XXX" },
          { icon: "📍", title: "Location", value: "Algiers, Algeria" }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all"
          >
            <div className="text-3xl">{item.icon}</div>
            <div>
              <div className="text-sm text-gray-400">{item.title}</div>
              <div className="text-white font-medium">{item.value}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-white text-xl font-bold mb-6">Connect With Me</h3>
        <div className="flex gap-4">
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
              <div className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-shadow`}>
                {social.icon}
              </div>
              <div className="text-xs text-center mt-2 text-gray-400 group-hover:text-white transition-colors">
                {social.name}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};



// ===== MAIN PAGE COMPONENT (Example Usage) =====
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info */}
          <ContactInfo />

          {/* Right Side - Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;