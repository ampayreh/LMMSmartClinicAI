import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import futureHospitalImage from "@/assets/future-hospital.png";

const FEATURES = [
  "Inpatient Wards & Private Rooms",
  "Modern Surgical Theatre",
  "Advanced Diagnostic Center",
  "Staff & Nurse Housing",
  "Accessible Ramps & Parking",
  "Community Meeting Spaces",
];

const HospitalSVG = ({ inView }: { inView: boolean }) => {
  const draw = { hidden: { pathLength: 0, opacity: 0 }, visible: (d: number) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay: d, duration: 1.5, ease: "easeInOut" as const }, opacity: { delay: d, duration: 0.01 } } }) };

  return (
    <svg viewBox="0 0 600 400" fill="none" className="w-full max-w-lg mx-auto">
      {/* Main building */}
      <motion.rect x="150" y="80" width="300" height="250" rx="4" stroke="#14B88E" strokeWidth="1.5" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0} />
      {/* Left wing */}
      <motion.rect x="50" y="160" width="100" height="170" rx="4" stroke="#14B88E" strokeWidth="1.5" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.2} />
      {/* Right wing */}
      <motion.rect x="450" y="160" width="100" height="170" rx="4" stroke="#14B88E" strokeWidth="1.5" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.2} />
      {/* Windows */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <motion.rect key={`${row}-${col}`} x={190 + col * 60} y={110 + row * 60} width="30" height="30" rx="2" stroke="#1A1A25" strokeWidth="1" strokeOpacity="0.3" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.5 + (row * 4 + col) * 0.05} />
        ))
      )}
      {/* Cross */}
      <motion.rect x="285" y="90" width="30" height="60" rx="2" stroke="#F5A623" strokeWidth="1.5" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1} />
      <motion.rect x="270" y="105" width="60" height="30" rx="2" stroke="#F5A623" strokeWidth="1.5" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1} />
      {/* Entrance */}
      <motion.rect x="270" y="280" width="60" height="50" rx="2" stroke="#14B88E" strokeWidth="1.5" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1.2} />
      {/* Steps */}
      <motion.line x1="250" y1="340" x2="350" y2="340" stroke="#14B88E" strokeWidth="1" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1.5} />
      {/* Ground */}
      <motion.line x1="20" y1="330" x2="580" y2="330" stroke="#1A1A25" strokeWidth="1" strokeOpacity="0.3" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1.5} />
      {/* Trees */}
      {[80, 520].map((x) => (
        <g key={x}>
          <motion.line x1={x} y1="330" x2={x} y2="300" stroke="#14B88E" strokeWidth="1.5" strokeOpacity="0.4" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1.8} />
          <motion.circle cx={x} cy="290" r="15" stroke="#14B88E" strokeWidth="1.5" strokeOpacity="0.4" variants={draw} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1.8} />
        </g>
      ))}
    </svg>
  );
};

const Future = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="future" ref={ref} className="bg-warm-cream">
      {/* Header */}
      <div className="container max-w-6xl pt-20 md:pt-32 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-glow">Our Future</span>
          <h2 className="mt-3 font-heading font-bold text-text-dark" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Building Tomorrow's Hospital
          </h2>
        </motion.div>
      </div>

      {/* Full-width image with bottom fade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full min-h-[300px] md:min-h-[60vh]"
        style={{
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      >
        <img
          src={futureHospitalImage}
          alt="Architectural render of the future Lynda Michelle Modern Hospital"
          className="w-full h-full min-h-[300px] md:min-h-[60vh] object-cover"
        />
        {/* Subtle overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 60%, rgba(255,251,240,0.3) 100%)",
          }}
        />
      </motion.div>

      {/* Content below image */}
      <div className="container max-w-4xl px-6 pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-glow">Hospital Expansion</span>
          <h3 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-text-dark">A Vision for Comprehensive Care</h3>
          <p className="mt-4 text-text-dark/70 leading-relaxed max-w-2xl mx-auto">
            Our planned multi-story medical facility will transform Lynda Michelle Medical Centre into a full-service hospital. The expansion will include inpatient wards, a modern surgical theatre, an advanced diagnostic center, staff housing, and fully accessible facilities with ramps and dedicated parking.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {FEATURES.map((f) => (
            <div key={f} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal-glow flex-shrink-0 mt-0.5" />
              <span className="text-sm text-text-dark/80">{f}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block bg-teal-primary text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:shadow-lg transition-all"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Future;