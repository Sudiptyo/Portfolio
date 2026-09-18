import ExperienceFooter from "./ExperienceFooter";
import ExperienceHeader from "./ExperienceHeader";

const Experience = () => {
  return (
    <>
      <section
        id="experience"
        className="relative min-h-screen py-20 md:py-24 lg:py-30"
      >
        <ExperienceHeader />
        <ExperienceFooter />
      </section>
    </>
  );
};

export default Experience;
