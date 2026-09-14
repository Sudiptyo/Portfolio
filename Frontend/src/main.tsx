import "./Config/Logger";
import "./Config/Sentry";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer } from "react-toastify";

import "./index.css";

import Layout from "./components/Layout/Layout";
import App from "./App";

import Contact from "./Pages/Contact/Contact";
import Container from "./components/Layout/Container";
import Feedback from "./Pages/Feedback/Feedback";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashBoard from "./Pages/Admin/AdminDashBoard";
import AdminContacts from "./Pages/Admin/AdminContacts";
import AdminFeedbacks from "./Pages/Admin/AdminFeedbacks";
import AdminProtectedRoute from "./Pages/Admin/AdminProtectedRoute";
import AuthInitializer from "./Pages/Admin/AuthInitializer";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/contact",
        element: (
          <Container>
            <Contact />
          </Container>
        ),
      },
      {
        path: "/feedback",
        element: (
          <Container>
            <Feedback />
          </Container>
        ),
      },
    ],
  },
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <AdminDashBoard />,
          },
          {
            path: "contacts",
            element: <AdminContacts />,
          },
          {
            path: "feedbacks",
            element: <AdminFeedbacks />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer />
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        newestOnTop
        closeOnClick
        theme="dark"
      />
    </Provider>
  </StrictMode>,
);
