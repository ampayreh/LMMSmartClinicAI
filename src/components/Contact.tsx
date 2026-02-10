import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    toast({ title: "Thank you!", description: "We'll get back to you soon." });
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-bg-dark py-20 md:py-32 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal-primary/10 blur-[150px] pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-primary">Get In Touch</span>
          <h2 className="mt-3 font-heading font-bold text-text-primary" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            We're Here for You
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, label: "Visit Us", value: "Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District, Uganda" },
              { icon: Phone, label: "Call Us", value: "+256 775 620 879" },
              { icon: Mail, label: "Email Us", value: "admin@lyndamichellemed.com" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-teal-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{c.label}</p>
                  <p className="text-sm text-text-secondary mt-1">{c.value}</p>
                </div>
              </div>
            ))}

            <p className="text-xs text-text-secondary">P.O. Box 148398, Kampala GPO</p>

            <div className="flex items-start gap-4 mt-2">
              <div className="w-12 h-12 rounded-xl bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-teal-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Monday–Saturday: 8:00 AM – 6:00 PM</p>
                <p className="text-sm text-text-secondary">Sunday: Emergency Services Only</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl aspect-video bg-bg-elevated border border-glass-border flex items-center justify-center">
              <div className="text-center text-text-secondary/30">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm">Map</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 bg-glass-bg backdrop-blur-md border border-glass-border space-y-4"
          >
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "phone", label: "Phone Number", type: "tel" },
              { name: "email", label: "Email Address", type: "email" },
            ].map((f) => (
              <input
                key={f.name}
                type={f.type}
                placeholder={f.label}
                value={form[f.name as keyof typeof form]}
                onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
                className="w-full h-12 px-4 rounded-xl bg-bg-elevated border border-glass-border text-text-primary placeholder:text-text-secondary/50 focus:border-teal-primary focus:ring-1 focus:ring-teal-primary/30 outline-none transition-colors"
              />
            ))}
            <textarea
              placeholder="Message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-glass-border text-text-primary placeholder:text-text-secondary/50 focus:border-teal-primary focus:ring-1 focus:ring-teal-primary/30 outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-teal-primary text-bg-dark py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-teal-glow hover:shadow-[0_0_30px_rgba(45,212,168,0.3)] transition-all mt-4"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;