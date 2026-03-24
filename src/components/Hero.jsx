import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/content";

export default function Hero() {
  const barHeights = useMemo(
    () => Array.from({ length: 8 }, () => Math.random() * 12 + 4),
    []
  );

  useEffect(() => {
    const embedScript = document.createElement("script");
    embedScript.type = "text/javascript";
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement("style");
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      @media (min-width: 1024px) {
        [data-us-project] canvas {
          clip-path: inset(0 0 10% 0) !important;
        }
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"],
      [data-us-project] a,
      [data-us-project] div:last-child:not(:first-child) a {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const containers = document.querySelectorAll("[data-us-project]");
      containers.forEach((container) => {
        container.querySelectorAll("*").forEach((el) => {
          const text = (el.textContent || "").toLowerCase();
          const title = (el.getAttribute("title") || "").toLowerCase();
          const href = (el.getAttribute("href") || "").toLowerCase();
          if (
            text.includes("made with") ||
            text.includes("unicorn") ||
            title.includes("made with") ||
            title.includes("unicorn") ||
            href.includes("unicorn.studio")
          ) {
            try {
              el.remove();
            } catch (_) {}
          }
        });
      });
    };

    // Run on mount + retries, and watch for dynamically added elements
    hideBranding();
    const timeouts = [200, 500, 1000, 2000, 4000, 8000].map((t) =>
      setTimeout(hideBranding, t)
    );

    const observer = new MutationObserver(hideBranding);
    const target = document.querySelector("[data-us-project]");
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    } else {
      // Watch for the project container to appear
      const bodyObserver = new MutationObserver(() => {
        const el = document.querySelector("[data-us-project]");
        if (el) {
          observer.observe(el, { childList: true, subtree: true });
          hideBranding();
          bodyObserver.disconnect();
        }
      });
      bodyObserver.observe(document.body, { childList: true, subtree: true });
      timeouts.push({ disconnect: () => bodyObserver.disconnect() });
    }

    return () => {
      timeouts.forEach((t) => {
        if (t && t.disconnect) t.disconnect();
        else clearTimeout(t);
      });
      observer.disconnect();
      try {
        document.head.removeChild(embedScript);
        document.head.removeChild(style);
      } catch (_) {}
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Unicorn Studio Background — all devices */}
      <div className="absolute inset-0 w-full h-full opacity-60 md:opacity-80 lg:opacity-100">
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: "100%", height: "100%", minHeight: "100vh" }}
        />
      </div>

      {/* Corner frame accents */}
      <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20" />
      <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20" />
      <div className="absolute left-0 bottom-0 lg:bottom-[5vh] w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20" />
      <div className="absolute right-0 bottom-0 lg:bottom-[5vh] w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20" />

      {/* Main content */}
      <div
        className="relative z-10 flex min-h-screen items-end md:items-center justify-center md:justify-end pb-24 md:pb-0 pt-16 lg:pt-0"
        style={{ marginTop: "5vh" }}
      >
        <div className="w-full md:w-2/3 lg:w-1/2 px-5 sm:px-6 lg:px-16 lg:pr-[10%]">
          <div className="max-w-lg relative mx-auto md:mx-0 lg:ml-auto">
            {/* Top decorative line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="w-8 h-px bg-white" />
              <span className="text-white text-[10px] font-mono tracking-wider">
                &infin;
              </span>
              <div className="flex-1 h-px bg-white" />
            </motion.div>

            {/* Name */}
            <div className="relative">
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 hero-dither opacity-40" />
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider whitespace-nowrap text-center md:text-left lg:-ml-[5%]"
                style={{ letterSpacing: "0.1em" }}
              >
                {personalInfo.name.toUpperCase().split(" ").slice(0, 2).join(" ")}
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-white mb-4 text-center md:text-left"
            >
              {personalInfo.title}
            </motion.p>

            {/* Dots pattern — desktop */}
            <div className="hidden lg:flex gap-1 mb-3 opacity-40">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 h-0.5 bg-white rounded-full"
                />
              ))}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative"
            >
              <p className="text-xs sm:text-sm lg:text-base text-gray-300 mb-5 lg:mb-6 leading-relaxed font-mono opacity-80 text-center md:text-left">
                {personalInfo.tagline}
              </p>
              <div className="hidden lg:block absolute -left-4 top-1/2 w-3 h-3 border border-white opacity-30 -translate-y-1/2">
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white -translate-x-1/2 -translate-y-1/2" />
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-row justify-center md:justify-start gap-3 lg:gap-4"
            >
              <a
                href="#contact"
                className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 text-center group"
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                GET IN TOUCH
              </a>
              <a
                href="#about"
                className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent border border-white/40 text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200 text-center"
              >
                EXPLORE MY WORK
              </a>
            </motion.div>

            {/* Bottom technical notation — desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex items-center gap-2 mt-6"
            >
              <span className="text-white text-[9px] font-mono">&infin;</span>
              <div className="flex-1 h-px bg-white" />
              <span className="text-white text-[9px] font-mono">
                ANAS.PROTOCOL
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div
        className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/60 backdrop-blur-sm"
        style={{ bottom: 0 }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden lg:flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/30"
                  style={{ height: `${barHeights[i]}px` }}
                />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>

          <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">&#9684; RENDERING</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
              <div
                className="w-1 h-1 bg-white/40 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <span className="hidden lg:inline">FRAME: &infin;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
