import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Stethoscope, TestTube, Users, Syringe, Pill, Scissors, Home, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const SERVICES = [
  { icon: Heart, title: "Maternal, Reproductive & Child Health", desc: "Antenatal care, safe deliveries, postnatal support, family planning, post-abortion care, and youth-friendly sexual and reproductive health services. Led by our experienced registered midwife in partnership with Marie Stopes Uganda.", href: "/services/maternal-health", highlight: true },
  { icon: Stethoscope, title: "Outpatient & Family Care", desc: "General consultations, diagnosis, and treatment for patients of all ages. Walk-in and planned visits for acute illness, chronic disease management, and preventive health.", href: "/services/outpatient-care", highlight: false },
  { icon: TestTube, title: "Laboratory & Diagnostics", desc: "On-site rapid diagnostic testing including malaria, HIV, syphilis, pregnancy, blood sugar, and H. Pylori. Results available same day.", href: "/services/lab-diagnostics", highlight: false },
  { icon: Pill, title: "Pharmacy", desc: "A well-stocked pharmacy with essential medicines for common conditions, maternal health, chronic disease, and paediatric care.", href: "/services/lab-diagnostics", highlight: false },
  { icon: Syringe, title: "Immunization", desc: "Child and adult vaccinations following the national immunization schedule, delivered as part of routine care and community outreach days.", href: "/services/community-outreach", highlight: false },
  { icon: Scissors, title: "Minor Surgery & Wound Care", desc: "Wound management, suturing, abscess drainage, and other minor surgical procedures performed on-site.", href: "/services/outpatient-care", highlight: false },
  { icon: Users, title: "Community Health Education", desc: "Outreach programmes, immunization-day education, and community-based health promotion targeting families, schools, and local groups.", href: "/services/community-outreach", highlight: false },
  { icon: Home, title: "Home-Based Care", desc: "Visits for elderly, homebound, and post-delivery patients, continuing our domiciliary care heritage.", href: "/services/community-outreach", highlight: false },
];

const ServicesPage = () => {
  useSEO({ title: "Our Services", description: "Explore the 8 core healthcare services offered at Lynda Michelle Medical Centre, from maternal health and outpatient care to diagnostics, pharmacy, and community outreach." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Comprehensive Primary Healthcare
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We deliver 8 core healthcare services designed around the needs of families in peri-urban Wakiso. From pregnancy through childhood, illness to wellness, our team provides continuous, compassionate care close to home.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}>
                <Link to={s.href} className={`group block h-full rounded-xl p-6 md:p-8 border transition-all hover:shadow-lg ${s.highlight ? "bg-primary/5 border-primary/20 hover:border-primary/40" : "bg-card border-border hover:border-primary/20"}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${s.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10"}`}>
                      <s.icon className={`w-6 h-6 ${s.highlight ? "" : "text-primary"}`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</h2>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Need Care? We're Here for You.</h2>
          <p className="text-white/80 mb-6">Walk-ins welcome Monday to Saturday, 8 AM to 6 PM.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-forest-dark px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Book a Visit
            </Link>
            <a href="https://wa.me/256741008049" target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
