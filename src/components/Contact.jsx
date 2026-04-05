import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import {
  GridPatternCard,
  GridPatternCardBody,
} from "./ui/GridPatternCard";
import { personalInfo } from "../data/content";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const mailtoLink = `mailto:${personalInfo.email}?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoLink;
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section id="contact" className="py-28 md:py-36 px-2">
      <div className="max-w-2xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono tracking-wide">
            Get in Touch
          </h2>
          <p className="text-zinc-500 text-[15px]">
            Choose how you'd like to reach out to me
          </p>
        </motion.div>

        <GridPatternCard
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <GridPatternCardBody className="p-4 sm:p-6 md:p-8">
            {/* Social links */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white/80 rounded-md text-sm border border-white/15 hover:bg-white/15 transition-colors font-mono"
              >
                <FiMail /> Email
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-zinc-400 rounded-md text-sm border border-white/10 hover:border-white/20 hover:text-zinc-300 transition-all font-mono"
              >
                <FiGithub /> GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-zinc-400 rounded-md text-sm border border-white/10 hover:border-white/20 hover:text-zinc-300 transition-all font-mono"
              >
                <FiLinkedin /> LinkedIn
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="text-zinc-400 text-sm mb-2 block font-mono">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-md text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors font-mono ${errors.name ? "border-red-400/60" : "border-white/10"}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-zinc-400 text-sm mb-2 block font-mono">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-md text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors font-mono ${errors.email ? "border-red-400/60" : "border-white/10"}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="text-zinc-400 text-sm mb-2 block font-mono">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-md text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors resize-none font-mono ${errors.message ? "border-red-400/60" : "border-white/10"}`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black rounded-md font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/90 hover:-translate-y-0.5 mt-1 font-mono"
              >
                Send Message <FiSend />
              </button>
            </form>
          </GridPatternCardBody>
        </GridPatternCard>
      </div>
    </section>
  );
}
