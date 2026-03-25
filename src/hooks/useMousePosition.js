import { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";

export default function useMousePosition(containerRef) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
  );

  useEffect(() => {
    if (isMobile.current) return;

    const handleMove = (e) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [containerRef, mouseX, mouseY]);

  return { mouseX, mouseY, isMobile: isMobile.current };
}
