import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from "framer-motion";

const Layout = () => {
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();
  const standAlonePage = ["/contact", "/admin", "/feedback"].includes(pathname);

  const scaleX = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    animate(scaleX, latest, {
      duration: 2,
      ease: "easeOut",
    });
  });

  return (
    <>
      {!standAlonePage && (
        <motion.div
          style={{ scaleX }}
          className="hidden lg:block fixed top-0 left-0 z-9999 h-0.75 w-full origin-left rounded-r-full
             bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400
             shadow-[0_0_18px_rgba(139,92,246,0.8)]"
        />
      )}
      {pathname !== "/admin" && <Navbar />}
      <main className="pt-9">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
