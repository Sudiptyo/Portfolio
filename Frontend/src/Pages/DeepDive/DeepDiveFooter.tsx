import { DeepDiveSectionData } from "@/Utils/DeepDiveSection";
import { HiArrowRight } from "react-icons/hi";
import LanguageCarousel from "@/animations/LanguageCarousel";

const DeepDiveFooter = () => {
  return (
    <div className="glass-card mt-12 px-5 py-8 sm:mt-16 sm:px-8 sm:py-10 lg:mt-20 lg:px-12 lg:py-15">
      <div className="flex flex-col gap-12">
        {/* Upper Section */}
        <div className="flex flex-col items-center">
          <h3 className="mb-3 text-center text-3xl font-bold text-white">
            {DeepDiveSectionData.topHeading}
          </h3>

          {/* Language Carousel */}
          <div className="mt-2 w-full flex justify-center">
            <LanguageCarousel
              languages={DeepDiveSectionData.languages}
              visibleCount={5}
              interval={2200}
            />
          </div>
        </div>

        {/* Lower Section */}
        <div className="relative -mt-2">
          <div className="absolute left-10 right-10 top-29 hidden h-0.5 bg-linear-to-r from-transparent via-white/10 to-transparent lg:block" />
          {/* <div className="absolute left-10 right-10 top-29 h-0.5 bg-linear-to-r from-transparent via-white/10 to-transparent" />  */}

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start">
            {DeepDiveSectionData.lowerSection.map(
              (
                {
                  id,
                  icon: Icon,
                  iconColor,
                  bgColor,
                  borderColor,
                  title,
                  description,
                },
                index,
              ) => (
                <div
                  key={id}
                  className="flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start"
                >
                  {/* Card */}
                  <div className="flex flex-1 flex-col items-center text-center">
                    <div
                      className="flex size-16 items-center justify-center rounded-full border"
                      style={{
                        backgroundColor: bgColor,
                        borderColor,
                      }}
                    >
                      <Icon
                        size={26}
                        style={{
                          color: iconColor,
                        }}
                      />
                    </div>

                    <h4 className="mt-7 text-xl font-bold text-white">
                      {title}
                    </h4>

                    <p className="mt-4 w-90 text-center text-sm leading-relaxed text-[#AAA3C2]">
                      {description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {index !== DeepDiveSectionData.lowerSection.length - 1 && (
                    <div className="hidden shrink-0 items-center justify-center py-2 lg:flex lg:w-10 lg:items-start lg:pt-6">
                      <HiArrowRight size={20} className="text-[#5D5874]" />
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepDiveFooter;
