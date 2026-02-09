import { ShieldCheck, Eye } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const AboutSection = () => {
  const ref = useFadeIn();

  return (
    <section id="about" className="py-20 md:py-28">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container fade-in-section"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            About Us
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Lynda Michelle Medical Centre is a trusted healthcare provider in Wakiso District,
            committed to delivering exceptional patient care. From outpatient consultations to
            maternal health and laboratory diagnostics, we provide comprehensive medical services
            tailored to our community's needs. Our dedicated team of licensed clinical officers,
            midwives, and nurses work together to improve the health and well-being of every
            family we serve.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              Licensed by Uganda Medical &amp; Dental Practitioners Council
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              Partner — Marie Stopes International
            </div>
          </div>
        </div>

        {/* Vision sub-section */}
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary/10 bg-primary/5 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Eye className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-foreground">Our Vision</h3>
          <p className="text-muted-foreground">
            We envision growing into a modern hospital facility, expanding our capacity to offer
            inpatient care, advanced surgical services, and state-of-the-art diagnostics — bringing
            world-class healthcare closer to the families of Budo-Kimbejja.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
