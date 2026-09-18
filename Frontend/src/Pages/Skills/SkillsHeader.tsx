const SkillsHeader = () => {
  return (
    <>
      {/* ======================= Section Header ======================= */}
      <div className="flex flex-col items-center">
        {/* ---------- Section Label ---------- */}
        <span className="text-[#0FD3FA] text-sm mb-4 tracking-widest font-semibold">
          TECH STACK
        </span>

        {/* ---------- Section Title ---------- */}
        <h2 className="text-4xl font-bold sm:text-5xl lg:text-5xl">
          My{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>

        {/* ---------- Section Description ---------- */}
        <p className="text-[#AAA3C2] text-lg mt-3 text-center lg:mt-4">
          Technologies I use across the full stack — from design to deployment
        </p>
      </div>
    </>
  );
};

export default SkillsHeader;
