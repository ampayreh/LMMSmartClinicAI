import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import founderImage from "@/assets/team-lydia.jpeg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const FounderStoryPage = () => {
  useSEO({ title: "Founder Story & Institutional Timeline", description: "The story of Lydia Idah Tugumisirize and the founding of Lynda Michelle Medical Centre — from domiciliary care roots to a trusted community health institution." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <Link to="/about" className="text-sm text-primary font-medium hover:underline">← About Us</Link>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">Founded in Memory, Built with Purpose</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">The deeply personal story behind a community healthcare institution.</p>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.15 }}>
              <img src={founderImage} alt="Lydia Idah Tugumisirize, Founder" className="w-full max-w-sm rounded-xl shadow-lg mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-heading font-bold text-foreground">Lydia Idah Tugumisirize</h2>
            <p className="text-muted-foreground leading-relaxed">Lydia Idah Tugumisirize is a senior midwife and registered private nurse-midwife with a long clinical and administrative background spanning decades of service. Her career has been defined by a commitment to maternal and community health — particularly for underserved families in peri-urban Uganda.</p>
            <p className="text-muted-foreground leading-relaxed">Before establishing Lynda Michelle Medical Centre, Lydia's care roots included Nakasozi Domiciliary Clinic, where she provided home-based nursing and midwifery services directly to families in their homes — a practice that continues to shape the institution's community-oriented approach.</p>

            <h2 className="text-2xl font-heading font-bold text-foreground mt-10">The Memorial Origin</h2>
            <p className="text-muted-foreground leading-relaxed">Lynda Michelle Medical Centre is named in memory of Lynda Michelle Muhumuza. This memorial origin anchors the institution in a deeply personal mission: ensuring that families in Budo-Kimbejja and Nsangi have access to dignified, professional, and compassionate healthcare.</p>

            <h2 className="text-2xl font-heading font-bold text-foreground mt-10">From Clinic to Institution</h2>
            <p className="text-muted-foreground leading-relaxed">Established in 2012 at Plot 1246, Budo-Kimbejja, the centre has grown from a small community clinic into a trusted healthcare institution offering 8 core services, partnering with Marie Stopes Uganda for reproductive health, and collaborating with the Ministry of Health and Joint Medical Stores.</p>
            <p className="text-muted-foreground leading-relaxed">Today, Lynda Michelle Medical Centre is a founder-led, woman-led, family-owned healthcare enterprise — operationally serious, community-rooted, and planning for growth.</p>
          </motion.div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/about/leadership" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold hover:bg-forest-light transition-colors">
              Leadership & Governance <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about/impact" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-lg font-medium hover:bg-muted transition-colors">
              Impact & Partnerships
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FounderStoryPage;
