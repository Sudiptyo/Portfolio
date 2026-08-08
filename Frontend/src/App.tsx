import { Element } from "react-scroll";

import Container from "./components/Layout/Container";
import Home from "./components/Home/Home";
import About from "./Pages/About/About";
import Skills from "./Pages/Skills/Skills";
import ProblemSolving from "./Pages/ProblemSolving/ProblemSolving";
import Services from "./Pages/Services/Services";
import Portfolio from "./Pages/Portfolio/Portfolio";
import Experience from "./Pages/Experience/Experience";
import Contact from "./Pages/Contact/Contact";
import DeepDive from "./Pages/DeepDive/DeepDive";
import Education from "./Pages/Education/Education";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Footer from "./Pages/Footer/Footer";

const App = () => {
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

      <Element name="portfolio">
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
