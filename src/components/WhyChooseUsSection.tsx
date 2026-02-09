import { Award, Heart, Activity, Handshake } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const FEATURES = [
  {
    icon: Award,
    title: "Licensed Professionals",
    desc: "Qualified clinical officers, midwives, and nurses committed to excellent care.",
  },
  {
    icon: Heart,
    title: "Community Focused",
    desc: "Proudly serving families in Budo-Kimbejja since 2019.",
  },
  {
    icon: Activity,
    title: "Comprehensive Care",
    desc: "From preventive health to diagnostics and treatment — all under one roof.",
  },
  {
    icon: Handshake,
    title: "Trusted Partnerships",
    desc: "Collaborating with Marie Stopes and national health programs.",
  },
];

const WhyChooseUsSection = () => {
  const ref = useFadeIn();

  return (
    <section id="why-us" className="py-20 md:py-28">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container fade-in-section"
      >
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          Why Choose Us
        </h2>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
