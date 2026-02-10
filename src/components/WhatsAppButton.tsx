import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/256702322356"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
    style={{ backgroundColor: "#25D366" }}
    animate={{ scale: [1, 1.08, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ scale: 1.15 }}
  >
    <MessageCircle className="h-7 w-7 text-white" />
  </motion.a>
);

export default WhatsAppButton;
