import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  if (!project) {
    return <div className="text-white p-20">Project data missing</div>;
  }

  const isEven = index % 2 === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="max-w-6xl w-full">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
          
          {/* Image Section */}
          <motion.div
            className={`relative group ${!isEven ? 'lg:col-start-2' : ''}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl">
              <motion.img
                src={project.img}
                alt={project.title}
                className="w-full h-80 lg:h-96 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6"
              >
                <span className="px-4 py-2 bg-purple-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full shadow-lg">
                  {project.category}
                </span>
              </motion.div>

              {project.tech && project.tech.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-6 left-6 flex gap-2 flex-wrap"
                >
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-800/90 backdrop-blur-sm border border-slate-600 text-slate-200 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <span className="text-purple-400 text-sm font-mono font-semibold">
                PROJECT {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {project.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg leading-relaxed mb-8"
            >
              {project.desc}
            </motion.p>

            {project.features && project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8 space-y-3"
              >
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
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
      </div>
    </motion.section>
  );
}