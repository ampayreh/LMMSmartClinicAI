import { Building2 } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const FutureSection = () => {
  const ref = useFadeIn();

  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-24">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 70%, hsl(40 62% 55% / 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, hsl(178 80% 45% / 0.3) 0%, transparent 40%)",
        }}
      />
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container relative z-10 fade-in-section"
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
            <Building2 className="h-7 w-7 text-accent" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Our Future
          </h2>
          <p className="text-lg leading-relaxed text-primary-foreground/80">
            We are expanding. Our planned modern medical facility will bring enhanced inpatient
            care, surgical capabilities, and expanded diagnostic services to our growing community.
            Together, we're building a healthier future for Budo-Kimbejja.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
