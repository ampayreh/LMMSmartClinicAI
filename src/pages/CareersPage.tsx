import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Lightbulb } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const CareersPage = () => {
  useSEO({ title: "Careers", description: "Join Lynda Michelle Medical Centre. Meaningful healthcare work rooted in community service, dignity, and growth." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Careers</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-6">Work With Us</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Join a team that delivers compassionate, community-rooted healthcare. At Lynda Michelle Medical Centre, your work directly impacts the health and wellbeing of families in Budo-Kimbejja and beyond.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Heart, title: "Meaningful Work", desc: "Every day you'll serve patients and families who depend on accessible, dignified care." },
              { icon: Users, title: "Community Roots", desc: "Be part of an institution that is deeply embedded in the community it serves." },
              { icon: Lightbulb, title: "Room to Grow", desc: "As we expand toward hospital-level services, there will be increasing opportunities for professional development." },
            ].map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="bg-card border border-border rounded-xl p-6 text-center">
                <v.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-3">Current Openings</h2>
            <p className="text-muted-foreground mb-6">We don't have specific vacancies listed at this time. However, we welcome expressions of interest from qualified healthcare professionals, particularly in midwifery, nursing, laboratory services, and community health.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors">
              Express Interest <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-sm text-muted-foreground mt-4">Select "Career Interest" as your inquiry type on the contact form.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
