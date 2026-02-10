import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 5, suffix: "+", label: "Years Serving" },
  { value: 8, suffix: "", label: "Core Services" },
  { value: 3, suffix: "", label: "Clinic Locations" },
  { value: 10000, suffix: "+", label: "Patients Treated" },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  const display = target >= 1000 ? `${(count / 1000).toFixed(count >= target ? 0 : 1).replace(/\.0$/, ",")}000` : String(count);
  const formatted = target >= 10000 ? `${Math.floor(count / 1000)},${String(count % 1000).padStart(3, "0")}` : String(count);

  return (
    <span className="font-heading text-4xl font-bold text-white sm:text-5xl">
      {formatted}{suffix}
    </span>
  );
}

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="relative bg-primary py-16 md:py-20 overflow-hidden">
      <div className="diamond-pattern absolute inset-0" />
      <div className="container relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center gap-2"
            >
              <AnimatedCounter target={s.value} suffix={s.suffix} inView={inView} />
              <span className="text-sm font-medium text-white/70">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
