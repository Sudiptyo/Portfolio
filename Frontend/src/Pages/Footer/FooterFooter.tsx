import { footerSectionData } from "@/Utils/FooterSection";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

const FooterFooter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleQuickLink = (link?: string) => {
    if (!link) return;

    // Section links: /#about, /#portfolio, /#services
    if (link.startsWith("/#")) {
      const target = link.substring(2);

      if (pathname === "/") {
        scroller.scrollTo(target, {
          duration: 500,
          smooth: "easeInOutCubic",
          offset: -80,
        });
      } else {
        navigate("/", {
          state: {
            scrollTo: target,
          },
        });
      }

      return;
    }

    // Normal route: /contact
    navigate(link);
  };

  return (
    <footer className="mt-20 border-t border-white/10 pt-10">
      {footerSectionData.map((section) => (
        <div
          key={section.description.name}
          className="grid grid-cols-2 gap-12 max-[380px]:grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr]"
          // className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr_1fr]"
        >
          {/* Left */}
          <div className="flex flex-col max-md:col-span-2 max-[380px]:col-span-1">
            {/* <div className="flex flex-col"> */}
            <h3 className="mb-3 bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
              {section.description.name}
            </h3>

            <p className="mb-4 text-sm leading-relaxed text-[#AAA3C2]">
              {section.description.title}
            </p>

            <p className="text-sm leading-relaxed text-[oklab(0.731774_0.0189071_-0.0400685/0.7)]">
              {section.description.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            {/* <div className="flex flex-col"> */}
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              {section.links.title}
            </h4>

            <div className="flex flex-col gap-4">
              {section.links.links.map(({ id, icon: Icon, name, link }) => {
                const isSectionLink = link?.startsWith("/#");

                if (isSectionLink) {
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleQuickLink(link)}
                      className="group flex cursor-pointer items-center gap-1 text-left text-sm text-[#AAA3C2] transition-colors hover:text-white"
                    >
                      <Icon
                        size={11}
                        className="text-[hsl(263_83%_63%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />

                      {name}
                    </button>
                  );
                }

                return (
                  <NavLink
                    key={id}
                    to={link ?? "/"}
                    className="group flex items-center gap-1 text-sm text-[#AAA3C2] transition-colors hover:text-white"
                  >
                    <Icon
                      size={11}
                      className="text-[hsl(263_83%_63%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {name}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col">
            {/* <div className="flex flex-col"> */}
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              {section.connect.title}
            </h4>

            <div className="flex flex-col gap-4">
              {section.connect.links.map(({ id, icon: Icon, name, link }) => (
                <a
                  key={id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[#AAA3C2] transition-colors hover:text-white"
                >
                  <Icon
                    size={14}
                    className="transition-transform duration-300 group-hover:text-[hsl(263_83%_63%)]"
                  />

                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Divider */}
      <div className="mt-10 h-px w-full bg-white/10" />

      {/* Copyright */}
      <div className="lg:mt-8 lg:-mb-22 mt-8 -mb-18 flex items-center justify-center pb-0">
        {/* <div className="mt-8 -mb-22 flex items-center justify-center pb-0"> */}
        <p className="text-sm font-medium tracking-wide text-[#AAA3C2]">
          © {new Date().getFullYear()} Sudiptyo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterFooter;
