import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import futureImage from "@/assets/future-hospital.png";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const PHASES = [
  {
    phase: "Phase 0: Current Platform",
    status: "Active",
    desc: "The existing clinic at Plot 1246, Budo-Kimbejja serves as the operational foundation, delivering 8 core services, serving 9,700+ people, and demonstrating sustained community demand.",
    items: ["Maternal & reproductive health services", "Outpatient consultations & pharmacy", "Laboratory & rapid diagnostics", "Community outreach & immunization", "Established partnerships with Marie Stopes Uganda & JMS"],
  },
  {
    phase: "Phase 1: Foundation & Systems",
    status: "Planned",
    desc: "Strengthening the operational core: expanded maternity capacity, digital management systems, supply chain security, outreach vehicle, and essential infrastructure upgrades.",
    items: ["Expanded maternity wing", "Digital clinic management system", "Stock security & JMS supply chain", "Outreach vehicle for community health", "Staff training & development"],
  },
  {
    phase: "Phase 2: Diagnostics & Service Deepening",
    status: "Planned",
    desc: "Adding advanced diagnostic capability and expanding the range of services, including ultrasound, enhanced laboratory, and specialist consultation capacity.",
    items: ["Advanced diagnostic equipment", "Enhanced laboratory services", "Specialist consultation capacity", "Expanded pharmacy inventory"],
  },
  {
    phase: "Phase 3: Hospital Infrastructure",
    status: "Vision",
    desc: "The full hospital buildout: inpatient wards, private rooms, modern surgical theatre, staff housing, community spaces, and full accessibility features.",
    items: ["Inpatient wards & private rooms", "Modern surgical theatre", "Staff & nurse housing", "Community meeting spaces", "Full accessibility: ramps, parking, signage"],
  },
];

const FutureHospitalPage = () => {
  useSEO({ title: "Future Hospital & Expansion", description: "Our phased expansion plan, from community clinic to multi-service hospital facility. Learn about our vision for the future of healthcare in Budo-Kimbejja." });

  return (
    <>
      <section className="relative bg-forest-dark overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0">
          <img src={futureImage} alt="Planned hospital expansion for Lynda Michelle Medical Centre" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/90 to-forest-dark/70" />
        </div>
        <div className="relative container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">Our Vision</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3 mb-6">
              Building the Future of Community Healthcare
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              We are planning a disciplined, phased expansion from our current clinic platform into a comprehensive multi-service hospital facility, one that meets the growing healthcare needs of Budo-Kimbejja and the wider Nsangi community.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Expansion Roadmap</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">Phased Growth Strategy</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {PHASES.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <h3 className="text-xl font-heading font-bold text-foreground">{p.phase}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    p.status === "Active" ? "bg-green-100 text-green-800" :
                    p.status === "Planned" ? "bg-blue-100 text-blue-800" :
                    "bg-amber-100 text-amber-800"
                  }`}>{p.status}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Partner in This Vision</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            We welcome strategic partners, donors, and investors who share our commitment to expanding community healthcare access in Uganda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-forest-dark px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2">
              Partner With Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about/impact" className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Our Impact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FutureHospitalPage;
