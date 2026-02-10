import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const DATA = [
  { end: 13, suffix: "+", label: "Years Serving" },
  { end: 8, suffix: "", label: "Core Services" },
  { end: 3, suffix: "", label: "Clinic Locations" },
  { end: 10000, suffix: "+", label: "Patients Treated" },
];

function Counter({ end, suffix, label, delay }: { end: number; suffix: string; label: string; delay: number }) {
  const { ref, count } = useCountUp(end);
  const display = end >= 10000 ? count.toLocaleString() : String(count);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-center text-center"
    >
      <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
        {display}{suffix}
      </span>
      <div className="w-8 h-0.5 bg-teal-primary mx-auto mt-3 mb-2" />
      <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}

const Stats = () => (
  <section className="bg-bg-dark py-16 md:py-24">
    <div className="container max-w-6xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {DATA.map((d, i) => (
          <Counter key={d.label} {...d} delay={i * 0.1} />
        ))}
      </div>
    </div>
  </section>
);

export default Stats;