import { motion } from "framer-motion";
import { Stethoscope, Baby, FlaskConical, Syringe, Pill, Scissors, Users, Home } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const CARDS = [
  { title: "Outpatient Care (OPD)", desc: "General consultations, diagnosis, and treatment for all ages", icon: Stethoscope, span: "md:col-span-2" },
  { title: "Maternal & Reproductive Health", desc: "Antenatal care, safe deliveries, post-abortion care, and family planning services", icon: Baby, span: "md:col-span-1 md:row-span-2" },
  { title: "Laboratory & Diagnostics", desc: "Comprehensive testing including HIV, typhoid, syphilis, HCG, and blood sugar", icon: FlaskConical, span: "md:col-span-1" },
  { title: "Immunization", desc: "Child and adult vaccination following national health guidelines", icon: Syringe, span: "md:col-span-1" },
  { title: "Pharmacy", desc: "Prescription and over-the-counter medications", icon: Pill, span: "md:col-span-1" },
  { title: "Minor Surgery", desc: "Wound care, abscess drainage, and minor surgical procedures", icon: Scissors, span: "md:col-span-1" },
  { title: "Community Health Education", desc: "Health awareness programs and community outreach initiatives", icon: Users, span: "md:col-span-2" },
  { title: "Home-Based Care", desc: "Domiciliary services for elderly and housebound patients", icon: Home, span: "md:col-span-1" },
];

const Services = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / CARDS.length));
      setActiveIdx(Math.min(idx, CARDS.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="services" className="bg-warm-cream py-20 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-glow">What We Offer</span>
          <h2 className="mt-3 font-heading font-bold text-text-dark" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Comprehensive Healthcare Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-dark/70">
            From routine check-ups to specialized maternal care, we provide the full spectrum of community health services your family needs.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${c.span} rounded-2xl p-6 lg:p-8 bg-white border border-warm-cream-dark/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-default overflow-hidden relative`}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-teal-primary/5 group-hover:bg-teal-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center group-hover:bg-teal-primary group-hover:scale-110 transition-all">
                  <c.icon className="w-6 h-6 text-teal-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-4 font-semibold text-lg text-text-dark font-body">{c.title}</h3>
                <p className="mt-2 text-sm text-text-dark/60">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div ref={scrollRef} className="services-carousel scrollbar-hide overflow-x-auto flex gap-4 px-1 pb-4">
            {CARDS.map((c) => (
              <div key={c.title} className="snap-center flex-shrink-0 w-[80vw] max-w-[320px] rounded-2xl p-6 bg-white border border-warm-cream-dark/50 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center">
                  <c.icon className="w-6 h-6 text-teal-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-lg text-text-dark font-body">{c.title}</h3>
                <p className="mt-2 text-sm text-text-dark/60">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-4">
            {CARDS.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeIdx ? "bg-teal-primary" : "bg-text-dark/20"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;