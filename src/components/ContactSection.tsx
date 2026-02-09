import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useFadeIn } from "@/hooks/useFadeIn";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const ContactSection = () => {
  const ref = useFadeIn();
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
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="bg-muted/50 py-20 md:py-28">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container fade-in-section"
      >
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          Contact Us
        </h2>

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">
                  Plot 1246, Budo-Kimbejja, Nsangi, Wakiso District, Uganda
                </p>
                <p className="text-sm text-muted-foreground">P.O. Box 148398, Kampala GPO</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <a
                  href="tel:+256702322356"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  +256 702 322 356
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <a
                  href="mailto:admin@lyndamichellemed.com"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  admin@lyndamichellemed.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">Operating Hours</p>
                <p className="text-sm text-muted-foreground">
                  Monday – Saturday: 8:00 AM – 6:00 PM
                </p>
                <p className="text-sm text-muted-foreground">Sunday: Emergency services only</p>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title="Lynda Michelle Medical Centre Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.5!2d32.48!3d0.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBudo-Kimbejja%2C%20Wakiso%20District%2C%20Uganda!5e0!3m2!1sen!2sug!4v1700000000000"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
            noValidate
          >
            <h3 className="text-xl font-semibold text-foreground">Send us a message</h3>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Your phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
