import { EducationSectionData } from "@/Utils/EducationSection";

const EducationFooter = () => {
  const Icon = EducationSectionData.icon;

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="glass-card relative w-full max-w-235 overflow-hidden px-10 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
          {/* Icon */}
          <div className="size-16 sm:size-22 shrink-0 rounded-2xl flex items-center justify-center bg-linear-to-br from-[hsl(263_83%_63%)]/30 to-[hsl(190_96%_52%)]/20 border border-[hsl(263_83%_63%)]/20 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Icon size={40} className="text-[hsl(263_83%_63%)]" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col">
            {/* Title + Status */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div>
                <h3 className="mb-2 text-2xl font-bold leading-tight text-white">
                  {EducationSectionData.degree}
                </h3>

                <h4 className="text-lg font-medium text-[#0FD3FA]">
                  {EducationSectionData.instituteName}
                </h4>
              </div>

              <span
                className="
                  shrink-0
                  rounded-full
                  border
                  border-[hsl(190_96%_52%)]/20
                  bg-[hsl(190_96%_52%)]/10
                  px-4
                  py-1.5
                  text-sm
                  font-medium
                  text-[hsl(190_96%_52%)]
                "
              >
                {EducationSectionData.currentStatus}
              </span>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="mb-8 w-full max-w-162.5 leading-relaxed text-[#AAA3C2]">
                {EducationSectionData.description}
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-3">
              {EducationSectionData.skills.map(({ id, icon: Icon, name }) => (
                <div
                  key={id}
                  className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-2
                    "
                >
                  <Icon className="text-[hsl(263_83%_63%)]" size={14} />

                  <span className="text-sm text-[#AAA3C2]">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationFooter;
