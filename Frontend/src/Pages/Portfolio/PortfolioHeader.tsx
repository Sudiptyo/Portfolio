const PortfolioHeader = () => {
  return (
    <>
      {/* ======================= Section Header ======================= */}
      <div className="flex flex-col items-center">
        {/* ---------- Section Label ---------- */}
        <span className="text-[#0FD3FA] text-[14px] tracking-widest font-semibold">
          PROJECTS
        </span>

        {/* ---------- Section Title ---------- */}
        <h2 className="text-[48px] font-bold">
          My{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Work
          </span>
        </h2>

        {/* ---------- Section Description ---------- */}
        <p className="text-[#AAA3C2] text-[18px]">
          Full stack projects — design, code, backend, and everything in between
        </p>
      </div>
    </>
  );
};

export default PortfolioHeader;
