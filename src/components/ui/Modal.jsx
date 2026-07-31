import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Shared modal shell: backdrop, panel, close control, Escape, scroll lock,
 * focus handling and the dialog aria wiring.
 *
 * Deliberately NOT rendered through `AnimatePresence`. Routed through it, the
 * exiting child was never unmounted — it faded to opacity 0 but stayed in the
 * DOM as a fixed, full-screen backdrop with pointer-events, so every click on
 * the page died and body scroll stayed locked. Conditional rendering costs a
 * fade-out and avoids that entirely.
 */
export default function Modal({ onClose, labelledBy, children, className = "" }) {
  const closeRef = useRef(null);

  // Held in a ref so the effect runs once per mount. Depending on `onClose`
  // directly re-runs it on every parent render, and the cleanup would then
  // capture "hidden" as the overflow to restore.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

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
        aria-labelledby={labelledBy}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl ${className}`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {children}
      </motion.div>
    </motion.div>
  );
}
