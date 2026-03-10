import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Shield, Users, Eye } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import clinicImage from "@/assets/clinic-exterior.png";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const TIMELINE = [
  { year: "Early Roots", title: "Nakasozi Domiciliary Clinic", desc: "The foundations of community-based care were established through domiciliary nursing and midwifery practice, serving families directly in their homes." },
  { year: "2012", title: "Lynda Michelle Medical Centre Founded", desc: "Named in memory of Lynda Michelle Muhumuza, the centre was established at Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District, formalizing years of community healthcare service." },
  { year: "Growth", title: "Expanding Services & Partnerships", desc: "The centre expanded to offer 8 core services, partnering with Marie Stopes Uganda for reproductive health and collaborating with the Ministry of Health and Joint Medical Stores." },
  { year: "Present", title: "A Trusted Community Institution", desc: "Today, Lynda Michelle Medical Centre serves thousands of patients annually across maternal health, outpatient care, diagnostics, pharmacy, and community outreach." },
  { year: "Future", title: "Hospital Expansion Vision", desc: "Plans are underway for a phased expansion into a multi-service hospital facility, including expanded maternity capacity, diagnostics, inpatient care, and surgical capability." },
];

const VALUES = [
  { icon: Heart, title: "Compassion", desc: "Every patient is treated with warmth, dignity, and respect, regardless of background or circumstance." },
  { icon: Shield, title: "Integrity", desc: "We are honest, transparent, and accountable in all aspects of care delivery and institutional governance." },
  { icon: Users, title: "Community", desc: "We are rooted in Budo-Kimbejja. Our programmes are designed around the real needs of our neighbours." },
  { icon: Eye, title: "Excellence", desc: "We pursue continuous improvement in clinical quality, patient safety, and service delivery." },
];

const AboutPage = () => {
  useSEO({ title: "About Us", description: "Learn about Lynda Michelle Medical Centre — a founder-led, woman-led community healthcare institution serving Budo-Kimbejja and Nsangi since 2012." });

  return (
    <>
      {/* Hero */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
                A Community Healthcare Institution, Built with Purpose
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Lynda Michelle Medical Centre is a founder-led, woman-led healthcare enterprise serving Budo-Kimbejja, Nsangi Sub-County, and the wider Wakiso District. We provide compassionate, family-centered primary healthcare rooted in the real needs of our community.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our institutional identity is anchored in maternal and reproductive health, but our services extend to outpatient care, diagnostics, pharmacy, immunization, and community health education.
              </p>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.15 }}>
              <img src={clinicImage} alt="Lynda Michelle Medical Centre exterior in Budo-Kimbejja" className="w-full rounded-xl shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">Institutional Timeline</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }} className="flex gap-6 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pb-2">
                  <span className="text-sm font-semibold text-primary">{item.year}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">Our Values</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Founder Story & Timeline", desc: "The personal journey behind our institutional mission.", href: "/about/founder-story" },
              { title: "Leadership & Governance", desc: "Our team, values, and commitment to quality.", href: "/about/leadership" },
              { title: "Impact & Partnerships", desc: "How we serve our community and collaborate for greater reach.", href: "/about/impact" },
            ].map((item) => (
              <Link key={item.href} to={item.href} className="group block border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/20 transition-all">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
