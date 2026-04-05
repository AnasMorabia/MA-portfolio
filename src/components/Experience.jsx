import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GridPatternCard,
  GridPatternCardBody,
} from "./ui/GridPatternCard";
import { experience } from "../data/content";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-28 md:py-36 px-2">
      <div className="max-w-3xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono tracking-wide">
            Experience
          </h2>
          <p className="text-zinc-500 text-[15px]">
            My professional journey so far
          </p>
        </motion.div>

        <div className="space-y-5">
          {experience.map((exp, i) => (
            <GridPatternCard
              key={i}
              className="hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GridPatternCardBody className="p-4 sm:p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-5">
                  <div>
                    <h3 className="text-white font-semibold text-lg font-mono">
                      {exp.role}
                    </h3>
                    <p className="text-white/50 text-sm mt-1">
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit ${exp.company} website`}
                          className="hover:text-white/70 transition-colors"
                        >
                          {exp.company} &rarr;
                        </a>
                      ) : (
                        exp.company
                      )}
                    </p>
                  </div>
                  <span className="text-zinc-600 text-sm font-mono mt-2 sm:mt-1">
                    {exp.period}
                  </span>
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                  {exp.description}
                </p>

                <ul className="space-y-3">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="text-zinc-400 text-sm flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </GridPatternCardBody>
            </GridPatternCard>
          ))}
        </div>
      </div>
    </section>
  );
}
