import ServicesGrid from "./ServicesGrid";
import ServicesHeader from "./ServicesHeader";

const Services = () => {
  return (
    <>
      <section id="services" className="relative min-h-screen py-30">
        <ServicesHeader />
        <ServicesGrid />
      </section>
    </>
  );
};

export default Services;
