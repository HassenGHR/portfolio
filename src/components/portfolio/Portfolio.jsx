import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function PortfolioCarousel({ items, activeCategory }) {
  const carouselRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      ref={carouselRef}
      id="portfolio-section"
      className="portfolio-carousel relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Featured{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              <p className="text-gray-400 text-sm lg:text-base">
                {items.length} {items.length === 1 ? "project" : "projects"}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ←
              </motion.button>
              <motion.button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                →
              </motion.button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <motion.div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              onLoad={checkScroll}
              key={`carousel-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {items && items.length > 0 ? (
                items.map((project, index) => (
                  <CarouselCard
                    key={`${project.id}-${index}`}
                    project={project}
                    index={index}
                  />
                ))
              ) : (
                <div className="w-full flex items-center justify-center py-20">
                  <p className="text-2xl text-gray-400">No projects found</p>
                </div>
              )}
            </motion.div>

            {/* Gradient overlays */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Like what you see?
          </h3>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
            Let's create something amazing together
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-sm sm:text-base"
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

function CarouselCard({ project, index }) {
  if (!project) {
    return <div className="text-white p-20">Project data missing</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="flex-shrink-0 w-full md:w-96 snap-start"
    >
      <div className="relative group h-full">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500" />

        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col hover:border-slate-600 transition-all duration-300">
          {/* Image Section */}
          <motion.div className="relative overflow-hidden h-56 sm:h-64">
            <motion.img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

            {/* Category Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4"
            >
              <span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-lg">
                {project.category}
              </span>
            </motion.div>

            {/* Tech Stack */}
            {project.tech && project.tech.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-4 flex gap-1 flex-wrap"
              >
                {project.tech.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-900/90 backdrop-blur-sm border border-slate-600 text-slate-200 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-0.5 bg-slate-900/90 backdrop-blur-sm border border-slate-600 text-slate-200 text-xs font-medium rounded-full">
                    +{project.tech.length - 3}
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Content Section */}
          <div className="flex-1 p-5 sm:p-6 flex flex-col">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2"
            >
              {project.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2"
            >
              {project.desc}
            </motion.p>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 space-y-2"
              >
                {project.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-xs line-clamp-1">{feature}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-2 mt-auto"
            >
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                View Demo
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Details
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}