import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-primary py-24 md:py-32">
    {/* Abstract pattern overlay */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 50%, hsl(40 62% 55% / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(178 80% 45% / 0.3) 0%, transparent 40%), radial-gradient(circle at 60% 80%, hsl(40 62% 55% / 0.2) 0%, transparent 45%)",
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    />

    <div className="container relative z-10 text-center">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
          <Heart className="h-7 w-7 text-accent" />
        </div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
          Compassionate Healthcare for Every Family
        </h1>
        <p className="max-w-xl text-lg text-primary-foreground/80 md:text-xl">
          Serving the Budo-Kimbejja community with accessible, quality medical care since 2019
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a href="#contact">Contact Us</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <a href="#services">Our Services</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
