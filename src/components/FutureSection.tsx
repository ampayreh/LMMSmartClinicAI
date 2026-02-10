import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2, Bed, Microscope } from "lucide-react";

const FEATURES = [
  { icon: Bed, title: "Inpatient Wards", desc: "Expanded bed capacity for overnight care" },
  { icon: Building2, title: "Surgical Theatre", desc: "Modern surgical capabilities" },
  { icon: Microscope, title: "Diagnostic Center", desc: "Advanced laboratory and imaging" },
];

const FutureSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative bg-charcoal py-20 md:py-28 overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-secondary md:text-4xl lg:text-5xl">
            Building Tomorrow's Healthcare
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            Our planned modern medical facility will bring enhanced inpatient care, surgical capabilities,
            and expanded diagnostic services to our growing community.
          </p>
        </motion.div>

        {/* Blueprint-style building SVG */}
        <div className="mx-auto mb-14 max-w-lg">
          <svg viewBox="0 0 400 220" fill="none" className="w-full">
            {/* Ground line */}
            <motion.line x1="20" y1="200" x2="380" y2="200" stroke="hsl(178 80% 25%)" strokeWidth="1.5" style={{ pathLength }} />
            {/* Main building */}
            <motion.rect x="80" y="60" width="240" height="140" rx="4" stroke="hsl(178 80% 25%)" strokeWidth="1.5" fill="none" style={{ pathLength }} />
            {/* Second floor line */}
            <motion.line x1="80" y1="130" x2="320" y2="130" stroke="hsl(178 80% 25% / 0.5)" strokeWidth="1" style={{ pathLength }} />
            {/* Windows row 1 */}
            {[110, 160, 210, 260].map((x) => (
              <motion.rect key={`w1-${x}`} x={x} y="75" width="20" height="25" rx="2" stroke="hsl(178 80% 25% / 0.6)" strokeWidth="1" fill="none" style={{ pathLength }} />
            ))}
            {/* Windows row 2 */}
            {[110, 160, 210, 260].map((x) => (
              <motion.rect key={`w2-${x}`} x={x} y="145" width="20" height="25" rx="2" stroke="hsl(178 80% 25% / 0.6)" strokeWidth="1" fill="none" style={{ pathLength }} />
            ))}
            {/* Door */}
            <motion.rect x="185" y="170" width="30" height="30" rx="2" stroke="hsl(37 92% 50%)" strokeWidth="1.5" fill="none" style={{ pathLength }} />
            {/* Cross on building */}
            <motion.line x1="200" y1="40" x2="200" y2="55" stroke="hsl(37 92% 50%)" strokeWidth="2" style={{ pathLength }} />
            <motion.line x1="192.5" y1="47.5" x2="207.5" y2="47.5" stroke="hsl(37 92% 50%)" strokeWidth="2" style={{ pathLength }} />
            {/* Trees */}
            <motion.circle cx="50" cy="175" r="18" stroke="hsl(178 80% 25% / 0.4)" strokeWidth="1" fill="none" style={{ pathLength }} />
            <motion.line x1="50" y1="193" x2="50" y2="200" stroke="hsl(178 80% 25% / 0.4)" strokeWidth="1" style={{ pathLength }} />
            <motion.circle cx="360" cy="178" r="15" stroke="hsl(178 80% 25% / 0.4)" strokeWidth="1" fill="none" style={{ pathLength }} />
            <motion.line x1="360" y1="193" x2="360" y2="200" stroke="hsl(178 80% 25% / 0.4)" strokeWidth="1" style={{ pathLength }} />
          </svg>
        </div>

        {/* Feature cards */}
        <div className="grid gap-5 sm:grid-cols-3 max-w-3xl mx-auto">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center"
            >
              <f.icon className="mx-auto mb-3 h-7 w-7 text-secondary" />
              <h3 className="font-heading font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-white/50">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
