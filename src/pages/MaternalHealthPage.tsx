import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const MaternalHealthPage = () => {
  useSEO({ title: "Maternal, Reproductive & Child Health", description: "Comprehensive maternal and reproductive health services at Lynda Michelle Medical Centre: antenatal care, safe deliveries, family planning, postnatal support." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <Link to="/services" className="text-sm text-primary font-medium hover:underline">← All Services</Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">Maternal, Reproductive & Child Health</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Our flagship service area: comprehensive care for mothers, children, and families at every stage, led by our experienced registered midwife in partnership with Marie Stopes Uganda.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            {[
              { title: "Antenatal Care (ANC)", who: "Expectant mothers at any stage of pregnancy.", what: ["Initial pregnancy confirmation and health assessment", "Regular check-ups throughout pregnancy", "Nutrition counseling and supplement guidance", "Birth preparation and delivery planning", "Referral coordination for high-risk pregnancies"], expect: "Your first visit includes a comprehensive health check, pregnancy test, and creation of your ANC card. Follow-up visits monitor your progress and baby's development." },
              { title: "Safe Deliveries", who: "Mothers ready to deliver in a supported, clinical environment.", what: ["Skilled birth attendance by a registered midwife", "Clean, equipped delivery environment", "Essential newborn care", "Mama kit provision", "Immediate postnatal monitoring"], expect: "Our midwife will guide you through delivery with professional, compassionate support. Emergency referral protocols are in place for complications." },
              { title: "Family Planning", who: "Women, men, and couples seeking reproductive health choices.", what: ["Oral contraceptives", "Injectable contraceptives", "Implants (Implanon, Jadelle)", "Intrauterine devices (IUD)", "Emergency contraception", "Counseling for informed choice"], expect: "A confidential counseling session to discuss your options, followed by your chosen method. All methods include follow-up support." },
              { title: "Postnatal & Post-Abortion Care", who: "Mothers after delivery or pregnancy loss.", what: ["Postnatal health assessment for mother and baby", "Breastfeeding support", "Post-abortion care and counseling", "Family planning counseling", "Immunization for newborns"], expect: "Supportive, non-judgmental care focused on your recovery and wellbeing." },
              { title: "Youth-Friendly SRH Services", who: "Young people seeking sexual and reproductive health information and services.", what: ["Confidential counseling", "Family planning information", "STI screening and treatment", "Reproductive health education"], expect: "A safe, private, non-judgmental environment. Your privacy is protected." },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-heading font-bold text-foreground mb-2">{s.title}</h2>
                <p className="text-sm text-primary font-medium mb-3">Who is this for: {s.who}</p>
                <h3 className="text-sm font-semibold text-foreground mb-2">What's included:</h3>
                <ul className="space-y-1.5 mb-4">
                  {s.what.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
                <h3 className="text-sm font-semibold text-foreground mb-1">What to expect:</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.expect}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">When to seek urgent care</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">If you experience severe bleeding, high fever, severe headache or vision changes during pregnancy, reduced baby movement, or difficulty breathing, please come to the clinic immediately or call +256 741 008 049.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors">
              Book a Visit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MaternalHealthPage;
