import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IconCode, IconSmartphone, IconWhatsApp } from "../icons/Icons";
import Modal from "../ui/Modal";

const WHATSAPP_URL = "https://wa.me/213542761377";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { 
    y: 50, 
    opacity: 0 
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  initial: { 
    y: 100, 
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const services = [
  {
    icon: IconCode,
    title: "Full Stack Development",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Modern UIs and web apps with React & Next.js",
      "Real-time backends with Node.js, Fastify & PostgreSQL",
      "Database design, REST APIs and operations dashboards"
    ],
    summary:
      "I build the whole system, not just the screens — the customer-facing site, the API and database behind it, and the back office your team runs the business from. One person across the stack means no hand-offs and no feature that stops half-finished at an integration boundary.",
    includes: [
      "A storefront or web app users actually enjoy using",
      "A REST API and database schema designed around your workflow",
      "An admin back office: orders, stock, customers, reporting",
      "Real-time features where they matter — live tracking, notifications",
      "Deployment, environments and the operational bits that keep it up",
    ],
    examples: "Irara Express · GMTentes · Golden Store",
  },
  {
    icon: IconSmartphone,
    title: "Flutter App Development",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Cross-platform apps with polished UX/UI design",
      "Responsive UI with local/Firebase integration",
      "Feature-rich apps with Cloud DB & API integration"
    ],
    summary:
      "One Flutter codebase covering Android, iOS and Windows desktop. I've taken apps the full distance — from first screen through store review to a live listing — including the parts that bite late: push notifications, offline behaviour, maps and release signing.",
    includes: [
      "Android and iOS from a single codebase, plus desktop where it helps",
      "Offline-first data that syncs when the connection returns",
      "Maps, live location and push notifications",
      "Play Store release: signing, compliance and store listing",
      "Multi-language and right-to-left layouts",
    ],
    examples: "Irara Drive · Golden Store app · GM Bon Pour desktop",
  },
];

const Services = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [selected, setSelected] = useState(null);

  const goToContact = () => {
    setSelected(null);
    document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
      
          
          <p className="text-gray-400 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            I focus on helping your brand grow and move forward
          </p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Title Section */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Unique
            </motion.span>{" "}
            Ideas
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              For Your
            </motion.span>{" "}
            Business
          </h1>
          
          {/* <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            WHAT WE DO?
          </motion.button> */}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500`} />
              
              <div className="relative h-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:border-slate-600 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  className="mb-3"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl text-white shadow-lg`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                </motion.div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white mb-3">
                  {service.title}
                </h2>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.1 * idx + 0.3 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Button */}
                <motion.button
                  type="button"
                  onClick={() => setSelected(service)}
                  whileHover={{
                    scale: 1.05,
                    x: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Learn More
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>

                {/* Corner decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-5 rounded-bl-full`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">
            Ready to transform your business with cutting-edge solutions?
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </motion.div> */}
      </motion.div>

      {selected && (
        <Modal
          onClose={() => setSelected(null)}
          labelledBy="service-modal-title"
          className="max-w-2xl"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6 pr-10">
              <div
                className={`flex-shrink-0 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${selected.gradient} rounded-xl text-white shadow-lg`}
              >
                <selected.icon className="w-7 h-7" />
              </div>
              <h3
                id="service-modal-title"
                className="text-2xl sm:text-3xl font-bold text-white"
              >
                {selected.title}
              </h3>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">{selected.summary}</p>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
              What you get
            </h4>
            <ul className="space-y-2.5 mb-8">
              {selected.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {selected.examples && (
              <div className="mb-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">
                  Built this way
                </h4>
                <p className="text-gray-400 text-sm">{selected.examples}</p>
              </div>
            )}

            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={goToContact}
                className={`flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${selected.gradient} text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Start a project
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                <IconWhatsApp className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Services;