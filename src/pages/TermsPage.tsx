import { useSEO } from "@/hooks/useSEO";

const TermsPage = () => {
  useSEO({ title: "Terms of Use", description: "Terms of use for the Lynda Michelle Medical Centre website." });

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Terms of Use</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p><strong>Last updated:</strong> [VERIFY BEFORE PUBLISHING]</p>
          <h2 className="text-xl font-heading font-bold text-foreground">1. About This Website</h2>
          <p>This website is operated by Lynda Michelle Medical Centre Ltd., located at Plot 1246, Budo-Kimbejja, Nsangi Sub-County, Wakiso District, Uganda. It is intended to provide general information about our healthcare services, team, and community programmes.</p>
          <h2 className="text-xl font-heading font-bold text-foreground">2. Not Medical Advice</h2>
          <p>The information on this website, including our chat assistant, is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns. In an emergency, go to the nearest hospital or call +256 741 008 049.</p>
          <h2 className="text-xl font-heading font-bold text-foreground">3. Accuracy of Information</h2>
          <p>We make reasonable efforts to ensure the accuracy of information on this website. However, services, availability, and operational details may change. Please contact us directly to confirm current information.</p>
          <h2 className="text-xl font-heading font-bold text-foreground">4. Intellectual Property</h2>
          <p>All content on this website, including text, images, and design, is the property of Lynda Michelle Medical Centre Ltd. unless otherwise stated.</p>
          <h2 className="text-xl font-heading font-bold text-foreground">5. Contact</h2>
          <p>For questions about these terms, contact us at admin@lyndamichellemed.com or +256 741 008 049.</p>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
