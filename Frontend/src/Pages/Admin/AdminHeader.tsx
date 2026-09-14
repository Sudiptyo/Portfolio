import { adminSectionData } from "@/Utils/AdminSection";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const location = useLocation();

  const currentPage = adminSectionData.adminSideBar.pages.find((page) =>
    location.pathname.endsWith(page.link),
  );

  return (
    <header className="sticky top-0 z-30 flex items-center border-b border-white/5 bg-[#0A0714]/80 px-5 py-4 backdrop-blur-2xl sm:px-6">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Hamburger - Mobile Only */}
        <button
          onClick={onMenuClick}
          className="flex size-10 items-center justify-center rounded-xl text-[#AAA3C2] transition hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        {/* Admin Status */}
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-xs font-medium text-[#AAA3C2]">
            {adminSectionData.adminHeader.title}
          </span>
        </div>
      </div>

      {/* Current Page */}
      <div className="ml-auto text-xs text-[#AAA3C2]">
        {currentPage?.title ?? "Admin"}
      </div>
    </header>
  );
};

export default AdminHeader;
