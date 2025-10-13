import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Links from "../sidebar/links/Links";
import ToggleButton from "../sidebar/toggleButton/ToggleButton";

const sidebarVariants = {
  open: {
    clipPath: "circle(1500px at calc(100% - 40px) 40px)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(25px at calc(100% - 40px) 40px)",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        className="fixed right-0 top-0 z-50 lg:hidden"
      >
        {/* Background with gradient */}
        <motion.div
          variants={sidebarVariants}
          className="fixed right-0 top-0 bottom-0 w-80 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="p-8 border-b border-slate-700/50">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  H
                </div>
                <div>
                  <h2 className="text-white text-lg font-bold">Hassen</h2>
                  <p className="text-gray-400 text-xs">Software Developer</p>
                </div>
              </motion.div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <Links open={open} setOpen={setOpen} />
            </div>

            {/* Footer - Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="p-8 border-t border-slate-700/50"
            >
              <p className="text-gray-400 text-sm mb-4">Connect with me</p>
              <div className="flex gap-3">
                {[
                  { icon: "💼", url: "#", name: "LinkedIn" },
                  { icon: "💻", url: "#", name: "GitHub" },
                  { icon: "📊", url: "#", name: "DataCamp" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center text-xl hover:border-slate-600 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Toggle Button */}
        <ToggleButton open={open} setOpen={setOpen} />
      </motion.div>
    </>
  );
};

export default Sidebar;