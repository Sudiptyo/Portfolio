import ProblemSolvingGrid from "./ProblemSolvingGrid";
import ProblemSolvingHeader from "./ProblemSolvingHeader";

const ProblemSolving = () => {
  return (
    <>
      {/* <div className="relative min-h-screen py-30"> */}
      <div className="relative min-h-screen py-20 md:py-24 lg:py-30">
        <ProblemSolvingHeader />
        <ProblemSolvingGrid />
      </div>
    </>
  );
};

export default ProblemSolving;
