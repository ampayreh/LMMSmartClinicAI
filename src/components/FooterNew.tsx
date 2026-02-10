const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Our Future", href: "#future" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  "Outpatient Care",
  "Maternal Health",
  "Lab & Diagnostics",
  "Immunization",
  "Pharmacy",
  "Minor Surgery",
];

const FooterNew = () => (
  <footer className="bg-bg-card border-t border-glass-border py-16">
    <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-heading font-[800] text-teal-primary">LM</span>
          <span className="text-lg font-semibold text-text-primary">Lynda Michelle</span>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          Providing compassionate, accessible healthcare to families in Wakiso District, Uganda.
        </p>
        <div className="mt-6 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-teal-primary/20 hover:border-teal-primary/30 transition-all" />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">Quick Links</h4>
        <nav className="flex flex-col gap-1">
          {QUICK_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-text-secondary hover:text-teal-primary py-1 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">Services</h4>
        <div className="flex flex-col gap-1">
          {SERVICE_LINKS.map((s) => (
            <span key={s} className="text-sm text-text-secondary py-1">{s}</span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">Contact</h4>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>+256 775 620 879</p>
          <p>admin@lyndamichellemed.com</p>
          <p>Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District</p>
        </div>
      </div>
    </div>

    <div className="container max-w-6xl mt-12 pt-8 border-t border-glass-border flex flex-col sm:flex-row justify-between items-center gap-2">
      <p className="text-xs text-text-secondary/60">© 2026 Lynda Michelle Medical Centre Ltd. All rights reserved.</p>
      <p className="text-xs text-text-secondary/40">Built with care for our community</p>
    </div>
  </footer>
);

export default FooterNew;