import { ServiceSectionData } from "../../Utils/ServicesSection";

const ServicesGrid = () => {
  return (
    <>
      {/* <div className="grid grid-cols-3 gap-8 mt-20 items-stretch"> */}
      <div className="mt-14 grid grid-cols-1 items-stretch gap-5 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {ServiceSectionData.map(
          ({ id, badge, icon: Icon, title, description }) => (
            <div
              key={id}
              // className="glass-card p-8 group hover:-translate-y-2 h-full"
              className="glass-card group h-full p-5 hover:-translate-y-2 sm:p-8"
            >
              <div className="flex flex-col gap-4">
                {badge && (
                  <div className="inline-flex self-start px-2.5 py-1 bg-purple-600/10 rounded-2xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#8E52EF] rounded-full"></span>
                      <span className="text-[12px] text-[#8E52EF]">
                        {badge}
                      </span>
                    </div>
                  </div>
                )}
                <div className="service-icon-box">
                  <Icon
                    size={26}
                    className="text-[#8E52EF] relative z-10 transition-all duration-300 group-hover:text-[#0FD3FA] group-hover:drop-shadow-[0_0_4px_rgba(15,211,250,.65)]"
                  />
                </div>
                <div className="flex flex-col gap-3 mt-1">
                  <h3 className="font-bold text-xl text-white">{title}</h3>
                  <p className="leading-relaxed text-sm text-[#AAA3C2]">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
};

export default ServicesGrid;
