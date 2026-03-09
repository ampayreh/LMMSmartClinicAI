import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const OutpatientCarePage = () => {
  useSEO({ title: "Outpatient & Family Care", description: "General consultations, diagnosis, and treatment for patients of all ages at Lynda Michelle Medical Centre." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <Link to="/services" className="text-sm text-primary font-medium hover:underline">← All Services</Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">Outpatient & Family Care</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Walk-in and planned consultations for acute illness, chronic conditions, preventive health, and general family healthcare — for patients of all ages.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          {[
            { title: "General Consultations", desc: "See a clinician for diagnosis and treatment of common conditions — fever, infections, respiratory illness, pain management, skin conditions, and more.", items: ["Clinical assessment and diagnosis", "Treatment and prescription", "Referral to specialists when needed", "Follow-up care planning"] },
            { title: "Chronic Disease Management", desc: "Ongoing care for patients managing conditions like hypertension, diabetes, and other chronic illnesses.", items: ["Regular health monitoring", "Medication management", "Lifestyle and nutrition counseling", "Blood sugar and blood pressure checks"] },
            { title: "Minor Surgery & Wound Care", desc: "On-site management of wounds, suturing, abscess drainage, and other minor surgical procedures.", items: ["Wound cleaning and dressing", "Suturing", "Abscess incision and drainage", "Post-procedure follow-up"] },
            { title: "Child & Paediatric Care", desc: "Healthcare for infants, children, and adolescents — illness treatment, growth monitoring, and immunization.", items: ["Paediatric consultations", "Immunization per national schedule", "Growth and nutrition monitoring", "Common childhood illness treatment"] },
          ].map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">When to seek urgent care</h3>
                <p className="text-sm text-muted-foreground">For severe chest pain, difficulty breathing, uncontrolled bleeding, seizures, loss of consciousness, or snake bites — come immediately or call +256 741 008 049.</p>
              </div>
            </div>
          </div>

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

export default OutpatientCarePage;
