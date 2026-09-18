const ExperienceHeader = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* ---------- Section Label ---------- */}
        <span className="text-[#0FD3FA] text-sm mb-4 tracking-widest font-semibold">
          JOURNEY
        </span>

        {/* ---------- Section Title ---------- */}
        <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Experience
        </h2>

        {/* ---------- Section Description ---------- */}
        <p className="text-[#AAA3C2] text-center sm:text-lg text-lg mt-3 lg:mt-4">
          My professional journey and growth over the years
        </p>
      </div>
    </>
  );
};

export default ExperienceHeader;
