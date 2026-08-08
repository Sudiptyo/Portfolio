import { ProblemSolvingSectionData } from "../../Utils/ProblemSolvingSection";

const ProblemSolvingGrid = () => {
  return (
    <>
      <div className="grid grid-cols-[48%_52%] gap-8 pt-18">
        {/* ================= Left Column ================= */}
        <div className="flex flex-col gap-8">
          {/* Upper Card */}
          <div className="glass-card-static p-8 flex flex-col gap-4">
            {/* Upper Upper */}
            {ProblemSolvingSectionData.hero.map(
              ({ id, icon: Icon, solved, subTitle, description, links }) => (
                <div key={id}>
                  <div className="flex items-center gap-4">
                    <div className="flex rounded-2xl p-4 w-14 h-14 items-center justify-center bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400">
                      <Icon className="text-white" size={40} />
                    </div>

                    <div className="flex flex-col  bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      <span className="text-[36px] font-bold">{solved}+</span>

                      <span className="text-[#AAA3C2] text-[14px] -mt-2">
                        {subTitle}
                      </span>
                    </div>
                  </div>

                  <div className="pt-5">
                    <span className="text-[16px] text-[#AAA3C2]">
                      {description}
                    </span>
                  </div>

                  <div className="flex gap-4 pt-4">
                    {links.map(({ id, name, url, icon: Icon }) => (
                      <div
                        key={id}
                        className="glass-card-static rounded-lg px-4 py-2 flex items-center gap-2 group transition-all duration-200 hover:bg-[rgba(66,43,110,0.45)]"
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[14px] text-[#AAA3C2] group-hover:text-white transition-all duration-200"
                        >
                          {name}
                        </a>

                        <Icon
                          className="text-[#AAA3C2] group-hover:text-white"
                          size={12}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Lower Card */}
          <div className="glass-card p-8">
            {ProblemSolvingSectionData.approach.map(({ id, title, items }) => (
              <div key={id}>
                <h3 className="text-white font-bold tracking-widest text-[14px]">
                  {title}
                </h3>

                {items.map(({ id, text }) => (
                  <ul key={id} className="mt-4 flex flex-col gap-4">
                    <li className="flex items-start gap-3 text-[#AAA3C2] text-[14px]">
                      <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0FD3FA]" />
                      <span>{text}</span>
                    </li>
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ================= Right Column ================= */}
        <div>
          <h3 className="text-white font-bold text-[18px] mb-6">Strong In</h3>

          <div className="grid grid-cols-2 gap-5">
            {ProblemSolvingSectionData.strongIn.map(
              ({
                id,
                icon: Icon,
                text,
                cardColor,
                borderColor,
                iconColor,
                iconBg,
              }) => (
                <div
                  key={id}
                  className="glass-card-static w-full border border-[#2E6CF5]/40 rounded-3xl"
                  style={{
                    background: cardColor,
                    borderColor,
                  }}
                >
                  <div className="p-5 flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-2xl backdrop-blur-md flex items-center justify-center"
                      style={{
                        background: iconBg,
                        borderColor: "rgba(255,255,255,.06)",
                      }}
                    >
                      <Icon style={{ color: iconColor }} size={18} />
                    </div>

                    <span className="text-white font-semibold text-[15px]">
                      {text}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemSolvingGrid;
