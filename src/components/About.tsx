import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const PARTNERS = ["Marie Stopes", "PEPFAR", "USAID", "JMS"];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" ref={ref} className="bg-bg-dark py-20 md:py-32 overflow-hidden">
      <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image placeholder */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-teal-primary/20 via-bg-elevated to-amber-accent/10 relative">
            <svg className="absolute inset-0 m-auto w-20 h-20 text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="35" r="18" />
              <path d="M50 53 C50 53 20 70 20 85 L80 85 C80 70 50 53 50 53Z" />
            </svg>
          </div>
          <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
            <span className="block text-lg font-bold text-amber-accent">Est. 2019</span>
            <span className="block text-xs text-text-secondary">Budo-Kimbejja, Uganda</span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-primary">About Us</span>
          <h2 className="mt-3 font-heading font-bold text-text-primary" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Rooted in Community, Driven by Care
          </h2>
          <p className="mt-6 text-text-secondary leading-relaxed">
            Lynda Michelle Medical Centre was established in 2019 to bridge the gap in accessible, quality healthcare for families in Budo-Kimbejja, Nsangi, and the wider Wakiso District. What began as a small outpatient clinic has grown into a trusted community health provider offering eight core services.
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            In partnership with Marie Stopes International, PEPFAR, USAID, and JMS, we deliver maternal health services, HIV testing, immunization programs, and community health education. Our team of dedicated professionals works every day to ensure that no family in our community goes without essential medical care.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary text-xs font-medium hover:border-teal-primary/30 hover:text-teal-primary transition-all"
              >
                {p}
              </span>
            ))}
          </div>

          <a href="#future" className="mt-8 inline-flex items-center gap-2 text-teal-primary font-semibold text-sm hover:gap-3 transition-all">
            Learn more about our mission <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;