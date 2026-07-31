import { motion } from "framer-motion";

export default function Categories({ activeCategory, onCategorySelect, itemCount }) {
  const services = [
  { title: "All projects", icon: "🎯", category: "all" },
  { title: "Full-Stack", icon: "🧩", category: "Full-Stack" },
  { title: "Web Development", icon: "💻", category: "Web Development" },
  { title: "Flutter Developer", icon: "📱", category: "Flutter Developer" },
];
  return (
    <section className="categories-section relative py-20 px-6 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
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

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
          {services.map((service, index) => (
            <CategoryCardItem
              key={service.category}
              service={service}
              index={index}
              isActive={activeCategory === service.category}
              onClick={() => onCategorySelect(service.category)}
            />
          ))}
        </div>

        {/* Active Category Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="text-gray-400">Showing:</span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 font-semibold">
            {services.find(s => s.category === activeCategory)?.title || "All Projects"} ({itemCount})
          </span>
        </motion.div>
      </div>
    </section>
  );
}

const categoryGradientClasses = {
  0: "bg-gradient-to-br from-purple-500 to-pink-500",
  1: "bg-gradient-to-br from-blue-500 to-cyan-500",
  2: "bg-gradient-to-br from-green-500 to-emerald-500",
  3: "bg-gradient-to-br from-orange-500 to-red-500",
  4: "bg-gradient-to-br from-indigo-500 to-purple-500",
  5: "bg-gradient-to-br from-amber-500 to-orange-500",
};

const categoryBorderGradients = {
  0: "bg-gradient-to-r from-purple-500 to-pink-500",
  1: "bg-gradient-to-r from-blue-500 to-cyan-500",
  2: "bg-gradient-to-r from-green-500 to-emerald-500",
  3: "bg-gradient-to-r from-orange-500 to-red-500",
  4: "bg-gradient-to-r from-indigo-500 to-purple-500",
  5: "bg-gradient-to-r from-amber-500 to-orange-500",
};

function CategoryCardItem({ service, index, isActive, onClick }) {
  const gradientIdx = index % 6;
  const iconGradient = categoryGradientClasses[gradientIdx];
  const borderGradient = categoryBorderGradients[gradientIdx];

  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type="button"
      className={`w-full cursor-pointer group relative transition-all ${isActive ? "ring-2 ring-purple-500" : ""}`}
    >
      <div className={`relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border ${isActive ? "border-purple-500" : "border-slate-700/50"} p-4 hover:border-slate-600 transition-all duration-300`}>
        <div className={`absolute -inset-0.5 ${borderGradient} rounded-xl opacity-0 ${isActive ? "opacity-30" : "group-hover:opacity-20"} blur transition duration-500`} />
        
        <div className="relative flex flex-col items-center text-center gap-2">
          <motion.div
            className={`w-16 h-16 rounded-lg ${iconGradient} flex items-center justify-center text-3xl shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {service.icon}
          </motion.div>
          
          <h3 className="text-sm font-bold text-white">
            {service.title}
          </h3>
          
          <motion.div
            className={`h-1 ${borderGradient} rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
          />
        </div>
      </div>
    </motion.button>
  );
}