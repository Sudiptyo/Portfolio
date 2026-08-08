import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { LuMail } from "react-icons/lu";

const socialClass = `
  flex
  size-12
  items-center
  justify-center
  rounded-full
  border
  border-white/10
  bg-white/5
  text-white/70
  transition-all
  duration-300
  hover:-translate-y-1
  hover:border-[hsl(263_83%_63%)]/50
  hover:bg-[hsl(263_83%_63%)]/15
  hover:text-white
  hover:shadow-[0_0_18px_rgba(139,92,246,0.35)]
`;

const FooterHeader = () => {
  return (
    <>
      <div className="">
        <div className="glass-card p-20 text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-6xl font-bold mb-6">
              Let's build something
              <br />
              <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                amazing together.
              </span>
            </h2>

            <p className="text-[#AAA3C2] text-xl mb-10 max-w-2xl mx-auto">
              Have a project, idea, or opportunity? I'd love to hear from you.
              Let's connect and create something great.
            </p>

            <div className="flex items-center justify-center gap-6 mb-10">
              <a
                href="/contact"
                className="btn-glow rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 px-10 py-5 text-lg font-bold text-white"
              >
                Contact Me
              </a>
              <a
                href="/Frontend/public/CV.pdf"
                download="Sudiptyo_Das_CV.pdf"
                className="rounded-full border-2 border-[hsl(263_83%_63%)]/50 px-10 py-5 text-center text-lg font-bold text-white transition-colors hover:bg-[hsl(263_83%_63%)]/10"
              >
                Download CV
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#" className={socialClass}>
                <FaGithub size={20} />
              </a>
              <a href="#" className={socialClass}>
                <FiLinkedin size={20} />
              </a>
              <a href="#" className={socialClass}>
                <LuMail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterHeader;
