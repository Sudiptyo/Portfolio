import FeedbackForm from "./FeedbackForm";
import FeedbackHeader from "./FeedbackHeader";

const Feedback = () => {
  return (
    <>
      <section className="relative min-h-screen py-30">
        <FeedbackHeader />
        <FeedbackForm />
      </section>
    </>
  );
};

export default Feedback;
