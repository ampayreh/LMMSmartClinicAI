import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const FAQS = [
  { cat: "Visiting Us", items: [
    { q: "Do I need an appointment?", a: "No. Walk-in consultations are welcome Monday through Saturday, 8:00 AM to 6:00 PM. For planned visits or maternal care, you may call ahead on +256 741 008 049 to reduce wait times." },
    { q: "What should I bring to my first visit?", a: "Bring any previous medical records, a list of current medications, and a valid ID. For antenatal care, bring your ANC card if you have one." },
    { q: "How do I get to the clinic?", a: "We are located at Plot 1246, Budo-Kimbejja, Nsangi Sub-County, Wakiso District. We are accessible from Buddo, Kyengera, and the surrounding Nsangi area. WhatsApp us at +256 741 008 049 for directions." },
    { q: "Do you accept walk-ins on Sundays?", a: "Sunday services are limited to emergency cases only. For non-urgent needs, please visit us Monday through Saturday." },
  ]},
  { cat: "Maternal & Family Planning", items: [
    { q: "Is maternal care available for first-time mothers?", a: "Yes. We provide comprehensive antenatal care for first-time and experienced mothers, including health checks, counseling, nutrition guidance, and delivery preparation." },
    { q: "What family planning methods are available?", a: "We offer a range of methods including oral contraceptives, injectables, implants, IUDs, and emergency contraception. All methods include free counseling to help you make an informed choice." },
    { q: "Can I come in for postnatal checkups?", a: "Absolutely. We provide postnatal follow-up care for both mother and baby, including health assessments, breastfeeding support, and immunizations." },
  ]},
  { cat: "Lab & Services", items: [
    { q: "What lab tests do you offer?", a: "We offer rapid tests for malaria, HIV, syphilis, pregnancy (HCG), H. Pylori, and blood sugar, among others. Results are typically available the same day." },
    { q: "Do you have a pharmacy?", a: "Yes. Our on-site pharmacy stocks essential medicines for common conditions. Your clinician will prescribe what you need and you can collect it on-site." },
    { q: "Do you perform surgeries?", a: "We perform minor surgical procedures such as wound care, suturing, and abscess drainage. For major surgeries, we refer patients to partner facilities." },
  ]},
  { cat: "Payments & Practical", items: [
    { q: "What payment methods do you accept?", a: "We accept cash and mobile money. Please confirm specific payment options at the front desk when you arrive." },
    { q: "Do you offer outreach or home visits?", a: "Yes. We conduct community health education, immunization outreach, and home-based care visits for elderly, homebound, and post-delivery patients." },
    { q: "Can I reach you on WhatsApp?", a: "Yes. You can WhatsApp us at +256 741 008 049 for inquiries, directions, or to prepare for your visit." },
  ]},
];

const FAQPage = () => {
  useSEO({ title: "Frequently Asked Questions", description: "Find answers to common questions about visiting Lynda Michelle Medical Centre: appointments, maternal care, lab tests, payments, and more." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Everything you need to know about visiting Lynda Michelle Medical Centre. Can't find your answer? <Link to="/contact" className="text-primary font-medium underline">Contact us</Link>.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          {FAQS.map((section, si) => (
            <motion.div key={section.cat} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: si * 0.05 }} className="mb-10">
              <h2 className="text-xl font-heading font-bold text-foreground mb-4">{section.cat}</h2>
              <div className="space-y-3">
                {section.items.map((faq, i) => (
                  <details key={i} className="group bg-card border border-border rounded-lg">
                    <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-foreground font-medium text-sm">
                      {faq.q}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform shrink-0 ml-2" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="text-center pt-6">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors">
              Contact us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
