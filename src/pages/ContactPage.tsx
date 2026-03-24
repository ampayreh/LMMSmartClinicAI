import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useToast } from "@/hooks/use-toast";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const CONTACT_INFO = [
  { icon: MapPin, label: "Location", value: "Plot 1246, Budo-Kimbejja, Nsangi Sub-County, Wakiso District, Uganda", extra: "P.O. Box 148398, Kampala GPO" },
  { icon: Phone, label: "Phone", value: "+256 741 008 049 (WhatsApp)", extra: "+256 772 590 967" },
  { icon: Mail, label: "Email", value: "admin@lyndamichellemed.com" },
  { icon: Clock, label: "Hours", value: "Monday – Saturday: 8:00 AM – 6:00 PM", extra: "Sunday: Emergency Services Only" },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "visit", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Required fields", description: "Please provide your name and phone number.", variant: "destructive" });
      return;
    }
    toast({ title: "Thank you!", description: "Your inquiry has been received. We'll contact you within 24 hours." });
    setForm({ name: "", phone: "", email: "", type: "visit", message: "" });
  };

  useSEO({ title: "Contact Us", description: "Get in touch with Lynda Michelle Medical Centre. Book a visit, inquire about services, or reach us via WhatsApp, phone, or email." });

  return (
    <>
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Walk-ins are welcome during our operating hours. For planned visits or inquiries, reach us by phone, WhatsApp, email, or the form below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info + Map */}
            <div className="lg:col-span-2 space-y-6">
              {CONTACT_INFO.map((c) => (
                <motion.div key={c.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{c.label}</p>
                    <p className="text-sm text-muted-foreground">{c.value}</p>
                    {c.extra && <p className="text-sm text-muted-foreground">{c.extra}</p>}
                  </div>
                </motion.div>
              ))}

              <a href="https://wa.me/256741008049" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>

              <div className="rounded-xl overflow-hidden border border-border mt-6">
                <iframe
                  title="Lynda Michelle Medical Centre Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7!2d32.489!3d0.268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBudo-Kimbejja%2C+Nsangi!5e0!3m2!1sen!2sug!4v1"
                  width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-3">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-heading font-bold text-foreground mb-6">Send Us an Inquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" placeholder="+256..." required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email (optional)</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Inquiry Type</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition">
                      <option value="visit">Book a Visit</option>
                      <option value="service">Service Inquiry</option>
                      <option value="partner">Partnership / Donor Inquiry</option>
                      <option value="career">Career Interest</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} maxLength={1000} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none" placeholder="Tell us more about your needs..." />
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors">
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
