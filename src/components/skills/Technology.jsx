import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Mock technologies data - replace with your actual imports
const technologies = [
  { name: "HTML", icon: "🌐", color: "from-orange-500 to-red-500" },
  { name: "CSS", icon: "🎨", color: "from-blue-500 to-cyan-500" },
  { name: "JavaScript", icon: "⚡", color: "from-yellow-500 to-orange-500" },
  { name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
  { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-500" },
  { name: "Python", icon: "🐍", color: "from-blue-600 to-yellow-500" },
  { name: "Django", icon: "🎯", color: "from-green-600 to-teal-500" },
  { name: "MongoDB", icon: "🍃", color: "from-green-500 to-lime-500" },
  { name: "PostgreSQL", icon: "🐘", color: "from-blue-600 to-indigo-500" },
  { name: "Git", icon: "📦", color: "from-orange-600 to-red-600" },
  { name: "Docker", icon: "🐳", color: "from-blue-500 to-cyan-600" },
  { name: "AWS", icon: "☁️", color: "from-orange-500 to-yellow-500" },
  { name: "Flutter", icon: "📱", color: "from-blue-400 to-cyan-400" },
  { name: "TypeScript", icon: "💙", color: "from-blue-600 to-indigo-600" },
  { name: "Next.js", icon: "▲", color: "from-slate-700 to-slate-900" },
  { name: "Tailwind", icon: "💨", color: "from-cyan-500 to-blue-600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    y: 50, 
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const SkillBall = ({ technology, index }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.15,
        rotate: 360,
        transition: { duration: 0.6 }
      }}
      className="group"
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-2 bg-gradient-to-r ${technology.color} rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
        />
        
        {/* Main ball */}
        <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${technology.color} flex items-center justify-center shadow-2xl border-4 border-white/10`}>
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          
          {/* Icon */}
          <span className="relative text-4xl z-10 filter drop-shadow-lg">
            {technology.icon}
          </span>
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Name label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-white text-sm font-semibold px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700/50 group-hover:border-slate-600 transition-colors">
            {technology.name}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Tech = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl">
              💡
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Skills
            </span>
            <span className="text-purple-400">.</span>
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 100 } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-8"
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-12 justify-items-center pb-16"
        >
          {technologies.map((technology, index) => (
            <SkillBall key={technology.name} technology={technology} index={index} />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: "16+", label: "Technologies", icon: "🚀" },
            { number: "5+", label: "Years Experience", icon: "⏱️" },
            { number: "100%", label: "Passion Driven", icon: "💯" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
              
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-slate-600 transition-colors">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6 text-lg">
            Want to see these skills in action?
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            View My Projects
          </motion.button>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default Tech;