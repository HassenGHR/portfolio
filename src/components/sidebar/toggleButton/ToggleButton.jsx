import { motion } from "framer-motion";

const ToggleButton = ({ open, setOpen }) => {
  return (
    <motion.button
      onClick={() => setOpen(!open)}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 flex items-center justify-center shadow-lg transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
      </svg>

      {/* Glow effect when open */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-md -z-10"
        />
      )}
    </motion.button>
  );
};

export default ToggleButton;