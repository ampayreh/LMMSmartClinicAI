import { MessageCircle } from "lucide-react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Community", href: "#community" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="bg-charcoal text-white">
    <div className="kente-stripe h-2" />
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <h4 className="font-heading text-lg font-bold mb-2">Lynda Michelle Medical Centre</h4>
          <p className="text-sm text-white/60">Family-centered, affordable, and respectful care for women, children, and the wider community.</p>
          <a
            href="#contact"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact Us
          </a>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-secondary transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-white/60">+256 702 322 356</p>
          <p className="text-sm text-white/60">admin@lyndamichellemed.com</p>
          <p className="text-sm text-white/60">Plot 1246, Buddo-Kimbejja, Wakiso District</p>
          <a
            href="https://wa.me/256702322356"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-white/60 hover:text-secondary transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2026 Lynda Michelle Medical Centre Ltd. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
