const TESTIMONIALS = [
  { quote: "The maternity care at LMMC was incredible. The midwives were so supportive throughout my delivery. I felt safe every moment.", name: "Sarah N." },
  { quote: "Affordable and quality healthcare right here in Budo-Kimbejja. The lab results are fast and the staff is always friendly.", name: "James K." },
  { quote: "I bring my children here for immunizations. The nurses are patient and gentle. The clinic is always clean and organized.", name: "Grace M." },
  { quote: "When my mother needed home-based care, LMMC sent a nurse to our home. That level of compassion is rare. Truly grateful.", name: "David O." },
  { quote: "The pharmacy has everything we need and the prices are fair. The clinical officers take time to explain medications properly.", name: "Faith A." },
  { quote: "I was nervous about my minor surgery but Dr. Joshua was calm and professional. The whole experience was smooth and painless.", name: "Peter W." },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 overflow-hidden">
    <div className="container mb-12 text-center">
      <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">What Our Patients Say</h2>
      <div className="mx-auto mt-3 h-1 w-24 rounded-full kente-stripe" />
    </div>

    <div className="space-y-5">
      {/* Row 1 — left */}
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee-left flex gap-5 pr-5" style={{ willChange: "transform" }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={`r1-${i}`}
              className="w-80 flex-shrink-0 rounded-2xl bg-card p-6 shadow-sm border border-border/50"
            >
              <p className="text-sm leading-relaxed text-muted-foreground italic">"{t.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right */}
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee-right flex gap-5 pr-5" style={{ willChange: "transform" }}>
          {[...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)].map((t, i) => (
            <div
              key={`r2-${i}`}
              className="w-80 flex-shrink-0 rounded-2xl bg-card p-6 shadow-sm border border-border/50"
            >
              <p className="text-sm leading-relaxed text-muted-foreground italic">"{t.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
