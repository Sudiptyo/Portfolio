import FooterHeader from "./FooterHeader";
import FooterFooter from "./FooterFooter";

const Footer = () => {
  return (
    <>
      <section className="relative min-h-screen py-20 md:py-24 lg:py-30">
        <FooterHeader />
        <FooterFooter />
      </section>
    </>
  );
};

export default Footer;
