import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KenteStrip from "@/components/KenteStrip";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Future from "@/components/Future";
import Contact from "@/components/Contact";
import FooterNew from "@/components/FooterNew";
import WhatsAppButtonNew from "@/components/WhatsAppButtonNew";
import ScrollToTopNew from "@/components/ScrollToTopNew";

const Index = () => (
  <div className="min-h-screen bg-bg-dark overflow-x-hidden">
    <Navbar />
    <main>
      <Hero />
      <KenteStrip />
      <Stats />
      <KenteStrip />
      <Services />
      <KenteStrip />
      <About />
      <KenteStrip />
      <Team />
      <KenteStrip />
      <Testimonials />
      <KenteStrip />
      <Future />
      <KenteStrip />
      <Contact />
    </main>
    <FooterNew />
    <WhatsAppButtonNew />
    <ScrollToTopNew />
  </div>
);

export default Index;