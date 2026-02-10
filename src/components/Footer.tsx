import { MessageCircle } from "lucide-react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="bg-charcoal text-white">
    {/* Kente stripe */}
    <div className="kente-stripe h-2" />

    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <h4 className="font-heading text-lg font-bold mb-2">Lynda Michelle Medical Centre</h4>
          <p className="text-sm text-white/60">Compassionate healthcare for every family in Budo-Kimbejja.</p>
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
          <p className="text-sm text-white/60">Plot 1246, Budo-Kimbejja, Wakiso District</p>
          <a
            href="https://wa.me/256702322356"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-white/60 hover:text-green-400 transition-colors"
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
