import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personalInfo } from "../data/content";

export default function Footer() {
  return (
    <footer className="py-10 px-8 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-600 text-sm font-mono">
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            <FiGithub size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            <FiLinkedin size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            <FiMail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
