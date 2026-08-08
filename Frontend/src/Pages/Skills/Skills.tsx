import SkillsHeader from "./SkillsHeader";
import SkillsGrid from "./SkillsGrid";

const Skills = () => {
  return (
    <>
      <section id="skills" className="relative min-h-screen py-30">
        <SkillsHeader />
        <SkillsGrid />
      </section>
    </>
  );
}; 

export default Skills;
