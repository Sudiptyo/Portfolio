const ProblemSolvingHeader = () => {
  return (
    <>
      {/* ======================= Section Header ======================= */}
      <div className="flex flex-col items-center">
        {/* ---------- Section Label ---------- */}
        <span className="text-[#0FD3FA] text-sm mb-4 tracking-widest font-semibold">
          PROBLEM SOLVING
        </span>

        {/* ---------- Section Title ---------- */}
       <h2 className="text-4xl font-bold sm:text-5xl lg:text-5xl">
          DSA &{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Algorithms
          </span>
        </h2>

        {/* ---------- Section Description ---------- */}
        <div className="flex flex-col text-center">
          <p className="text-[#AAA3C2] text-lg mt-3 text-center lg:mt-4">
            Strong foundation in data structures and algorithms — writing
            optimized,
            <br />
          </p>
          <p className="text-[#AAA3C2] text-lg text-center">clean solutions</p>
        </div>
      </div>
    </>
  );
};

export default ProblemSolvingHeader;
