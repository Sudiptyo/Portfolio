import { NavLink, useLocation } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import { LuShieldCheck } from "react-icons/lu";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const Navbar = () => {
  const isAdmin = useSelector((state: RootState) => state.admin.isAdmin);

  const { pathname } = useLocation();
  const standAlonePage = ["/contact", "/admin", "/feedback"].includes(pathname);

  const navLinkStyle = ({ isActive }: NavLinkRenderProps): string =>
    `text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200 ${
      isActive ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`
    fixed top-0 left-0 w-full z-50
    transition-all duration-300
    ${
      scrolled
        ? "py-4 bg-[#090616]/55 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
        : "py-6 bg-transparent"
    }
  `}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <a href="/">
          <h2 className="text-3xl font-bold tracking-tighter bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent pl-6">
            Sudiptyo
          </h2>
        </a>
        {standAlonePage ? (
          <NavLink to="/">
            <button className="flex items-center gap-2 group text-base font-medium text-[#AAA3C2] transition-all duration-200">
              <FaArrowLeft className="group-hover:text-white" />
              <span className="group-hover:text-white">Back to Portfolio</span>
            </button>
          </NavLink>
        ) : (
          <ul className="flex items-center gap-6 -translate-x-5">
            <li>
              <NavLink className={navLinkStyle} to="/about">
                About
              </NavLink>
            </li>

            <li>
              <NavLink className={navLinkStyle} to="/skills">
                Skills
              </NavLink>
            </li>

            <li>
              <NavLink className={navLinkStyle} to="/services">
                Services
              </NavLink>
            </li>

            <li>
              <NavLink className={navLinkStyle} to="/portfolio">
                Portfolio
              </NavLink>
            </li>

            <li>
              <NavLink className={navLinkStyle} to="/experience">
                Experience
              </NavLink>
            </li>

            <li>
              <NavLink
                className="px-5 py-2.5 text-sm font-medium rounded-full bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white btn-glow"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>

            {isAdmin && (
              <li className="text-sm font-medium">
                <NavLink to="/admin">
                  <div className="flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[hsl(var(--primary))]/30 bg-primary/10 transition-all">
                    <LuShieldCheck size={18} />
                    <p>Admin</p>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
