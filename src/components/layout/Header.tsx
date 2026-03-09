import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Maternal & Reproductive Health", href: "/services/maternal-health" },
      { label: "Outpatient & Family Care", href: "/services/outpatient-care" },
      { label: "Lab, Diagnostics & Pharmacy", href: "/services/lab-diagnostics" },
      { label: "Community Outreach", href: "/services/community-outreach" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Founder Story & Timeline", href: "/about/founder-story" },
      { label: "Leadership & Governance", href: "/about/leadership" },
      { label: "Impact & Partnerships", href: "/about/impact" },
    ],
  },
  { label: "Future Hospital", href: "/future" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openDropdown = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-16 lg:h-[72px]">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="text-2xl font-heading font-bold text-primary">LMM</span>
            <div className="hidden sm:block leading-tight">
              <span className="text-sm font-semibold text-foreground block">Lynda Michelle</span>
              <span className="text-xs text-muted-foreground block">Medical Centre</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && openDropdown(item.label)}
                onMouseLeave={() => item.children && closeDropdown()}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname.startsWith(item.href)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-border py-2"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          location.pathname === child.href
                            ? "text-primary bg-primary/5"
                            : "text-foreground/80 hover:text-primary hover:bg-muted"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+256741008049"
              className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+256 741 008 049</span>
            </a>
            <Link
              to="/contact"
              className="hidden lg:inline-flex bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-forest-light transition-colors"
            >
              Book a Visit
            </Link>
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-white pt-16 overflow-y-auto"
          >
            <div className="container mx-auto px-6 py-8 space-y-2">
              <Link
                to="/"
                className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors"
              >
                Home
              </Link>
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded((p) => (p === item.label ? null : item.label))
                        }
                        className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            mobileExpanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="block px-4 py-2.5 text-base text-muted-foreground hover:text-primary transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-6 space-y-3 border-t border-border mt-4">
                <Link
                  to="/contact"
                  className="block w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-lg text-base font-semibold hover:bg-forest-light transition-colors"
                >
                  Book a Visit
                </Link>
                <a
                  href="tel:+256741008049"
                  className="block w-full text-center border border-border px-6 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
                >
                  📞 +256 741 008 049
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-[72px]" />
    </>
  );
};

export default Header;
