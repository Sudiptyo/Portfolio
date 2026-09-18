import { SkillsSectionData } from "../../Utils/SkillsSections";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";

const SkillsGrid = () => {
  return (
    <>
      {/* ======================= Skills Grid ======================= */}
      {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(370px,1fr))] gap-8 mt-18"> */}
      <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3 lg:gap-8">
        {SkillsSectionData.map(
          ({ id, title, titleColor, skills, cardColor }) => (
            <div
              key={id}
              style={{ background: cardColor }}
              // className="glass-card rounded-2xl p-7 flex flex-col h-70"
              className="glass-card flex h-70 flex-col rounded-2xl p-5 sm:p-7"
            >
              {/* ======================= Card Header ======================= */}
              <div className="ml-2 flex shrink-0 items-center gap-3 sm:ml-7">
                {/* <div className="flex items-center gap-3 shrink-0 ml-7"> */}
                <span
                  className="size-2 rounded-full"
                  style={{ background: titleColor }}
                />

                <h3
                  style={{ color: titleColor }}
                  className="text-sm font-bold"
                >
                  {title}
                </h3>
              </div>

              {/* ======================= Scroll Area ======================= */}
              <div className="flex-1 -mt-1 overflow-y-auto scrollbar-none">
                {/* ======================= Chips Wrapper ======================= */}
                <div className="flex flex-wrap gap-2 pt-4 pl-4 pr-2 pb-2 content-start">
                  {skills.map(({ idx, name, icon: Icon, hoverText }) => (
                    <div key={idx} className="p-1.5 group relative">
                      {/* ======================= Skill Chip ======================= */}
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                        transition={{
                          duration: 0.1,
                        }}
                        data-tooltip-id="skill-tooltip" // <-- NEW
                        data-tooltip-content={hoverText} // <-- NEW
                        style={
                          {
                            "--chip-glow": titleColor,
                          } as React.CSSProperties
                        }
                        className="glass-chip flex items-center gap-2 px-4 py-3 rounded-2xl cursor-default transition-all duration-300"
                      >
                        <span
                          className="text-[#AAA3C2] transition-colors duration-150 group-hover:text-(--skill-color)"
                          style={
                            {
                              "--skill-color": titleColor,
                            } as React.CSSProperties
                          }
                        >
                          <Icon className="size-3.5" />
                        </span>
                        <span className="text-xs font-medium text-[#AAA3C2] group-hover:text-white">
                          {name}
                        </span>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* ======================= Global Tooltip ======================= */}
      <Tooltip
        id="skill-tooltip"
        place="top"
        offset={7} // The lower the closer
        opacity={1}
        delayShow={80}
        className="rounded-4xl! border! border-[hsl(var(--border))]! bg-[hsl(var(--background))]! text-xs! text-white! shadow-lg! whitespace-nowrap!"
        classNameArrow="!bg-[hsl(var(--background))]"
      />
    </>
  );
};

export default SkillsGrid;
