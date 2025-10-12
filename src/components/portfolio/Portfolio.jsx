import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";

// Mock items - replace with your actual data
const items = [
  {
    id: 1,
    title: "Online E-Commerce",
    demo: "https://goldenstoredz.shop/",
    desc: "Built a user-friendly website using React and Django. This site lets you easily sign in, place orders, make secure payments, and track deliveries.",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop",
    category: "Web Development",
    tech: ["React", "Django", "PostgreSQL"],
  },
  {
    id: 2,
    title: "Dynamic Job Platform",
    demo: "https://jobsearchdz.online/",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop",
    desc: "Designed a user-friendly website using Next.js and MongoDB, where individuals can easily log in, apply for jobs, and discover various companies.",
    category: "Web Development",
    tech: ["Next.js", "MongoDB", "Node.js"],
  },
  {
    id: 3,
    title: "React Django Real Estate",
    demo: "https://immobilierdz.online/",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    desc: "Created a dynamic website with React and Django, providing secure user authentication for real estate opportunities.",
    category: "Web Development",
    tech: ["React", "Django", "REST API"],
  },
];

const Single = ({ item, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl w-full"
      >
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
          {/* Image Section */}
          <motion.div
            className={`relative group ${isEven ? '' : 'lg:col-start-2'}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl">
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-[400px] object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              
              {/* Floating category badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6"
              >
                <span className="px-4 py-2 bg-purple-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full shadow-lg">
                  {item.category}
                </span>
              </motion.div>

              {/* Tech stack badges */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-6 flex gap-2 flex-wrap"
              >
                {item.tech?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-800/90 backdrop-blur-sm border border-slate-600 text-slate-200 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
          >
            {/* Project number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <span className="text-purple-400 text-sm font-mono font-semibold">
                PROJECT {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {item.title}
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <p className="text-gray-400 text-lg leading-relaxed">
                {item.desc}
              </p>
            </motion.div>

            {/* Features/Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="mb-8 space-y-3"
            >
              {["Responsive Design", "Secure Authentication", "Real-time Updates"].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                View Live Demo
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                View Case Study
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const Portfolio = ({ onFilteredItems }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const portfolioRef = useRef();

  useEffect(() => {
    if (onFilteredItems && onFilteredItems.length > 0) {
      setFilteredItems(onFilteredItems);
    }
  }, [onFilteredItems]);

  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={portfolioRef}
      className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Sticky Progress Header */}
      <motion.div
        style={{ opacity }}
        className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Featured{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Works
                </span>
              </h1>
              <p className="text-gray-400 mt-2">
                Showcasing {filteredItems.length} exceptional projects
              </p>
            </div>
            
            {/* Scroll indicator */}
            <motion.div
              className="hidden md:flex items-center gap-2 text-sm text-gray-400"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Scroll to explore</span>
              <span>↓</span>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 origin-left"
            />
          </div>
        </div>
      </motion.div>

      {/* Projects */}
      <div className="relative">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Single key={item.id} item={item} index={index} />
          ))
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-2">No projects to display</h3>
              <p className="text-gray-400">Select a category to view projects</p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Decoration */}
      <div className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Like what you see?
          </h3>
          <p className="text-gray-400 mb-8">Let's create something amazing together</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;