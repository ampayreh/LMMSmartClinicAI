import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Our Future", href: "#future" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const visible = useScrollDirection();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
      >
        <div className="flex items-center justify-between rounded-full bg-white/[0.07] backdrop-blur-xl border border-white/[0.08] shadow-2xl px-5 py-2.5 md:px-6 md:py-3">
          <a href="#" className="flex items-center gap-2">
            <span className="text-xl font-heading font-[800] text-teal-primary">LM</span>
            <span className="hidden sm:inline text-sm font-semibold text-text-primary">Lynda Michelle</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-text-secondary hover:text-teal-primary transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex bg-teal-primary text-bg-dark px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-glow hover:shadow-[0_0_20px_rgba(45,212,168,0.3)] transition-all"
            >
              Book Visit
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-text-primary p-1"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="text-3xl font-bold text-text-primary hover:text-teal-primary transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-text-secondary text-sm space-y-1"
            >
              <p>+256 775 620 879</p>
              <p>admin@lyndamichellemed.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;