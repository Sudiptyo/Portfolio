import DeepDiveFooter from "./DeepDiveFooter";
import DeepDiveHeader from "./DeepDiveHeader";
import Container from "@/components/Layout/Container";

const DeepDive = () => {
  return (
    <>
      <section className="relative min-h-screen py-25">
        <DeepDiveHeader />
        <DeepDiveFooter />
      </section>
    </>
  );
};

export default DeepDive;
