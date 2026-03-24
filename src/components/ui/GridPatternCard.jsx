import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export function GridPatternCard({
  children,
  className,
  patternClassName,
  gradientClassName,
  initial,
  animate,
  transition,
}) {
  return (
    <motion.div
      className={cn(
        "border w-full rounded-md overflow-hidden",
        "bg-dark-light",
        "border-dark-border",
        "p-4",
        className
      )}
      initial={initial || { opacity: 0, y: -20 }}
      animate={animate || { opacity: 1, y: 0 }}
      transition={transition || { duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={cn(
          "size-full bg-repeat bg-[length:30px_30px]",
          "bg-grid-pattern",
          patternClassName
        )}
      >
        <div
          className={cn(
            "size-full bg-gradient-to-tr",
            "from-dark/90 via-dark/40 to-dark/10",
            gradientClassName
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function GridPatternCardBody({ className, ...props }) {
  return <div className={cn("text-left p-4 md:p-6", className)} {...props} />;
}
