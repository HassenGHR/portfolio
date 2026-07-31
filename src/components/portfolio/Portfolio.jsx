import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const isPrivate = (project) =>
  Boolean(project.private) || !project.demo || project.demo === "#";

export default function PortfolioCarousel({ items }) {
  const carouselRef = useRef(null);
  const [selected, setSelected] = useState(null);

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
          </div>

          {/* Cards flow down the page: one column on phones, widening with
              the viewport. Replaced a horizontal scroller that hid most of
              the work behind a swipe. */}
          {items && items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((project, index) => (
                <CarouselCard
                  key={`${project.id}-${index}`}
                  project={project}
                  index={index}
                  onOpenDetails={() => setSelected(project)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-20">
              <p className="text-2xl text-gray-400">No projects found</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Rendered directly rather than through AnimatePresence: the exiting
          child was not being unmounted, which left an invisible full-screen
          backdrop over the page swallowing every click. */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function CarouselCard({ project, index, onOpenDetails }) {
  if (!project) {
    return <div className="text-white p-20">Project data missing</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="w-full"
    >
      <div className="relative group h-full">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500" />

        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col hover:border-slate-600 transition-all duration-300">
          {/* Image Section */}
          <motion.div
            className={`relative overflow-hidden h-56 sm:h-64 ${
              project.imgFit === "contain" ? "bg-slate-900" : ""
            }`}
          >
            <motion.img
              src={project.img}
              alt={project.title}
              className={`w-full h-full ${
                project.imgFit === "contain" ? "object-contain p-8" : "object-cover"
              }`}
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
              className="mt-auto space-y-2"
            >
              {isPrivate(project) ? (
                <span className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/60 text-slate-300 text-xs font-semibold rounded-lg cursor-default">
                  <LockIcon />
                  Private — commercial project
                </span>
              ) : null}

              <div className="flex gap-2">
                {!isPrivate(project) && (
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
                )}

                <motion.button
                  type="button"
                  onClick={onOpenDetails}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Details
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LockIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const titleId = `project-title-${project.id}`;

  // Held in a ref so the effect below can run once per mount. Depending on
  // `onClose` directly would re-run it on every parent render, and the cleanup
  // would then capture "hidden" as the overflow to restore.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Close on Escape, and stop the page behind from scrolling while open.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={`relative h-48 sm:h-56 overflow-hidden ${project.imgFit === "contain" ? "bg-slate-950" : ""}`}>
          <img
            src={project.img}
            alt={project.title}
            className={`w-full h-full ${project.imgFit === "contain" ? "object-contain p-8" : "object-cover"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-purple-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-lg">
            {project.category}
          </span>
        </div>

        <div className="p-6 sm:p-8 -mt-8 relative">
          <h3 id={titleId} className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {project.title}
          </h3>

          <p className="text-gray-300 leading-relaxed mb-6">{project.desc}</p>

          {project.features?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
                What it does
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 mt-2" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.tech?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
                Built with
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800">
            {isPrivate(project) ? (
              <p className="flex items-center gap-2 text-slate-400 text-sm">
                <LockIcon className="w-4 h-4 flex-shrink-0" />
                Private commercial project — source and live access are not public.
              </p>
            ) : (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Visit the live site
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}