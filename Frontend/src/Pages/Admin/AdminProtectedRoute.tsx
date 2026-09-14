import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";

const AdminProtectedRoute = () => {
  const { isAdmin, checkingSession } = useSelector(
    (state: RootState) => state.admin,
  );

  const location = useLocation();

  if (checkingSession) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        Loading...
      </div>
    );
  }

  // Don't redirect until session verification finishes.
  if (!isAdmin) {
    return (
      <Navigate
        to="/contact"
        replace
        state={{
          message:
            "Admin name and email are required to access the admin panel.",
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
