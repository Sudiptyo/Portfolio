import DeepDiveFooter from "./DeepDiveFooter";
import DeepDiveHeader from "./DeepDiveHeader";

const DeepDive = () => {
  return (
    <>
      <section className="relative min-h-screen py-20 md:py-24 lg:py-25">
        <DeepDiveHeader />
        <DeepDiveFooter />
      </section>
    </>
  );
};

export default DeepDive;
