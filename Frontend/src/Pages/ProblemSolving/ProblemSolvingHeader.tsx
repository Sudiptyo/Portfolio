const ProblemSolvingHeader = () => {
  return (
    <>
      {/* ======================= Section Header ======================= */}
      <div className="flex flex-col items-center">
        {/* ---------- Section Label ---------- */}
        <span className="text-[#0FD3FA] text-[14px] tracking-widest font-semibold">
          PROBLEM SOLVING
        </span>

        {/* ---------- Section Title ---------- */}
        <h2 className="text-[48px] font-bold">
          DSA &{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Algorithms
          </span>
        </h2>

        {/* ---------- Section Description ---------- */}
        <div className="flex flex-col text-center">
          <p className="text-[#AAA3C2] text-[18px]">
            Strong foundation in data structures and algorithms — writing
            optimized,
            <br />
          </p>
          <p className="text-[#AAA3C2] text-[18px]">clean solutions</p>
        </div>
      </div>
    </>
  );
};

export default ProblemSolvingHeader;
