import { motion } from "framer-motion";
import { Award, Users, MapPin, Handshake } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Award, title: "Licensed Health Unit", desc: "Registered and licensed to operate by Ugandan health authorities." },
  { icon: Users, title: "Experienced Team", desc: "Qualified clinical officers, midwives, and nurses with years of hands-on practice." },
  { icon: MapPin, title: "Local Community Focus", desc: "Rooted in Buddo-Kimbejja, serving families we know and live alongside." },
  { icon: Handshake, title: "Trusted Partnerships", desc: "Collaborating with Marie Stopes International and national health programs." },
];

const TrustSection = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">Why Families Trust Us</h2>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full kente-stripe" />
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
        {TRUST_ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl bg-card p-6 shadow-sm border border-border/50 text-center hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
