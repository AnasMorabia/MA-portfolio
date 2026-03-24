import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiCode, FiSmartphone, FiCpu } from "react-icons/fi";
import {
  GridPatternCard,
  GridPatternCardBody,
} from "./ui/GridPatternCard";
import { personalInfo } from "../data/content";

const cards = [
  {
    icon: <FiCode className="text-xl text-white/70" />,
    title: "Frontend Development",
    text: "Building responsive and interactive UIs with React, TypeScript, and modern CSS.",
  },
  {
    icon: <FiSmartphone className="text-xl text-white/70" />,
    title: "Mobile Development",
    text: "Creating cross-platform mobile apps with Flutter for seamless user experiences.",
  },
  {
    icon: <FiCpu className="text-xl text-white/70" />,
    title: "Problem Solving",
    text: "Writing efficient algorithms and systems with Python and C++ for complex challenges.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 md:py-36 px-2">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-mono tracking-wide">
            About Me
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto leading-[1.8] text-[15px] text-center">
            {personalInfo.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((card, i) => (
            <GridPatternCard
              key={card.title}
              className="hover:border-white/20 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
            >
              <GridPatternCardBody>
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-white font-semibold text-[17px] mb-3 font-mono">
                  {card.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {card.text}
                </p>
              </GridPatternCardBody>
            </GridPatternCard>
          ))}
        </div>
      </div>
    </section>
  );
}
