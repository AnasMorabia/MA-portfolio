import { useRef } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";
import OrbitalParticles from "./OrbitalParticles";

export default function OrbitalField() {
  const containerRef = useRef(null);
  const { mouseX, mouseY, isMobile } = useMousePosition(containerRef);
  const isInView = useInView(containerRef, { margin: "100px" });

  // Outer ring — subtle follow
  const outerX = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), {
    stiffness: 30,
    damping: 25,
    mass: 1.2,
  });
  const outerY = useSpring(useTransform(mouseY, [-1, 1], [-12, 12]), {
    stiffness: 30,
    damping: 25,
    mass: 1.2,
  });

  // Inner ring — stronger follow for parallax
  const innerX = useSpring(useTransform(mouseX, [-1, 1], [-22, 22]), {
    stiffness: 45,
    damping: 22,
    mass: 0.8,
  });
  const innerY = useSpring(useTransform(mouseY, [-1, 1], [-22, 22]), {
    stiffness: 45,
    damping: 22,
    mass: 0.8,
  });

  // Center dot — most responsive
  const centerX = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), {
    stiffness: 60,
    damping: 18,
    mass: 0.5,
  });
  const centerY = useSpring(useTransform(mouseY, [-1, 1], [-30, 30]), {
    stiffness: 60,
    damping: 18,
    mass: 0.5,
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden"
      onMouseMove={undefined}
    >
      {/* Canvas particles */}
      {isInView && (
        <OrbitalParticles
          mouseX={mouseX}
          mouseY={mouseY}
          isMobile={isMobile}
        />
      )}

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer ring */}
        <motion.div
          style={{ x: outerX, y: outerY }}
          className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full border border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Orbiting dot */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
        </motion.div>

        {/* Inner ring */}
        <motion.div
          style={{ x: innerX, y: innerY }}
          className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border border-accent/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Orbiting dot */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
        </motion.div>

        {/* Center dot */}
        <motion.div
          style={{ x: centerX, y: centerY }}
          className="w-3 h-3 bg-primary rounded-full shadow-[0_0_24px_rgba(139,92,246,0.5),0_0_60px_rgba(139,92,246,0.2)]"
        />
      </div>

      {/* Gradient blends */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
