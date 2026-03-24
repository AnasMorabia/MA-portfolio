import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  GridPatternCard,
  GridPatternCardBody,
} from "./ui/GridPatternCard";
import { skills } from "../data/content";

const categories = ["All", "Frontend", "Mobile", "Backend", "Tools"];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-28 md:py-36 px-2">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono tracking-wide">
            Skills & Technologies
          </h2>
          <p className="text-zinc-500 text-[15px]">
            Technologies I work with on a daily basis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 mb-14 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-md text-sm font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <GridPatternCard
              key={skill.name}
              className="hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <GridPatternCardBody className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-200 font-medium text-sm font-mono">
                    {skill.name}
                  </span>
                  <span className="text-white/40 text-xs font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + 0.03 * i, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-white/50 to-white/20 rounded-full origin-left"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </GridPatternCardBody>
            </GridPatternCard>
          ))}
        </div>
      </div>
    </section>
  );
}
