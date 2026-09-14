import { Element, scroller } from "react-scroll";
import Container from "./components/Layout/Container";
import Home from "./components/Home/Home";
import About from "./Pages/About/About";
import Skills from "./Pages/Skills/Skills";
import ProblemSolving from "./Pages/ProblemSolving/ProblemSolving";
import Services from "./Pages/Services/Services";
import Portfolio from "./Pages/Portfolio/Portfolio";
import Experience from "./Pages/Experience/Experience";
import DeepDive from "./Pages/DeepDive/DeepDive";
import Education from "./Pages/Education/Education";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Footer from "./Pages/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as {
      scrollTo?: string;
      scrollDuration?: number;
    } | null;

    if (!state?.scrollTo) return;

    const target = state.scrollTo;
    const duration = state.scrollDuration ?? 500;

    // Remove the scroll instruction from router state.
    // This prevents it from being reused after refresh/back navigation.
    navigate(location.pathname, {
      replace: true,
      state: null,
    });

    // Wait until the page has rendered.
    requestAnimationFrame(() => {
      scroller.scrollTo(target, {
        duration,
        delay: 0,
        smooth: "easeInOutCubic",
        offset: -80,
      });
    });
  }, [location, navigate]);

  useEffect(() => {
    // Always start at the top when the site is freshly loaded.
    if (!location.state?.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Element name="home">
        <Container>
          <Home />
        </Container>
      </Element>

      <Element name="about">
        <Container>
          <About />
        </Container>
      </Element>

      <Element name="skills">
        <div className="bg-[hsl(253_45%_15%)]/30 mt-35">
          <Container>
            <Skills />
          </Container>
        </div>
      </Element>

      <Container>
        <ProblemSolving />
      </Container>

      <Element name="services">
        <Container>
          <Services />
        </Container>
      </Element>

      <Element name="portfolio">
        <div className="bg-[hsl(253_45%_15%)]/30 mt-35">
          <Container>
            <Portfolio />
          </Container>
        </div>
      </Element>

      <Container>
        <DeepDive />
      </Container>

      <Element name="experience">
        <div className="bg-[hsl(253_45%_15%)]/30">
          <Container>
            <Experience />
          </Container>
        </div>
      </Element>

      <Container>
        <Education />
      </Container>

      <Element name="testimonial">
        <div className="bg-[hsl(253_45%_15%)]/30 mt-35">
          <Container>
            <Testimonial />
          </Container>
        </div>
      </Element>

      <Container>
        <Footer />
      </Container>
    </>
  );
};

export default App;
