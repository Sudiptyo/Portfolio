import { LuRefreshCw } from "react-icons/lu";

const TestimonialHeader = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-[#0FD3FA] text-[14px] tracking-widest font-semibold">
          TESTIMONIALS
        </span>

        <h2 className="text-[48px] font-bold">
          What{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Clients Say
          </span>
        </h2>

        <p className="text-[#AAA3C2] text-[18px]">
          Feedback from people I've had the pleasure to build with
        </p>

        <div className="flex items-center gap-3 mt-8">
          <a href="/feedback" className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-glow bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400">
            <span className="text-white font-semibold text-sm">+</span>
            <span className="text-white font-semibold text-sm">
              Add Feedback
            </span>
          </a>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 group transition-all duration-200">
            <LuRefreshCw className="text-[#AAA3C2] font-semibold text-sm group-hover:text-white" />
            <span className="text-[#AAA3C2] font-semibold text-sm group-hover:text-white">
              Refresh
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TestimonialHeader;
