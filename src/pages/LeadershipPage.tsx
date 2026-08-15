import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Heart, Eye, Users } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import lydiaImage from "@/assets/team-lydia.jpeg";
import joshuaImage from "@/assets/team-joshua.jpeg";
import jenniferImage from "@/assets/team-jennifer.jpeg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const TEAM = [
  { name: "Lydia Idah Tugumisirize", role: "Founder & Senior Midwife", bio: "Registered private nurse-midwife with decades of clinical experience. Founded LMM to bring dignified maternal and community care to Budo-Kimbejja.", image: lydiaImage },
  { name: "Dr. Joshua Tugumisirize", role: "Medical Director", bio: "Leads clinical operations and quality assurance at the centre.", image: joshuaImage },
  { name: "Jenipher Nakyejjusa", role: "Registered Midwife", bio: "Leads the maternal health programme, including antenatal care, deliveries, and family planning services.", image: jenniferImage },
  { name: "Graeme Tobias Ampeire", role: "Director of Operations & Strategy", bio: "Oversees operational management, strategic planning, and institutional development.", image: null },
];

const LeadershipPage = () => {
  useSEO({ title: "Leadership & Governance", description: "Meet the leadership team at Lynda Michelle Medical Centre: our values, governance approach, and commitment to quality healthcare." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <Link to="/about" className="text-sm text-primary font-medium hover:underline">← About Us</Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">Leadership & Governance</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">A founder-led institution committed to clinical quality, patient safety, and community accountability.</p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground">Our Team</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="aspect-[4/5] bg-muted flex items-center justify-center">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-heading font-bold text-muted-foreground/30">{m.name.split(" ").map(n => n[0]).join("")}</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground">{m.name}</h3>
                  <p className="text-sm text-primary font-medium">{m.role}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Values */}
      <section className="py-20 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground">How We Work</h2>
            <p className="text-muted-foreground mt-2">Our institutional commitments to patients and the community.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: "Patient Privacy & Confidentiality", desc: "All patient information is treated with strict confidentiality. HIV testing, family planning, and SRH services are delivered in private settings." },
              { icon: Heart, title: "Respectful & Dignified Care", desc: "Every patient is treated with warmth and respect. We do not tolerate discrimination based on age, gender, condition, or background." },
              { icon: Eye, title: "Quality Assurance", desc: "We follow clinical protocols, maintain proper records, and pursue continuous improvement in care delivery and patient outcomes." },
              { icon: Users, title: "Feedback & Accountability", desc: "We welcome patient feedback and community input. Concerns can be raised directly at the clinic or via our contact channels." },
            ].map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="bg-card border border-border rounded-xl p-6">
                <v.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <Link to="/about/impact" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            See our impact & partnerships <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default LeadershipPage;
