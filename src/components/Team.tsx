import { motion } from "framer-motion";
import joshuaImg from "@/assets/team-joshua.jpeg";
import jenniferImg from "@/assets/team-jennifer.jpeg";
import lydiaImg from "@/assets/team-lydia.jpeg";

const MEMBERS = [
  {
    name: "Dr. Joshua Tugumisirize",
    role: "Director & Medical Doctor",
    color: "text-teal-primary",
    bio: "Leading clinical excellence and community health strategy.",
    initials: "JT",
    size: "w-40 h-40 md:w-56 md:h-56",
    image: joshuaImg,
  },
  {
    name: "Jennifer Nakyejjusa",
    role: "Registered Midwife",
    color: "text-amber-accent",
    bio: "Providing compassionate maternal and reproductive care.",
    initials: "JN",
    size: "w-48 h-48 md:w-64 md:h-64",
    image: jenniferImg,
  },
  {
    name: "Lydia Tugumisirize",
    role: "Founder & Senior Midwife",
    color: "text-rose-accent",
    bio: "Dedicated nursing care with a personal touch.",
    initials: "LT",
    size: "w-40 h-40 md:w-56 md:h-56",
    image: lydiaImg,
  },
];

const Team = () => (
  <section id="team" className="bg-bg-card py-20 md:py-32">
    <div className="container max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-primary">Our Team</span>
        <h2 className="mt-3 font-heading font-bold text-text-primary" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          The People Behind Your Care
        </h2>
      </motion.div>

      {/* Overlapping circles */}
      <div className="flex justify-center items-end">
        {MEMBERS.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative group"
            style={{ marginLeft: i > 0 ? "-1.5rem" : 0, zIndex: i === 1 ? 10 : 5 - i }}
          >
            <div
              className={`${m.size} rounded-full overflow-hidden border-4 border-bg-card relative transition-all duration-500 group-hover:scale-110 group-hover:z-50 group-hover:shadow-[0_0_40px_rgba(45,212,168,0.2)]`}
            >
              <img src={m.image} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
        {MEMBERS.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <p className="font-semibold text-lg text-text-primary">{m.name}</p>
            <p className={`text-sm ${m.color} font-medium`}>{m.role}</p>
            <p className="text-xs text-text-secondary mt-2">{m.bio}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
