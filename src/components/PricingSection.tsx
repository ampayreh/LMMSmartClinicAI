import { motion } from "framer-motion";

const PRICES = [
  { service: "Antenatal Booking", price: "UGX 20,000" },
  { service: "Antenatal Revisit", price: "UGX 10,000" },
  { service: "Family Planning Injection", price: "UGX 5,000" },
  { service: "IUD Insertion", price: "UGX 30,000" },
  { service: "IUD Removal", price: "UGX 20,000" },
  { service: "Implanon Insertion", price: "UGX 20,000" },
  { service: "Jadelle Insertion", price: "UGX 25,000" },
  { service: "Delivery (Booked)", price: "UGX 150,000" },
  { service: "Delivery (Unbooked)", price: "UGX 250,000" },
];

const PricingSection = () => (
  <section id="pricing" className="py-20 md:py-28 bg-primary/5">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">Indicative Pricing</h2>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full kente-stripe" />
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          We believe in transparent, affordable healthcare. Below are our indicative prices for common services.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-card shadow-sm border border-border/50"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-primary/5">
                <th className="px-6 py-4 text-sm font-semibold text-foreground">Service</th>
                <th className="px-6 py-4 text-sm font-semibold text-foreground text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map((row, i) => (
                <tr key={row.service} className={`border-b border-border/50 last:border-0 ${i % 2 === 1 ? "bg-muted/30" : ""}`}>
                  <td className="px-6 py-3.5 text-sm text-foreground">{row.service}</td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-primary text-right whitespace-nowrap">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border/50 px-6 py-4 bg-muted/20">
          <p className="text-xs text-muted-foreground text-center">
            * Prices are indicative and subject to change. Please contact us for the most up-to-date pricing.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PricingSection;
