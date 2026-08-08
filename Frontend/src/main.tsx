import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer } from "react-toastify";

import "./index.css";

import Layout from "./components/Layout/Layout";
import App from "./App";

import Contact from "./Pages/Contact/Contact";
import Admin from "./Pages/Admin/Admin";
import Container from "./components/Layout/Container";
import Feedback from "./Pages/Feedback/Feedback";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
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
