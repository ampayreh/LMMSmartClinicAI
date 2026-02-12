import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-consultation.png";

const HEADLINE = "Compassionate Healthcare for Every Family";
const BLOBS = [
  { color: "bg-teal-primary", pos: "top-[10%] left-[5%]", dur: 20 },
  { color: "bg-amber-accent", pos: "top-[5%] right-[10%]", dur: 23 },
  { color: "bg-rose-accent", pos: "top-[40%] left-[30%]", dur: 25 },
  { color: "bg-teal-glow", pos: "bottom-[15%] left-[10%]", dur: 18 },
];

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark">
    {/* Blobs */}
    {BLOBS.map((b, i) => (
      <motion.div
        key={i}
        className={`absolute ${b.pos} ${b.color} w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full blur-[60px] md:blur-[120px] opacity-30 mix-blend-hard-light will-change-transform`}
        animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: b.dur, repeat: Infinity, ease: "linear" }}
      />
    ))}

    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-[1fr] gap-12 items-center pt-28 pb-16 lg:max-w-[55%] lg:ml-0 lg:mr-auto">
      {/* Left */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-primary/10 border border-teal-primary/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-teal-primary animate-pulse" />
          <span className="text-teal-primary text-xs font-semibold uppercase tracking-wider">Serving Wakiso District Since 2012</span>
        </motion.div>

        <h1
          className="font-heading font-[800] text-text-primary leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          aria-label={HEADLINE}
        >
          {HEADLINE.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block mr-[0.3em]">
              {word.split("").map((char, ci) => {
                const idx = HEADLINE.indexOf(word) + ci;
                return (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.02, duration: 0.4 }}
                    className={`inline-block ${word === "Every" ? "text-teal-primary" : ""}`}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
        >
          Lynda Michelle Medical Centre delivers trusted outpatient care, maternal health services, immunizations, and community health education to families in Budo-Kimbejja and across Wakiso District.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex gap-4 flex-wrap"
        >
          <a
            href="#services"
            className="bg-teal-primary text-bg-dark px-8 py-3.5 rounded-full font-semibold text-sm hover:shadow-[0_0_30px_rgba(45,212,168,0.4)] hover:scale-105 transition-all"
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="border border-text-secondary/30 text-text-primary px-8 py-3.5 rounded-full text-sm font-semibold hover:border-teal-primary hover:text-teal-primary transition-all"
          >
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Right — placeholder */}
      {/* Hero image — fades in from the left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="hidden lg:block absolute inset-y-0 right-0 w-[55%]"
      >
        <img
          src={heroImage}
          alt="Doctor consulting with a mother and child at Lynda Michelle Medical Centre"
          className="w-full h-full object-cover"
        />
        {/* Left fade blend into content */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/70 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/40" />
        {/* Badge */}
        <div className="absolute bottom-24 right-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-center z-10">
          <span className="block text-2xl font-bold text-teal-primary">10,000+</span>
          <span className="block text-xs text-text-secondary">Patients Treated</span>
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary/50"
    >
      <ChevronDown className="w-6 h-6" />
    </motion.div>
  </section>
);

export default Hero;