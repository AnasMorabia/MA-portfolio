import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [isMobile, setIsMobile] = useState(true);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(isTouch);
    if (isTouch) return;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    window.addEventListener("mousemove", handleMove, { passive: true });

    // Watch for interactive elements
    const addListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
      return targets;
    };

    let targets = addListeners();

    // Re-attach on DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      targets = addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  const ringSize = hovered ? 56 : 40;
  const dotSize = hovered ? 4 : 6;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-primary/60"
        style={{
          x: springX,
          y: springY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: hovered
            ? "rgba(139, 92, 246, 0.9)"
            : "rgba(139, 92, 246, 0.6)",
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-primary"
        style={{
          x: mouseX,
          y: mouseY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 12px rgba(139, 92, 246, 0.5)",
        }}
        animate={{
          width: dotSize,
          height: dotSize,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
