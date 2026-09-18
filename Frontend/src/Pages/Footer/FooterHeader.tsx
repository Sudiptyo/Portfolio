import { FaGithub } from "react-icons/fa";

import { FiLinkedin } from "react-icons/fi";

import { LuMail } from "react-icons/lu";

const socialClass = `
  relative
  z-10
  flex
  size-12
  cursor-pointer
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
        {/* <div className="glass-card p-20 text-center"> */}
        <div className="glass-card p-6 text-center sm:p-10 lg:p-20">
          <div className="flex flex-col items-center">
            {/* <h2 className="text-6xl font-bold mb-6"> */}
            <h2 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Let's build something
              <br />
              <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                amazing together.
              </span>
            </h2>

            {/* <p className="text-[#AAA3C2] text-xl mb-10 max-w-2xl mx-auto"> */}
            <p className="mx-auto mb-8 max-w-2xl text-base text-[#AAA3C2] sm:mb-10 sm:text-lg lg:text-xl">
              Have a project, idea, or opportunity? I'd love to hear from you.
              Let's connect and create something great.
            </p>

            {/* <div className="flex items-center justify-center gap-6 mb-10"> */}
            <div className="mb-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="/contact"
                className="btn-glow rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 px-6 py-4 text-base sm:px-8 sm:text-lg lg:px-10 lg:py-5 font-bold text-white"
              >
                Contact Me
              </a>

              <a
                href="/CV.pdf"
                download="Sudiptyo_Das_CV.pdf"
                className="rounded-full border-2 border-[hsl(263_83%_63%)]/50 px-10 py-5 text-center text-lg font-bold text-white transition-colors hover:bg-[hsl(263_83%_63%)]/10"
              >
                Download CV
              </a>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4">
              <a
                href="https://github.com/Sudiptyo"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/sudiptyo-undefined-776472432?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
              >
                <FiLinkedin size={20} />
              </a>

              <a href="mailto:sudiptyo.dev@gmail.com" className={socialClass}>
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
