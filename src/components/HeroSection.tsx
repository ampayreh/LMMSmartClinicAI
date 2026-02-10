import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin } from "lucide-react";

const charVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.03, duration: 0.4 },
  }),
};

const headline = "Family-Centered Healthcare for Every Stage of Life";

const HeroSection = () => (
  <section className="relative min-h-screen">
    <div className="flex flex-col-reverse lg:flex-row min-h-screen">
      {/* Left — Text */}
      <div className="relative flex flex-col justify-center bg-charcoal px-6 py-16 lg:w-[45%] lg:px-12 xl:px-20 lg:py-24">
        <div className="kente-stripe absolute top-0 left-0 right-0 h-2" />

        <motion.h1
          className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-[1.15]"
          initial="hidden"
          animate="visible"
          aria-label={headline}
        >
          {headline.split("").map((char, i) => (
            <motion.span key={i} variants={charVariant} custom={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Affordable, compassionate, and respectful care for women, children, and the wider community in Buddo-Kimbejja, Wakiso District.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="https://wa.me/256702322356"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
          <a
            href="tel:+256702322356"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <a
            href="https://maps.google.com/?q=Budo-Kimbejja,+Nsangi,+Wakiso+District,+Uganda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <MapPin className="h-4 w-4" />
            Get Directions
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/50"
        >
          <span>✦ Licensed Health Unit</span>
          <span>✦ Experienced Team</span>
          <span>✦ Est. 2019</span>
        </motion.div>
      </div>

      {/* Right — Image placeholder with gradient mesh */}
      <div className="relative flex items-center justify-center bg-cream lg:w-[55%] min-h-[50vh] lg:min-h-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, hsl(37 92% 50% / 0.25) 0%, transparent 50%), radial-gradient(circle at 70% 60%, hsl(178 80% 25% / 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 80%, hsl(4 82% 80% / 0.2) 0%, transparent 45%)",
          }}
        />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: [180, 220, 160][i],
              height: [180, 220, 160][i],
              left: ["20%", "55%", "40%"][i],
              top: ["25%", "50%", "15%"][i],
              background: [
                "hsl(37 92% 50% / 0.15)",
                "hsl(178 80% 25% / 0.12)",
                "hsl(4 82% 80% / 0.15)",
              ][i],
            }}
            animate={{
              scale: [1, 1.15, 1],
              borderRadius: ["40% 60% 60% 40%", "60% 40% 40% 60%", "40% 60% 60% 40%"],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
          />
        ))}
        <svg className="relative z-10 w-24 h-24 text-primary/10" viewBox="0 0 100 100" fill="currentColor">
          <rect x="35" y="10" width="30" height="80" rx="4" />
          <rect x="10" y="35" width="80" height="30" rx="4" />
        </svg>
      </div>
    </div>
  </section>
);

export default HeroSection;
