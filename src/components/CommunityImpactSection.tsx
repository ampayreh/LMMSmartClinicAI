import { motion } from "framer-motion";
import { Users, ShieldCheck, HeartHandshake } from "lucide-react";

const IMPACTS = [
  {
    icon: Users,
    title: "Adolescent Reproductive Health",
    desc: "We run community outreach programs to educate young people on reproductive health, family planning, and prevention of sexually transmitted infections.",
  },
  {
    icon: ShieldCheck,
    title: "Preventive Care & Immunization",
    desc: "Regular vaccination drives and health screening campaigns keep our community protected against preventable diseases.",
  },
  {
    icon: HeartHandshake,
    title: "Community Health Education",
    desc: "Health awareness sessions on maternal nutrition, hygiene, and disease prevention — empowering families with knowledge.",
  },
];

const CommunityImpactSection = () => (
  <section id="community" className="py-20 md:py-28 bg-primary/5">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">Community Impact</h2>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full kente-stripe" />
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Beyond clinic walls, we invest in the health and well-being of the wider Buddo-Kimbejja community.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
        {IMPACTS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="rounded-3xl bg-card p-7 shadow-sm border border-border/50 text-center hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CommunityImpactSection;
