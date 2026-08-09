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
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  // useEffect(() => {
  //   if (location.state && (location.state as { scrollTo?: any }).scrollTo) {
  //     const target = (location.state as { scrollTo?: any }).scrollTo;
  //     scroller.scrollTo(target, {
  //       duration: state.scrollDuration || 500,
  //       delay: 0,
  //       smooth: "easeInOutQuart",
  //       offset: -80,
  //     });
  //   }
  // }, [location]);

  useEffect(() => {
  const state = location.state as { scrollTo?: string; scrollDuration?: number } | null;

  if (state?.scrollTo) {
    scroller.scrollTo(state.scrollTo, {
      duration: state.scrollDuration ?? 500, // Uses 2500ms for feedback submit, 500ms for everything else
      delay: 100,
      smooth: "easeInOutCubic",
      offset: -80,
    });
  }
}, [location]);

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
