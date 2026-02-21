import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { quote: "The care my family received during my pregnancy was exceptional. The midwives were so patient and thorough with every check-up.", name: "Sarah M.", loc: "Budo-Kimbejja" },
  { quote: "I bring all my children here for immunizations. The staff always explains everything clearly and makes the children feel comfortable.", name: "Robert K.", loc: "Nsangi" },
  { quote: "Their laboratory is reliable and quick. I got my test results the same day, which helped my doctor start treatment immediately.", name: "Grace N.", loc: "Wakiso" },
  { quote: "The home-based care service has been a blessing for my elderly mother. The nurses visit regularly and treat her with so much dignity.", name: "Peter O.", loc: "Kimbejja" },
  { quote: "Affordable, professional, and genuinely caring. This clinic is exactly what our community needed.", name: "Florence A.", loc: "Nsangi" },
  { quote: "The community health education programs have helped our village understand the importance of family planning and maternal health.", name: "Moses T.", loc: "Budo" },
  { quote: "I had a minor surgical procedure done here and the experience was seamless. Clean facility, professional staff, and minimal waiting.", name: "Harriet W.", loc: "Wakiso" },
  { quote: "Their partnership with Marie Stopes has made reproductive health services accessible to so many women in our area.", name: "Agnes K.", loc: "Kimbejja" },
];

const ROW1 = TESTIMONIALS.slice(0, 4);
const ROW2 = TESTIMONIALS.slice(4);

const Card = ({ t }: { t: typeof TESTIMONIALS[0] }) => (
  <div className="flex-shrink-0 w-[300px] sm:w-[350px] p-6 rounded-2xl bg-glass-bg backdrop-blur-md border border-glass-border mx-3">
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-accent text-amber-accent" />
      ))}
    </div>
    <p className="mt-3 text-sm text-text-secondary italic leading-relaxed">"{t.quote}"</p>
    <div className="mt-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-teal-primary/20 flex items-center justify-center">
        <span className="text-teal-primary text-sm font-bold">{t.name.charAt(0)}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">{t.name}</p>
        <p className="text-xs text-text-secondary">{t.loc}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => (
  <section className="bg-bg-dark py-20 md:py-32 overflow-hidden">
    <div className="container max-w-6xl mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-primary">Testimonials</span>
        <h2 className="mt-3 font-heading font-bold text-text-primary" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          Trusted by Our Community
        </h2>
      </motion.div>
    </div>

    <div className="space-y-6">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex">
          {[...ROW1, ...ROW1].map((t, i) => <Card key={`r1-${i}`} t={t} />)}
        </div>
      </div>
      <div className="flex overflow-hidden">
        <div className="animate-marquee-reverse flex">
          {[...ROW2, ...ROW2].map((t, i) => <Card key={`r2-${i}`} t={t} />)}
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;