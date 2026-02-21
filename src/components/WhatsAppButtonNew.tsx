import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButtonNew = () => {
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      href="https://wa.me/256772590967"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative flex items-center">
        <AnimatePresence>
          {hover && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="absolute right-14 bg-black/70 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
            >
              WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
        <div className="relative w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.a>
  );
};

export default WhatsAppButtonNew;
