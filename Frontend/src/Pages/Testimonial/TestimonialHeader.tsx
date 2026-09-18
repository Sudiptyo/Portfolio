// import { getFeedback } from "@/API/apiClientThunks";
// import { useAppDispatch, useAppSelector } from "@/Hooks/ReduxHooks";
// import type { RootState } from "@/store/store";
// import { LuRefreshCw } from "react-icons/lu";

// const TestimonialHeader = () => {
//   const dispatch = useAppDispatch();

//   const { items: feedback, loading } = useAppSelector(
//     (state: RootState) => state.feedback,
//   );
//   const handleRefresh = () => {
//     dispatch(
//       getFeedback({
//         page: 1,
//         limit: 10,
//         status: "APPROVED",
//         sortBy: "rating",
//         order: "asc",
//       }),
//     );
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center">
//         <span className="text-[#0FD3FA] text-[14px] tracking-widest font-semibold">
//           TESTIMONIALS
//         </span>

//         <h2 className="text-[48px] font-bold">
//           What{" "}
//           <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
//             Clients Say
//           </span>
//         </h2>

//         <p className="text-[#AAA3C2] text-[18px]">
//           Feedback from people I've had the pleasure to build with
//         </p>

//         <div className="flex items-center gap-3 mt-8">
//           <a
//             href="/feedback"
//             className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-glow bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400"
//           >
//             <span className="text-white font-semibold text-sm">+</span>
//             <span className="text-white font-semibold text-sm">
//               Add Feedback
//             </span>
//           </a>
//           <button
//             onClick={handleRefresh}
//             disabled={loading}
//             className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 group transition-all duration-200"
//           >
//             <LuRefreshCw
//               className={`text-[#AAA3C2] font-semibold text-sm group-hover:text-white ${loading ? "animate-spin" : ""}`}
//             />
//             <span className="text-[#AAA3C2] font-semibold text-sm group-hover:text-white">
//               {loading ? "Refreshing..." : "Refresh"}
//             </span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TestimonialHeader;

import { getTopFeedback } from "@/API/apiClientThunks";
import { useAppDispatch, useAppSelector } from "@/Hooks/ReduxHooks";
import type { RootState } from "@/store/store";
import { LuRefreshCw } from "react-icons/lu";

const TestimonialHeader = () => {
  const dispatch = useAppDispatch();

  const { items: feedback, loading } = useAppSelector(
    (state: RootState) => state.feedback,
  );

  const handleRefresh = () => {
    dispatch(
      getTopFeedback({ refresh: true }),
      // getFeedback({
      //   page: 1,
      //   limit: 10,
      //   status: "approved",
      //   sortBy: "rating",
      //   order: "desc",
      // }),
    );
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-[#0FD3FA] text-sm mb-4 tracking-widest font-semibold">
          TESTIMONIALS
        </span>

        <h2 className="text-4xl font-bold sm:text-5xl lg:text-5xl">
          What{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Clients Say
          </span>
        </h2>

        <p className="text-[#AAA3C2] text-lg mt-3 text-center lg:mt-4">
          Feedback from people I've had the pleasure to build with
        </p>

        <div className="flex items-center gap-3 mt-8">
          <a
            href="/feedback"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-glow bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400"
          >
            <span className="text-white font-semibold text-sm">+</span>
            <span className="text-white font-semibold text-sm">
              Add Feedback
            </span>
          </a>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 group transition-all duration-200"
          >
            <LuRefreshCw
              className={`text-[#AAA3C2] font-semibold text-sm group-hover:text-white ${loading ? "animate-spin" : ""}`}
            />
            <span className="text-[#AAA3C2] font-semibold text-sm group-hover:text-white">
              {loading ? "Refreshing..." : "Refresh"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TestimonialHeader;
