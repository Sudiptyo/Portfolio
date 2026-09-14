import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh">
      {/* Sidebar */}
      <AdminSideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Right Side */}
      <div className="min-h-dvh bg-[oklab(0.141174_0.0116267_-0.0262646)] lg:ml-65">
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Only this changes */}
        <main className="p-5 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
