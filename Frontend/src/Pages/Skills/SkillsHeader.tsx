const SkillsHeader = () => {
  return (
    <>
      {/* ======================= Section Header ======================= */}
      <div className="flex flex-col items-center">
        {/* ---------- Section Label ---------- */}
        <span className="text-[#0FD3FA] text-[14px] tracking-widest font-semibold">
          TECH STACK
        </span>

        {/* ---------- Section Title ---------- */}
        <h2 className="text-[48px] font-bold">
          My{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>

        {/* ---------- Section Description ---------- */}
        <p className="text-[#AAA3C2] text-[18px]">
          Technologies I use across the full stack — from design to deployment
        </p>
      </div>
    </>
  );
};

export default SkillsHeader;