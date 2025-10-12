import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Mock data - replace with your actual imports
const services = [
  { title: "All projects", icon: "🎯" },
  { title: "Web Development", icon: "💻" },
  { title: "Data Analysis", icon: "📊" },
  { title: "Python Developer", icon: "🐍" },
  { title: "Flutter Developer", icon: "📱" },
];

const items = [
  {
    id: 1,
    title: "Online E-Commerce",
    demo: "https://goldenstoredz.shop/",
    desc: "Built a user-friendly website using React and Django. This site lets you easily sign in, place orders, make secure payments, and track deliveries.",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Dynamic Job Platform",
    demo: "https://jobsearchdz.online/",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    desc: "Designed a user-friendly website using Next.js and MongoDB, where individuals can easily log in, apply for jobs, and discover various companies.",
    category: "Web Development",
  },
  {
    id: 3,
    title: "React Django Real Estate",
    demo: "https://immobilierdz.online/",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    desc: "Created a dynamic website with React and Django, providing secure user authentication for real estate opportunities.",
    category: "Web Development",
  },
  {
    id: 4,
    title: "QuickCart Express",
    demo: "https://autonav.shop/",
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    desc: "A user-friendly online store with React and Express for a delightful shopping journey.",
    category: "Web Development",
  },
  {
    id: 5,
    title: "Visualizing Data with Tableau",
    demo: "https://public.tableau.com/app/profile/hassen.goumghar/vizzes",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    desc: "Turn numbers into pictures, making cool charts and dashboards that tell stories from different data sources.",
    category: "Data Analysis",
  },
  {
    id: 6,
    title: "Visualizing Data with Power BI",
    demo: "https://github.com/HassenGHR/Data-Analysis.git",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    desc: "Case studies showcasing skills in turning data into insightful visuals using Power BI.",
    category: "Data Analysis",
  },
  {
    id: 7,
    title: "A Telegram Sales Bot",
    demo: "https://t.me/AutoNavSalesBot",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    desc: "AutoNavSales Bot efficiently logs sales data from text or voice messages, utilizing NLP for streamlined processing.",
    category: "Python Developer",
  },
  {
    id: 8,
    title: "A Telegram Bot",
    demo: "https://t.me/TestStore2383_bot",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    desc: "AutonavTracker serves as a virtual assistant for users seeking information about trackers.",
    category: "Python Developer",
  },
  {
    id: 9,
    title: "An Ecommerce Flutter App",
    demo: "#",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    desc: "E-commerce App developed using Flutter, integrating API for order placement and tracking.",
    category: "Flutter Developer",
  },
  {
    id: 10,
    title: "A Real Estate Flutter App",
    demo: "#",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    desc: "FlutterListing App facilitates effortless publishing of rental or sale listings.",
    category: "Flutter Developer",
  },
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const CategoryCard = ({ item, onClick, index }) => {
  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
  ];

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-slate-600 transition-all duration-300">
        {/* Glow effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500`} />
        
        <div className="relative flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <motion.div
            className={`w-20 h-20 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-4xl shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {item.icon}
          </motion.div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-white">
            {item.title}
          </h3>
          
          {/* Hover indicator */}
          <motion.div
            className="h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:w-full transition-all duration-300"
          />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
          
          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {project.desc}
          </p>

          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              View Demo
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Details
            </motion.button>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full" />
      </div>
    </motion.div>
  );
};

const Categories = () => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("All projects");
  const projectsRef = useRef(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    
    if (category === "All projects") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }

    // Smooth scroll to projects
    setTimeout(() => {
      if (projectsRef.current) {
        const offset = 100;
        const elementPosition = projectsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-6"
          >
            <span className="text-6xl">🚀</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse through our diverse portfolio of innovative solutions across different technologies
          </p>
        </motion.div>

        {/* Category Filter Bar */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        >
          {services.map((service, index) => (
            <CategoryCard
              key={index}
              item={service}
              index={index}
              onClick={() => handleCategoryClick(service.title)}
            />
          ))}
        </motion.div>

        {/* Active Category Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <span className="text-gray-400">Showing:</span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 font-semibold">
            {activeCategory}
          </span>
          <span className="text-gray-400">
            ({filteredItems.length} {filteredItems.length === 1 ? 'project' : 'projects'})
          </span>
        </motion.div>

        {/* Projects Grid */}
        <div ref={projectsRef}>
          {filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-gray-400">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;