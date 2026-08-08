const ServicesHeader = () => {
  return (
    <>
      {/* ======================= Section Header ======================= */}
      <div className="flex flex-col items-center">
        {/* ---------- Section Label ---------- */}
        <span className="text-[#0FD3FA] text-[14px] tracking-widest font-semibold">
          WHAT I DO
        </span>

        {/* ---------- Section Title ---------- */}
        <h2 className="text-[48px] font-bold">
          My{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Services
          </span>
        </h2>

        {/* ---------- Section Description ---------- */}
        <div className="flex flex-col text-center">
          <p className="text-[#AAA3C2] text-[18px]">
            End-to-end solutions — from design thinking to production-ready
            systems
            <br />
          </p>
        </div>
      </div>
    </>
  );
};

export default ServicesHeader;
