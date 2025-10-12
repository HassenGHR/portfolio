import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Parallax = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <div
      ref={ref}
      className="relative h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      {/* Animated stars layer */}
      <motion.div
        style={{ x: yBg, opacity }}
        className="absolute inset-0"
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${20 + i * 30}%`,
            left: '-10%',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            x: ['0vw', '120vw'],
            y: ['0vh', '40vh'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 4,
            repeat: Infinity,
            repeatDelay: 8,
            ease: 'linear',
          }}
        />
      ))}

      {/* Floating planets */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Large planet */}
        <motion.div
          className="absolute top-1/4 right-1/4"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="relative w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-2xl"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Planet rings */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-300/30 scale-150" />
            <div className="absolute inset-0 rounded-full border-2 border-pink-300/20 scale-[1.8]" />
            
            {/* Planet craters */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-700/50 rounded-full" />
            <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-pink-700/40 rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-red-700/50 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Small planet */}
        <motion.div
          className="absolute top-1/3 left-1/4"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 shadow-xl"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-blue-600/50 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-cyan-700/40 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Tiny planet */}
        <motion.div
          className="absolute bottom-1/3 right-1/3"
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 shadow-lg">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-600/50 rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* Mountains/landscape layer */}
      <motion.div
        style={{ y: yBg }}
        className="absolute bottom-0 left-0 right-0 h-1/3"
      >
        {/* Mountain silhouettes */}
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,300 L0,200 L200,100 L400,180 L600,80 L800,160 L1000,120 L1200,200 L1200,300 Z"
            fill="rgba(15, 12, 41, 0.9)"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          />
          <motion.path
            d="M0,300 L0,220 L150,140 L350,200 L550,120 L750,180 L950,150 L1200,220 L1200,300 Z"
            fill="rgba(36, 36, 62, 0.8)"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
          />
          <motion.path
            d="M0,300 L0,240 L100,180 L300,220 L500,160 L700,200 L900,180 L1200,240 L1200,300 Z"
            fill="rgba(48, 43, 99, 0.7)"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 15]) }}
          />
        </svg>
      </motion.div>

      {/* Text content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ y: yText, opacity, scale }}
          className="text-center z-10"
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            What We Did?
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.p className="text-purple-300 text-xl md:text-2xl font-light">
              Scroll to explore our portfolio
            </motion.p>
            <motion.div
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.3,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
};

export default Parallax;