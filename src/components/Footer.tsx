const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="border-t border-border bg-foreground py-12 text-background">
    <div className="container">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <h4 className="mb-2 text-lg font-bold">Lynda Michelle Medical Centre</h4>
          <p className="text-sm text-background/70">
            Compassionate healthcare for every family in Budo-Kimbejja.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Quick Links</h4>
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-background/70 transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Contact</h4>
          <p className="text-sm text-background/70">+256 702 322 356</p>
          <p className="text-sm text-background/70">admin@lyndamichellemed.com</p>
          <p className="text-sm text-background/70">
            Plot 1246, Budo-Kimbejja, Wakiso District
          </p>
        </div>
      </div>
      <div className="mt-10 border-t border-background/10 pt-6 text-center text-xs text-background/50">
        © 2026 Lynda Michelle Medical Centre Ltd. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
