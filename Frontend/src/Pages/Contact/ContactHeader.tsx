const ContactHeader = () => {
  return (
    <>
      {/* ======================= Section Header ======================= */}
      <div className="flex flex-col items-center">
        {/* ---------- Section Label ---------- */}
        <span className="text-[#0FD3FA] text-sm tracking-widest font-semibold">
          GET IN TOUCH
        </span>

        {/* ---------- Section Title ---------- */}
        <h1 className="text-6xl font-bold mt-4">
          Let's Work{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Together
          </span>
        </h1>

        {/* ---------- Section Description ---------- */}
        <p className="text-[#AAA3C2] text-xl text-center mt-4">
          Have a project, idea, or need a full-stack solution? Fill out the form
          <br />
          and I'll get back to you within 24 hours.
        </p>
      </div>
    </>
  );
};

export default ContactHeader;
