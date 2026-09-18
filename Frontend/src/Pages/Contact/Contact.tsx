import ContactForm from "./ContactForm";
import ContactHeader from "./ContactHeader";

const Contact = () => {
  return (
    <>
      <section className="relative min-h-screen py-25">
        <ContactHeader />
        <div className="mx-auto w-full max-w-6xl sm:px-4">
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default Contact;
