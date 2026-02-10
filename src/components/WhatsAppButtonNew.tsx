import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButtonNew = () => (
  <motion.a
    href="https://wa.me/256775620879"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2, type: "spring" }}
    className="fixed bottom-6 right-6 z-50"
  >
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>
    </div>
  </motion.a>
);

export default WhatsAppButtonNew;