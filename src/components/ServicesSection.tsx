import {
  Stethoscope,
  Baby,
  FlaskConical,
  Syringe,
  Pill,
  Scissors,
  Users,
  Home,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFadeIn } from "@/hooks/useFadeIn";

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Outpatient Care",
    desc: "General consultation, diagnosis, and treatment for everyday health needs.",
  },
  {
    icon: Baby,
    title: "Maternal Health",
    desc: "Antenatal care, safe deliveries, post-abortion care, and family planning services.",
  },
  {
    icon: FlaskConical,
    title: "Laboratory & Diagnostics",
    desc: "Comprehensive testing including HIV, typhoid, syphilis, HCG, and blood sugar.",
  },
  {
    icon: Syringe,
    title: "Immunization",
    desc: "Child and adult vaccination following national health guidelines.",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    desc: "Prescription and over-the-counter medications available on-site.",
  },
  {
    icon: Scissors,
    title: "Minor Surgery",
    desc: "Wound care, abscess drainage, and other minor surgical procedures.",
  },
  {
    icon: Users,
    title: "Community Health Education",
    desc: "Health awareness programs and community outreach initiatives.",
  },
  {
    icon: Home,
    title: "Home-Based Care",
    desc: "Domiciliary services for elderly and housebound patients.",
  },
];

const ServicesSection = () => {
  const ref = useFadeIn();

  return (
    <section id="services" className="bg-muted/50 py-20 md:py-28">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container fade-in-section"
      >
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Our Services
          </h2>
          <p className="text-muted-foreground">
            Comprehensive healthcare services tailored to our community's needs.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <Card
              key={s.title}
              className="group border-border/50 transition-shadow hover:shadow-md"
            >
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
