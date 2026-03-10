import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const LabDiagnosticsPage = () => {
  useSEO({ title: "Lab, Diagnostics & Pharmacy", description: "On-site laboratory testing, rapid diagnostics, and a well-stocked pharmacy at Lynda Michelle Medical Centre." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <Link to="/services" className="text-sm text-primary font-medium hover:underline">← All Services</Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">Lab, Diagnostics & Pharmacy</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">On-site rapid diagnostic testing and a well-stocked pharmacy, ensuring fast, accurate diagnosis and immediate access to essential medicines.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4">Laboratory & Rapid Diagnostics</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Our on-site laboratory provides same-day results for a range of essential tests, conducted by trained lab staff.</p>
            <h3 className="text-sm font-semibold text-foreground mb-2">Available Tests:</h3>
            <ul className="grid sm:grid-cols-2 gap-2 mb-4">
              {["Malaria Rapid Diagnostic Test (RDT)", "HIV testing (confidential)", "Syphilis screening", "Pregnancy test (HCG)", "H. Pylori test", "Blood sugar (Random Blood Sugar)", "Urinalysis"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />{t}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">Results are typically available the same day. All testing follows standard clinical protocols. HIV testing is confidential, with counseling support available through our partnership with PEPFAR-supported programmes. [VERIFY CURRENT RELATIONSHIP]</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4">Pharmacy</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Our on-site pharmacy stocks essential medicines for common conditions, maternal health, chronic disease, paediatric care, and pain management. Medicines are sourced through Joint Medical Stores and other approved suppliers.</p>
            <h3 className="text-sm font-semibold text-foreground mb-2">Categories Available:</h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {["Antimalarials", "Antibiotics", "Pain management", "Maternal health supplements", "Hypertension & diabetes medicines", "Paediatric formulations", "Wound care supplies", "IV fluids & injectables"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />{t}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="text-center mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors">
              Book a Visit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LabDiagnosticsPage;
