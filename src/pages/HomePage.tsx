import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Stethoscope, TestTube, Users, Shield, Clock, MapPin, Phone, ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import heroImage from "@/assets/hero-consultation.png";
import clinicImage from "@/assets/clinic-exterior.png";
import founderImage from "@/assets/team-lydia.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SERVICES = [
  { icon: Heart, title: "Maternal & Reproductive Health", desc: "Antenatal care, safe deliveries, family planning, and postnatal support for mothers and families.", href: "/services/maternal-health" },
  { icon: Stethoscope, title: "Outpatient & Family Care", desc: "General consultations, diagnosis, treatment, and preventive care for patients of all ages.", href: "/services/outpatient-care" },
  { icon: TestTube, title: "Lab, Diagnostics & Pharmacy", desc: "On-site laboratory testing, rapid diagnostics, and a well-stocked pharmacy.", href: "/services/lab-diagnostics" },
  { icon: Users, title: "Community Outreach", desc: "Health education, immunization drives, home-based care, and community health promotion.", href: "/services/community-outreach" },
];

const STATS = [
  { value: "2012", label: "Established" },
  { value: "9,700+", label: "People Served" },
  { value: "8", label: "Core Services" },
  { value: "6 Days", label: "Weekly Access" },
];

const PARTNERS = ["Marie Stopes Uganda", "Ministry of Health", "Joint Medical Stores", "Wakiso District Health"];

const FAQ_PREVIEW = [
  { q: "Do I need an appointment?", a: "No. Walk-in consultations are welcome Monday through Saturday, 8:00 AM to 6:00 PM. For planned visits, you may call ahead to reduce wait times." },
  { q: "What should I bring to my first visit?", a: "Bring any previous medical records, a list of current medications, and a valid form of identification. For antenatal care, bring your ANC card if you have one." },
  { q: "Is maternal care available for first-time mothers?", a: "Absolutely. We provide comprehensive antenatal care, safe delivery services, and postnatal follow-up. Our experienced midwife will guide you through every step." },
  { q: "How do I reach the clinic?", a: "We are located at Plot 1246, Budo-Kimbejja, Nsangi Sub-County, Wakiso District. The clinic is accessible from Buddo, Kyengera, and surrounding areas." },
];

const HomePage = () => {
  useSEO({
    title: "Lynda Michelle Medical Centre | Trusted Healthcare in Budo-Kimbejja, Uganda",
    description: "Compassionate maternal, family, and outpatient care in Budo-Kimbejja, Nsangi, Wakiso District, Uganda. Trusted community healthcare since 2012.",
    canonical: "https://lyndamichellemed.com/",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest-dark overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Healthcare consultation at Lynda Michelle Medical Centre" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/95 to-forest-dark/60" />
        </div>
        <div className="relative container mx-auto px-6 py-24 md:py-32 lg:py-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-block bg-white/10 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/10">
              Community Healthcare Since 2012
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Compassionate Care for Every Family
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              Trusted maternal, family, and outpatient healthcare serving Budo-Kimbejja, Nsangi, and the wider Wakiso community. Founder-led. Woman-led. Community-rooted.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-forest-dark px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Book a Visit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about/impact" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof Bar */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">
              Comprehensive Healthcare, Close to Home
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              At the heart of our mission is the health of mothers and children. We provide comprehensive antenatal care, safe deliveries, family planning, postnatal support, and youth-friendly sexual and reproductive health services, all led by our experienced midwife in partnership with Marie Stopes Uganda.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Link to={s.href} className="group block bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
                        Learn more <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Kente Divider */}
      <div className="kente-stripe" />

      {/* Founder Trust Section */}
      <section className="py-20 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="relative">
                <img src={founderImage} alt="Lydia Idah Tugumisirize, Founder of Lynda Michelle Medical Centre" className="w-full max-w-md rounded-xl shadow-lg" />
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
                  Founder & Senior Midwife
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-4">
                Founded in Memory, Built with Purpose
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Lynda Michelle Medical Centre was founded by Lydia Idah Tugumisirize, a senior midwife and registered private nurse-midwife with decades of clinical and administrative experience.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Named in memory of Lynda Michelle Muhumuza, the centre carries forward a deeply personal mission: ensuring every mother, child, and family in Budo-Kimbejja has access to dignified, professional care.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                What began as a small community clinic has grown into a trusted healthcare institution serving thousands across Nsangi and the wider Wakiso District.
              </p>
              <Link to="/about/founder-story" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Read our full story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maternal Health Spotlight */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Strength</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-4">
                Maternal & Reproductive Health
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At the heart of our mission is the health of mothers and children. We provide comprehensive antenatal care, safe deliveries, family planning, postnatal support, and youth-friendly sexual and reproductive health services, all led by our experienced midwife in partnership with Marie Stopes Uganda.
              </p>
              <ul className="space-y-3 mb-6">
                {["Antenatal care and safe deliveries", "Family planning counseling and methods", "Postnatal and post-abortion care", "Youth-friendly SRH services"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <Shield className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/services/maternal-health" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold hover:bg-forest-light transition-colors">
                Maternal health services <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.15 }}>
              <img src={clinicImage} alt="Lynda Michelle Medical Centre facility in Budo-Kimbejja" className="w-full rounded-xl shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Reach */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">Community Impact</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3">
              Rooted in Our Community
            </h2>
            <p className="text-white/80 mt-4 leading-relaxed">
              We serve households, schools, churches, and trading centres across Budo-Kimbejja, Nsangi, Kyengera, and the wider Buddo corridor, reaching families where they live, work, and gather.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Community Health Education", desc: "Immunization-day outreach, health talks, and preventive care education for families and community groups." },
              { title: "Home-Based Care", desc: "Reaching elderly, homebound, and post-delivery patients through our domiciliary heritage and community health model." },
              { title: "Partnership Model", desc: "Collaborating with Marie Stopes Uganda, the Ministry of Health, and district health teams to extend quality services." },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="bg-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/about/impact" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Our impact and partnerships <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <span className="text-sm text-muted-foreground font-medium">Trusted Partners:</span>
            {PARTNERS.map((p) => (
              <span key={p} className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion Teaser */}
      <section className="py-20 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Looking Ahead</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-4">
              Building the Future of Community Healthcare
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We are planning a phased expansion into a multi-service hospital facility — including expanded maternity capacity, advanced diagnostics, inpatient wards, and a modern surgical theatre. This is our vision for the next chapter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/future" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors">
                View expansion roadmap <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors">
                Partner with us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {FAQ_PREVIEW.map((faq, i) => (
              <motion.details key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }} className="group bg-card border border-border rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-foreground font-medium">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
              </motion.details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/faq" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View all FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 lg:py-24 bg-forest-dark">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Visit Us?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Walk-ins welcome Monday through Saturday. Call ahead or WhatsApp us to prepare for your visit.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-forest-dark px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Book a Visit <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/256741008049" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                WhatsApp Us
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/60">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Budo-Kimbejja, Nsangi</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +256 741 008 049</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Mon–Sat, 8AM–6PM</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
