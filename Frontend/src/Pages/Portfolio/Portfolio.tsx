import PortfolioGrid from "./PortfolioGrid";
import PortfolioHeader from "./PortfolioHeader";

const Portfolio = () => {
  return (
    <>
      <section id="portfolio" className="relative min-h-screen py-30">
        <PortfolioHeader />
        <PortfolioGrid />
      </section>
    </>
  );
};

export default Portfolio;
