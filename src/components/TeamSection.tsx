import { motion } from "framer-motion";
import { useState } from "react";

const TEAM = [
  { name: "Dr. Joshua Tugumisirize", role: "Medical Director", initials: "JT", gradient: "from-primary to-secondary" },
  { name: "Jenipher Nakyejjusa", role: "Registered Nurse", initials: "JN", gradient: "from-secondary to-accent" },
  { name: "Lydia Tugumisirize", role: "Senior Midwife", initials: "LT", gradient: "from-accent to-dusty-rose" },
];

const TeamSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="team" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">Meet Our Team</h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full kente-stripe" />
        </motion.div>

        <div className="flex justify-center items-end">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex flex-col items-center cursor-pointer"
              style={{ marginLeft: i > 0 ? "-1.5rem" : 0, zIndex: hovered === i ? 10 : 3 - i }}
            >
              <motion.div
                animate={{ scale: hovered === i ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} shadow-lg border-4 border-background`}
              >
                <span className="font-heading text-2xl sm:text-3xl font-bold text-white">{member.initials}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: hovered === i ? 1 : 0, height: hovered === i ? "auto" : 0 }}
                className="mt-3 text-center overflow-hidden"
              >
                <p className="font-heading font-semibold text-foreground text-sm sm:text-base whitespace-nowrap">{member.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
