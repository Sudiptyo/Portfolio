// import { getFeeedback } from "@/API/apiClientThunks";
// import { useAppDispatch, useAppSelector } from "@/Hooks/ReduxHooks";
// import { Quote, Star } from "lucide-react";
// import { useEffect } from "react";

// const TestimonialFooter = () => {
//   const dispatch = useAppDispatch();
//   const { items: feedbacks, loading } = useAppSelector(
//     (state) => state.feedback,
//   );

//   useEffect(() => {
//     dispatch(
//       getFeeedback({
//         page: 1,
//         limit: 10,
//         status: "approved",
//         sortBy: "rating",
//         order: "asc",
//       }),
//     );
//   }, [dispatch]);

//   if (loading && (!feedbacks || feedbacks.length === 0)) {
//     return (
//       <p className="text-center text-[#AAA3C2] my-8">Loading Feedbacks...</p>
//     );
//   }

//   return (
//     <div className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-8 mt-20">
//       {feedbacks?.map((item, index) => (
//         <div
//           key={item._id || index}
//           className="
//               glass-card
//               relative
//               overflow-hidden
//               p-10
//               transition-all
//               duration-300
//               hover:-translate-y-2
//               group
//             "
//         >
//           {/* Quote Icon */}
//           <Quote
//             size={90}
//             className="
//                 absolute
//                 top-8
//                 right-8
//                 text-white/4
//                 group-hover:text-white/8
//                 transition-colors
//               "
//           />

//           {/* Stars */}
//           <div className="mb-8 flex gap-1">
//             {Array.from({ length: item.rating }).map((_, starIndex) => (
//               <Star
//                 // key={index}
//                 key={`star-${item._id || index}-${starIndex}`}
//                 size={16}
//                 className="fill-[#0FD3FA] text-[#0FD3FA]"
//               />
//             ))}
//           </div>

//           {/* Review */}
//           <p className="relative -mt-3 mb-8 text-[18px] font-medium leading-relaxed text-white/90">
//             “{item.comment}”
//           </p>

//           {/* Divider */}
//           <div className="mb-8 h-px w-full bg-white/10" />

//           {/* Client */}
//           <div className="flex items-center gap-4 -mt-2">
//             {/* Avatar */}
//             <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400">
//               {item.profileImage ? (
//                 <img
//                   src={item.profileImage}
//                   alt={item.fullName}
//                   className="size-full object-cover"
//                 />
//               ) : (
//                 <span className="text-lg font-bold text-white">
//                   {item.fullName.charAt(0)}
//                 </span>
//               )}
//             </div>

//             {/* Info */}
//             <div>
//               <h4 className="text-base font-bold text-white">
//                 {item.fullName}
//               </h4>

//               <span className="text-sm font-semibold text-[#0FD3FA]">
//                 {item.role ?? "Verified Client"}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TestimonialFooter;

import { getFeeedback } from "@/API/apiClientThunks";
import { useAppDispatch, useAppSelector } from "@/Hooks/ReduxHooks";
import { Quote, RefreshCw, Star } from "lucide-react";
import { useEffect } from "react";

const TestimonialFooter = () => {
  const dispatch = useAppDispatch();
  const { items: feedbacks, loading } = useAppSelector(
    (state) => state.feedback,
  );

  useEffect(() => {
    dispatch(
      getFeeedback({
        page: 1,
        limit: 10,
        status: "approved",
        sortBy: "rating",
        order: "desc",
      }),
    );
  }, [dispatch]);

  if (loading && (!feedbacks || feedbacks.length === 0)) {
    return (
      <div className="flex items-center justify-center gap-2 my-8 text-[#AAA3C2]">
        <RefreshCw className="size-5 animate-spin text-[#0FD3FA]" />
        <span>Loading Feedbacks...</span>
      </div>
    );
  }

  return (
    /* ✅ Updated grid container: centers items and sets clean responsive layout */
    <div className="flex flex-wrap justify-center gap-8 mt-20">
      {feedbacks?.map((item, index) => (
        <div
          key={item._id || index}
          className="
              glass-card
              relative
              overflow-hidden
              p-10
              transition-all
              duration-300
              hover:-translate-y-2
              group
              w-full
              max-w-145
              flex-1
              min-w-[320px]
            "
        >
          {/* Quote Icon */}
          <Quote
            size={90}
            className="
                absolute
                top-8
                right-8
                text-white/4
                group-hover:text-white/8
                transition-colors
              "
          />

          {/* Stars */}
          <div className="mb-8 flex gap-1">
            {Array.from({ length: item.rating }).map((_, starIndex) => (
              <Star
                key={`star-${item._id || index}-${starIndex}`}
                size={16}
                className="fill-[#0FD3FA] text-[#0FD3FA]"
              />
            ))}
          </div>

          {/* Review */}
          <p className="relative -mt-3 mb-8 text-[18px] font-medium leading-relaxed text-white/90">
            “{item.comment}”
          </p>

          {/* Divider */}
          <div className="mb-8 h-px w-full bg-white/10" />

          {/* Client */}
          <div className="flex items-center gap-4 -mt-2">
            {/* Avatar */}
            <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400">
              {item.profileImage ? (
                <img
                  src={item.profileImage}
                  alt={item.fullName}
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-white">
                  {item.fullName.charAt(0)}
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <h4 className="text-base font-bold text-white">
                {item.fullName}
              </h4>

              <span className="text-sm font-semibold text-[#0FD3FA]">
                {item.role ?? "Verified Client"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialFooter;