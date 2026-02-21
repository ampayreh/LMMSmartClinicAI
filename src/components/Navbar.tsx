import { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.nav
        animate={{ y: visible || open ? 0 : -100, opacity: visible || open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 inset-x-0 z-[60] flex justify-center px-4"
      >
        <div className="flex items-center justify-between w-full max-w-3xl rounded-full bg-black/80 backdrop-blur-xl border border-white/[0.12] shadow-2xl px-5 py-2.5 lg:px-6 lg:py-3">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-heading font-[800] text-teal-primary">LMM</span>
            <span className="hidden sm:inline text-sm font-semibold text-white/90">Lynda Michelle Medical Centre</span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/90 hover:text-teal-primary transition-colors whitespace-nowrap">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden lg:inline-flex bg-teal-primary text-bg-dark px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-glow hover:shadow-[0_0_20px_rgba(45,212,168,0.3)] transition-all whitespace-nowrap"
            >
              Book Visit
            </a>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-white/15 text-white rounded-full"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-bg-dark/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-3xl font-bold text-white hover:text-teal-primary transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 bg-teal-primary text-bg-dark px-8 py-3 rounded-full font-semibold text-sm"
            >
              Book Visit
            </motion.a>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-white/60 text-sm space-y-1"
            >
              <p>+256 741 008 049 (WhatsApp)</p>
              <p>+256 772 590 967</p>
              <p>admin@lyndamichellemed.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
