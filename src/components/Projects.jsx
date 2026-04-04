import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import {
  GridPatternCard,
  GridPatternCardBody,
} from "./ui/GridPatternCard";
import { projects } from "../data/content";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-28 md:py-36 px-2">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono tracking-wide">
            Featured Projects
          </h2>
          <p className="text-zinc-500 text-[15px]">
            A selection of projects showcasing my skills and expertise
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <GridPatternCard
                key={project.title}
                className="hover:border-white/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <GridPatternCardBody>
                  <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-6 text-base font-semibold text-white/60 font-mono">
                    {project.title.charAt(0)}
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-3 font-mono group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-white/5 text-zinc-400 text-xs rounded-md border border-white/10 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-5 pt-4 border-t border-white/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors font-mono"
                    >
                      <FiGithub /> Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors font-mono"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  </div>
                </GridPatternCardBody>
              </GridPatternCard>
            ))}
          </div>
        ) : (
          <GridPatternCard
            className="border-dashed"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GridPatternCardBody className="py-16 text-center">
              <p className="text-zinc-600 text-sm font-mono">
                Projects coming soon...
              </p>
            </GridPatternCardBody>
          </GridPatternCard>
        )}
      </div>
    </section>
  );
}
