import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { navLinks } from "../data/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl border-b border-dark-border/50"
          : "bg-transparent border-b border-white/10"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <a
            href="#home"
            className="font-mono text-white text-xl lg:text-2xl font-bold tracking-widest italic -skew-x-12"
          >
            MA
          </a>
          <div className="h-3 lg:h-4 w-px bg-white/40" />
          <span className="text-white/60 text-[8px] lg:text-[10px] font-mono">
            SOFTWARE ENGINEER
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 font-mono"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-zinc-400 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-dark-border/50"
          >
            <div className="flex flex-col items-center gap-5 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-zinc-400 hover:text-white transition-colors font-mono text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
