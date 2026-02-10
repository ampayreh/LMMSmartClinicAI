import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import CommunityImpactSection from "@/components/CommunityImpactSection";
import AboutSection from "@/components/AboutSection";
import TrustSection from "@/components/TrustSection";
import PricingSection from "@/components/PricingSection";
import FutureSection from "@/components/FutureSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CommunityImpactSection />
      <AboutSection />
      <TrustSection />
      <PricingSection />
      <FutureSection />
      <ContactSection />
    </main>
    <Footer />
    <WhatsAppButton />
    <ScrollToTop />
  </div>
);

export default Index;
