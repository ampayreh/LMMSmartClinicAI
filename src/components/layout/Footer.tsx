import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Future Hospital", href: "/future" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Maternal & Reproductive Health", href: "/services/maternal-health" },
  { label: "Outpatient & Family Care", href: "/services/outpatient-care" },
  { label: "Lab, Diagnostics & Pharmacy", href: "/services/lab-diagnostics" },
  { label: "Community Outreach", href: "/services/community-outreach" },
];

const Footer = () => (
  <footer className="bg-forest-dark text-white/90">
    <div className="kente-stripe" />

    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div>
            <span className="text-2xl font-heading font-bold text-white">LMM</span>
            <p className="text-sm text-white/60 mt-1">Lynda Michelle Medical Centre</p>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Providing compassionate, family-centered healthcare to Budo-Kimbejja and the wider
            Nsangi community since 2012. Founder-led. Woman-led. Community-rooted.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Services</h4>
          <ul className="space-y-2.5">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-white/70">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
              <span>Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District, Uganda</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/70">
              <Phone className="w-4 h-4 shrink-0 text-white/50" />
              <div>
                <a href="tel:+256741008049" className="hover:text-white transition-colors block">+256 741 008 049</a>
                <a href="tel:+256772590967" className="hover:text-white transition-colors block">+256 772 590 967</a>
              </div>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/70">
              <Mail className="w-4 h-4 shrink-0 text-white/50" />
              <a href="mailto:admin@lyndamichellemed.com" className="hover:text-white transition-colors">admin@lyndamichellemed.com</a>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/70">
              <Clock className="w-4 h-4 shrink-0 text-white/50" />
              <div>
                <span className="block">Mon–Sat: 8:00 AM – 6:00 PM</span>
                <span className="block">Sun: Emergency Only</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Lynda Michelle Medical Centre Ltd. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs text-white/50">
          <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Use</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
