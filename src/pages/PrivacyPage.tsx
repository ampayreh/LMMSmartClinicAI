import { useSEO } from "@/hooks/useSEO";

const PrivacyPage = () => {
  useSEO({ title: "Privacy Policy", description: "Privacy policy for Lynda Michelle Medical Centre — how we collect, use, and protect your information." });

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p><strong>Last updated:</strong> [VERIFY BEFORE PUBLISHING]</p>
          <h2 className="text-xl font-heading font-bold text-foreground">1. Information We Collect</h2>
          <p>When you visit Lynda Michelle Medical Centre or use our website, we may collect personal information including your name, contact details, and health-related information necessary for providing care. Through our website, we may collect information you provide via contact forms.</p>
          <h2 className="text-xl font-heading font-bold text-foreground">2. How We Use Your Information</h2>
          <p>Your information is used to provide healthcare services, respond to inquiries, manage appointments, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.</p>
          <h2 className="text-xl font-heading font-bold text-foreground">3. Patient Confidentiality</h2>
          <p>All patient health information is treated with strict confidentiality in accordance with medical ethics and applicable Ugandan law. HIV testing, family planning, and sexual and reproductive health services are delivered with particular attention to privacy.</p>
          <h2 className="text-xl font-heading font-bold text-foreground">4. Data Security</h2>
          <p>We implement appropriate measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          <h2 className="text-xl font-heading font-bold text-foreground">5. Contact</h2>
          <p>For questions about this privacy policy, contact us at admin@lyndamichellemed.com or +256 741 008 049.</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
