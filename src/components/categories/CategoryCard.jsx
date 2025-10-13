import { motion } from "framer-motion";

const gradients = [
  { bg: "from-purple-500 to-pink-500", light: "from-purple-400 to-pink-400" },
  { bg: "from-blue-500 to-cyan-500", light: "from-blue-400 to-cyan-400" },
  { bg: "from-green-500 to-emerald-500", light: "from-green-400 to-emerald-400" },
  { bg: "from-orange-500 to-red-500", light: "from-orange-400 to-red-400" },
  { bg: "from-indigo-500 to-purple-500", light: "from-indigo-400 to-purple-400" },
];

const gradientStyles = {
  0: "bg-gradient-to-br from-purple-500 to-pink-500",
  1: "bg-gradient-to-br from-blue-500 to-cyan-500",
  2: "bg-gradient-to-br from-green-500 to-emerald-500",
  3: "bg-gradient-to-br from-orange-500 to-red-500",
  4: "bg-gradient-to-br from-indigo-500 to-purple-500",
};

const borderGradientStyles = {
  0: "bg-gradient-to-r from-purple-500 to-pink-500",
  1: "bg-gradient-to-r from-blue-500 to-cyan-500",
  2: "bg-gradient-to-r from-green-500 to-emerald-500",
  3: "bg-gradient-to-r from-orange-500 to-red-500",
  4: "bg-gradient-to-r from-indigo-500 to-purple-500",
};

export default function CategoryCard({ item, onClick, isActive, index }) {
  const gradientIndex = index % 5;
  const iconBgClass = gradientStyles[gradientIndex];
  const borderClass = borderGradientStyles[gradientIndex];

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer group relative ${isActive ? 'ring-2 ring-purple-500' : ''}`}
    >
      <div className={`relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border ${isActive ? 'border-purple-500' : 'border-slate-700/50'} p-4 hover:border-slate-600 transition-all duration-300`}>
        <div className={`absolute -inset-0.5 ${borderClass} rounded-xl opacity-0 ${isActive ? 'opacity-30' : 'group-hover:opacity-20'} blur transition duration-500`} />
        
        <div className="relative flex flex-col items-center text-center gap-2">
          <motion.div
            className={`w-16 h-16 rounded-lg ${iconBgClass} flex items-center justify-center text-3xl shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {item.icon}
          </motion.div>
          
          <h3 className="text-sm font-bold text-white">
            {item.title}
          </h3>
          
          <motion.div
            className={`h-1 ${borderClass} rounded-full ${isActive ? 'w-full' : 'w-0'} group-hover:w-full transition-all duration-300`}
          />
        </div>
      </div>
    </motion.div>
  );
}