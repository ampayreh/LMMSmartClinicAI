import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 overflow-hidden">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-5 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">Our Story</h2>
            <div className="h-1 w-16 rounded-full kente-stripe" />
            <p className="text-base leading-relaxed text-muted-foreground">
              Founded in 2019 in the heart of Buddo-Kimbejja, Lynda Michelle Medical Centre began with a
              simple mission: to provide accessible, compassionate healthcare to every family in our community.
              We focus on maternal and child health, family planning, and preventive care — the services our
              community needs most.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Our dedicated team of licensed clinical officers, midwives, and nurses deliver comprehensive
              care — from antenatal visits and safe deliveries to laboratory diagnostics and immunization.
              We partner with Marie Stopes International and national health programs to ensure the highest
              standards of reproductive and preventive healthcare.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              ✦ Licensed by the Uganda Medical &amp; Dental Practitioners Council
            </div>
          </motion.div>

          <motion.div className="lg:col-span-3 relative" style={{ y: imageY }}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 35% 35%, hsl(37 92% 50% / 0.2) 0%, transparent 50%), radial-gradient(circle at 65% 65%, hsl(178 80% 25% / 0.18) 0%, transparent 50%), radial-gradient(circle at 50% 80%, hsl(4 82% 80% / 0.15) 0%, transparent 40%)",
                  backgroundColor: "hsl(39 100% 97%)",
                }}
              />
              <svg className="absolute inset-0 m-auto w-20 h-20 text-primary/8" viewBox="0 0 100 100" fill="currentColor">
                <rect x="35" y="10" width="30" height="80" rx="4" />
                <rect x="10" y="35" width="80" height="30" rx="4" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
