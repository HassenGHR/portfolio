import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { 
    y: 50, 
    opacity: 0 
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  initial: { 
    y: 100, 
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const services = [
  {
    icon: "💻",
    title: "Full Stack Development",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Modern UIs, SPA development with React & Next.js",
      "Backend development with Django & Django REST Framework",
      "Database design, management & RESTful API creation"
    ],
  },
  {
    icon: "📱",
    title: "Flutter App Development",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Cross-platform apps with polished UX/UI design",
      "Responsive UI with local/Firebase integration",
      "Feature-rich apps with Cloud DB & API integration"
    ],
  },
  {
    icon: "🐍",
    title: "Python Development",
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Web scraping to extract data from websites",
      "Custom Telegram bots with API integration",
      "Machine learning models for enhanced decision-making"
    ],
  },
  {
    icon: "📊",
    title: "Data Visualization",
    gradient: "from-orange-500 to-red-500",
    features: [
      "Power BI interactive dashboards for actionable insights",
      "Tableau dashboards connected to various data sources",
      "Automated data analysis with Python & spreadsheets"
    ],
  },
];

const Services = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
      
          
          <p className="text-gray-400 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            I focus on helping your brand grow and move forward
          </p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Title Section */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Unique
            </motion.span>{" "}
            Ideas
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              For Your
            </motion.span>{" "}
            Business
          </h1>
          
          {/* <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            WHAT WE DO?
          </motion.button> */}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500`} />
              
              <div className="relative h-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:border-slate-600 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  className="mb-3"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl text-xl shadow-lg`}>
                    {service.icon}
                  </div>
                </motion.div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white mb-3">
                  {service.title}
                </h2>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.1 * idx + 0.3 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Button */}
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    x: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Learn More
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>

                {/* Corner decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-5 rounded-bl-full`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">
            Ready to transform your business with cutting-edge solutions?
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default Services;