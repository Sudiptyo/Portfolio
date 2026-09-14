import { logoutAdmin } from "@/API/apiAdminThunks";
import type { AppDispatch, RootState } from "@/store/store";
import { adminSectionData } from "@/Utils/AdminSection";
import { ChevronRight, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const HeaderIcon = adminSectionData.adminSideBar.header.icon;
const FooterIcon = adminSectionData.adminSideBar.footer.icon;

type AdminSideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AdminSideBar = ({ isOpen, onClose }: AdminSideBarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.admin.loading);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loading) return;
    try {
      onClose();
      await dispatch(logoutAdmin()).unwrap();
      navigate("/", { replace: true });
    } catch {}
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-dvh w-65 shrink-0 flex-col border-r border-white/5 bg-[#110D25] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="shrink-0 border-b border-white/5 px-6 py-6">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
              <HeaderIcon size={18} />
            </div>

            {/* Title */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">
                {adminSectionData.adminSideBar.header.title}
              </p>

              <p className="mt-0.5 truncate text-xs text-[#AAA3C2]">
                {adminSectionData.adminSideBar.header.description}
              </p>
            </div>

            {/* Close Button - Mobile Only */}
            <button
              onClick={onClose}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#AAA3C2] transition hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {adminSectionData.adminSideBar.pages.map(
            ({ id, icon: Icon, title, link }) => (
              <NavLink
                key={id}
                to={link}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex w-full items-center gap-3 rounded-3xl px-5 py-3.5 transition-all duration-200 ${
                    isActive
                      ? "border border-violet-500/30 bg-violet-500/15 text-white shadow-[0_0_20px_rgba(139,92,246,0.08)]"
                      : "text-[#AAA3C2] hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={
                        isActive
                          ? "text-violet-400"
                          : "text-[#AAA3C2] group-hover:text-white"
                      }
                    />

                    <span className="flex-1 text-sm font-medium">{title}</span>

                    {isActive && (
                      <ChevronRight size={16} className="text-violet-400" />
                    )}
                  </>
                )}
              </NavLink>
            ),
          )}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/5 p-4">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex w-full items-center gap-3 rounded-xl px-5 py-3.5 text-[#AAA3C2] transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <FooterIcon size={18} />

            <span className="flex-1 text-sm font-medium">
              {adminSectionData.adminSideBar.footer.title}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;
