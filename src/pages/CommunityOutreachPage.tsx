import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const CommunityOutreachPage = () => {
  useSEO({ title: "Community Outreach & Home-Based Care", description: "Community health education, immunization outreach, and home-based care services from Lynda Michelle Medical Centre." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <Link to="/services" className="text-sm text-primary font-medium hover:underline">← All Services</Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">Community Outreach & Home-Based Care</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Extending healthcare beyond our clinic walls — through community education, immunization outreach, and home visits for those who need care where they live.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          {[
            { title: "Community Health Education", desc: "We conduct health education programmes during immunization days, through community gatherings, and in partnership with local leaders, schools, and churches.", items: ["Immunization-day health talks", "Maternal and child health education", "Family planning awareness", "Disease prevention and hygiene", "Youth reproductive health education"] },
            { title: "Immunization Outreach", desc: "Child and adult vaccinations delivered as part of the national immunization schedule, both at the clinic and through community outreach activities.", items: ["Routine childhood immunizations", "Adult vaccination support", "Community immunization days", "Record-keeping and follow-up"] },
            { title: "Home-Based Care", desc: "Continuing our domiciliary care heritage, we provide home visits for elderly, homebound, and post-delivery patients who cannot easily travel to the clinic.", items: ["Elderly patient home visits", "Post-delivery home follow-up", "Chronic disease monitoring at home", "Medication management support"] },
          ].map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <div className="text-center mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunityOutreachPage;
