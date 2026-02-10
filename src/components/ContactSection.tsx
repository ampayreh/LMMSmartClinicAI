import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast({ title: "Message sent!", description: "Thank you for reaching out. We'll get back to you soon." });
    setForm({ name: "", phone: "", message: "" });
  };

  const INFO = [
    { icon: MapPin, label: "Location", lines: ["Plot 1246, Budo-Kimbejja, Nsangi", "Wakiso District, Uganda", "P.O. Box 148398, Kampala GPO"] },
    { icon: Phone, label: "Phone", lines: ["+256 702 322 356"], href: "tel:+256702322356" },
    { icon: Mail, label: "Email", lines: ["admin@lyndamichellemed.com"], href: "mailto:admin@lyndamichellemed.com" },
    { icon: Clock, label: "Hours", lines: ["Mon–Sat: 8:00 AM – 6:00 PM", "Sunday: Emergency Only"] },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28">
      {/* Teal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-3xl bg-card p-8 shadow-2xl md:p-12"
        >
          <h2 className="text-center font-heading text-3xl font-bold text-foreground md:text-4xl mb-8">
            Get In Touch
          </h2>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Info */}
            <div className="space-y-5">
              {INFO.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                    {item.lines.map((line, j) =>
                      item.href ? (
                        <a key={j} href={item.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="text-sm text-muted-foreground">{line}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-secondary py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>

        {/* Map */}
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl shadow-lg">
          <iframe
            title="Lynda Michelle Medical Centre Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.5!2d32.48!3d0.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBudo-Kimbejja%2C%20Wakiso%20District%2C%20Uganda!5e0!3m2!1sen!2sug!4v1700000000000"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
