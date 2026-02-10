import { motion } from "framer-motion";
import {
  Baby,
  Stethoscope,
  FlaskConical,
  Syringe,
  Pill,
  Heart,
  Home,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  colSpan: string;
  rowSpan: string;
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    icon: Baby,
    title: "Antenatal & Delivery Care",
    desc: "Comprehensive pregnancy monitoring, safe deliveries by experienced midwives, and postnatal follow-up for mother and baby.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    featured: true,
  },
  {
    icon: Heart,
    title: "Family Planning",
    desc: "Injectable contraceptives, IUD and implant insertions and removals, and reproductive health counselling.",
    colSpan: "md:col-span-2",
    rowSpan: "",
  },
  {
    icon: Syringe,
    title: "Immunization",
    desc: "Child and adult vaccination following national health guidelines and schedules.",
    colSpan: "",
    rowSpan: "",
  },
  {
    icon: FlaskConical,
    title: "Laboratory & Diagnostics",
    desc: "HIV, typhoid, syphilis, HCG, blood sugar testing and more — results the same day.",
    colSpan: "",
    rowSpan: "",
  },
  {
    icon: Stethoscope,
    title: "Outpatient Care",
    desc: "General consultation, diagnosis, and treatment for everyday health needs.",
    colSpan: "md:col-span-2",
    rowSpan: "",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    desc: "Prescription and over-the-counter medications available on-site at affordable prices.",
    colSpan: "md:col-span-2",
    rowSpan: "",
  },
  {
    icon: Home,
    title: "Home-Based Care",
    desc: "Domiciliary services for elderly and housebound patients in the community.",
    colSpan: "md:col-span-2",
    rowSpan: "",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">Our Services</h2>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full kente-stripe" />
      </motion.div>

      {/* Desktop bento grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group rounded-3xl p-6 shadow-sm border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${s.colSpan} ${s.rowSpan} ${
              s.featured
                ? "bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent"
                : "bg-card"
            }`}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl mb-4 ${
              s.featured ? "bg-secondary/20 text-secondary" : "bg-primary/10 text-primary"
            } transition-colors group-hover:bg-primary group-hover:text-primary-foreground`}>
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className={`font-heading font-semibold text-foreground mb-2 ${s.featured ? "text-xl" : "text-base"}`}>
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile horizontal carousel */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto services-carousel flex gap-4 pb-4">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex-shrink-0 w-[85vw] max-w-xs rounded-3xl bg-card p-6 shadow-sm border border-border/50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
