import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Handshake, Target } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const PARTNERS = [
  { name: "Marie Stopes Uganda", desc: "Partnership for family planning and reproductive health services.", status: "Active" },
  { name: "Ministry of Health, Uganda", desc: "Training collaboration and health system alignment.", status: "Active" },
  { name: "Joint Medical Stores (JMS)", desc: "Essential medicine and supply chain partner.", status: "Active" },
  { name: "Wakiso District Health", desc: "District-level outreach and health coordination.", status: "Active" },
  { name: "PEPFAR / USAID", desc: "HIV testing, prevention, and treatment support programmes.", status: "[VERIFY CURRENT RELATIONSHIP]" },
];

const ImpactPage = () => {
  useSEO({ title: "Impact & Partnerships", description: "How Lynda Michelle Medical Centre serves the Budo-Kimbejja community — our catchment area, outreach model, and partnerships." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <Link to="/about" className="text-sm text-primary font-medium hover:underline">← About Us</Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">Impact & Partnerships</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">How we serve our community and collaborate with partners to extend quality healthcare across peri-urban Wakiso.</p>
          </motion.div>
        </div>
      </section>

      {/* Catchment */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-heading font-bold text-foreground">Our Catchment Area</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">Lynda Michelle Medical Centre serves the peri-urban communities of Budo-Kimbejja, Nsangi Sub-County, and the wider Wakiso District corridor. Our patients come from households, schools, churches, and trading centres across:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {["Budo-Kimbejja", "Nsangi Sub-County", "Buddo", "Kyengera", "Surrounding trading centres", "Peri-urban Wakiso households"].map((area) => (
                <div key={area} className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {area}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Reach */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Users, value: "9,700+", label: "People served over 3 years" },
              { icon: Target, value: "8", label: "Core healthcare services" },
              { icon: Handshake, value: "4+", label: "Active partnerships" },
            ].map((s) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <s.icon className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <div className="text-3xl font-heading font-bold text-white">{s.value}</div>
                <div className="text-sm text-white/70 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <h2 className="text-3xl font-heading font-bold text-foreground">Our Partners</h2>
            <p className="text-muted-foreground mt-2">We collaborate with established institutions to deliver quality, accessible healthcare.</p>
          </motion.div>
          <div className="space-y-4">
            {PARTNERS.map((p, i) => (
              <motion.div key={p.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }} className="bg-card border border-border rounded-xl p-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${p.status === "Active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{p.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-3">Interested in Partnering?</h2>
          <p className="text-muted-foreground mb-6">We welcome NGOs, donors, government agencies, and strategic partners committed to community healthcare.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ImpactPage;
