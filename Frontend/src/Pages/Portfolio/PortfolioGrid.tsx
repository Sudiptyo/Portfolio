import { PortfolioSectionData } from "../../Utils/PortfolioSection";

const PortfolioGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-8 mt-10">
      {PortfolioSectionData.map(
        ({
          id,
          upperCardColor,
          projectType,
          timeTaken,
          techStack,
          title,
          description,
          livePreview: { icon: LiveIcon, text: liveText, url: liveUrl },
          github: { icon: GithubIcon, text: githubText, url: githubUrl },
        }) => (
          <div
            key={id}
            className="w-full overflow-hidden rounded-[28px] border border-white/8 bg-[#211B36] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
          >
            {/* ================= Header ================= */}
            <div
              className="relative h-56 px-8 py-7"
              style={{ background: upperCardColor }}
            >
              {/* Top Right */}
              <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                <span className="rounded-full border border-white/10 bg-black/15 px-4 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {projectType}
                </span>

                <span className="rounded-full border border-white/10 bg-black/15 px-4 py-1 text-xs text-white/80 backdrop-blur-md">
                  {timeTaken} weeks
                </span>
              </div>

              {/* Bottom Left */}
              <div className="absolute bottom-6 left-8 flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-black/15 px-4 py-1 text-xs font-medium text-white backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* ================= Content ================= */}
            <div className="px-8 py-8">
              <h3 className="text-xl font-bold leading-tight text-white">
                {title}
              </h3>

              <p className="mt-5 text-sm leading-relaxed text-[#AAA3C2]">
                {description}
              </p>

              <div className="my-8 h-px bg-white/8" />

              <div className="flex gap-4">
                <a
                  href={liveUrl}
                  className="flex items-center gap-2 rounded-2xl border border-[#8E52EF]/40 bg-[#8E52EF]/10 px-6 py-3 font-medium text-[#8E52EF] transition-colors duration-300 hover:bg-[#8E52EF]/20"
                >
                  <LiveIcon size={14} />
                  <span className="text-sm">{liveText}</span>
                </a>

                <a
                  href={githubUrl}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#BEB7D8] transition-colors duration-300 hover:bg-white/10"
                >
                  <GithubIcon size={14} />
                  <span className="text-sm">{githubText}</span>
                </a>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default PortfolioGrid;
