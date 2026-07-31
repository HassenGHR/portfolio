import { motion } from "framer-motion";
import Sidebar from "../sidebar/Sidebar"
import avatar from "../../assets/avatar.jpg";

const Navbar = () => {
  const navItems = ["Home", "Services", "Projects", "Skills", "Contact"];

  const handleNavClick = (item) => {
    const sectionId = item === "Home" ? "Homepage" : item === "Projects" ? "Portfolio" : item;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20"
            >
              <img src={avatar} alt="Hassen Goumghar" className="w-full h-full object-cover" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-white text-xl font-bold">Hassen</h1>
              <p className="text-gray-400 text-xs">Software Developer</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center gap-8"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                onClick={() => handleNavClick(item)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-gray-300 hover:text-white transition-colors font-medium group bg-none border-none cursor-pointer"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <motion.button
              onClick={() => handleNavClick("Contact")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer border-none"
            >
              Let's Talk
            </motion.button>
          </motion.div>

          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Progress bar on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        style={{ 
          width: "0%",
          transformOrigin: "left"
        }}
      />
    </motion.nav>
  );
};

export default Navbar;