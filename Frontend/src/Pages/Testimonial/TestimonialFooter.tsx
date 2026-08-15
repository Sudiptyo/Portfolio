// import { getTopFeedback } from "@/API/apiClientThunks";
// import { useAppDispatch, useAppSelector } from "@/Hooks/ReduxHooks";
// import { Quote, RefreshCw, Star } from "lucide-react";
// import { useCallback, useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";

// const TestimonialFooter = () => {
//   const dispatch = useAppDispatch();
//   const { items: feedbacks, loading } = useAppSelector(
//     (state) => state.feedback,
//   );

//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     loop: false,
//     align: "start",
//   });
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   useEffect(() => {
//     dispatch(
//       getTopFeedback(),
//       // getTopFeedback({
//       //   page: 1,
//       //   limit: 10,
//       //   status: "approved",
//       //   sortBy: "rating",
//       //   order: "desc",
//       // }),
//     );
//   }, [dispatch]);

//   const scrollPrev = useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev();
//   }, [emblaApi]);

//   const scrollNext = useCallback(() => {
//     if (emblaApi) {
//       emblaApi.scrollNext();
//     }
//   }, [emblaApi]);

//   const scrollTo = useCallback(
//     (index: number) => {
//       if (emblaApi) {
//         emblaApi.scrollTo(index);
//       }
//     },
//     [emblaApi],
//   );

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setSelectedIndex(emblaApi.selectedScrollSnap());
//     };

//     onSelect();

//     emblaApi.on("select", onSelect);

//     return () => {
//       emblaApi.off("select", onSelect);
//     };
//   }, [emblaApi]);

//   if (loading && (!feedbacks || feedbacks.length === 0)) {
//     return (
//       <div className="flex items-center justify-center gap-2 my-8 text-[#AAA3C2]">
//         <RefreshCw className="size-5 animate-spin text-[#0FD3FA]" />
//         <span>Loading Feedbacks...</span>
//       </div>
//     );
//   }

//   if (!feedbacks || feedbacks.length === 0) {
//     return (
//       <div className="my-20 text-center text-[#AAA3C2]">
//         No feedback available yet.
//       </div>
//     );
//   }

//   return (
//     /* ✅ Updated grid container: centers items and sets clean responsive layout */
//     <div className="flex flex-wrap justify-center gap-8 mt-20">
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
//               w-full
//               max-w-145
//               flex-1
//               min-w-[320px]
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

import { getTopFeedback } from "@/API/apiClientThunks";
import { useAppDispatch, useAppSelector } from "@/Hooks/ReduxHooks";
import {
  Quote,
  RefreshCw,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const TestimonialFooter = () => {
  const dispatch = useAppDispatch();

  const { items: feedbacks, loading } = useAppSelector(
    (state) => state.feedback,
  );

  /* -------------------------------------------------------------------------- */
  /*                                EMBLA SETUP                                */
  /* -------------------------------------------------------------------------- */

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  /* -------------------------------------------------------------------------- */
  /*                              FETCH FEEDBACK                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    dispatch(getTopFeedback());
  }, [dispatch]);

  /* -------------------------------------------------------------------------- */
  /*                              CAROUSEL STATE                                */
  /* -------------------------------------------------------------------------- */

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );

  /* -------------------------------------------------------------------------- */
  /*                              SELECTED SLIDE                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  /* -------------------------------------------------------------------------- */
  /*                                  LOADING                                   */
  /* -------------------------------------------------------------------------- */

  if (loading && (!feedbacks || feedbacks.length === 0)) {
    return (
      <div className="my-20 flex items-center justify-center gap-2 text-[#AAA3C2]">
        <RefreshCw className="size-5 animate-spin text-[#0FD3FA]" />

        <span>Loading Feedbacks...</span>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                              EMPTY FEEDBACK                                */
  /* -------------------------------------------------------------------------- */

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="my-20 text-center text-[#AAA3C2]">
        No feedback available yet.
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                  UI                                        */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="mt-20 w-full">
      {/* -------------------------------------------------------------------- */}
      {/*                              VIEWPORT                                */}
      {/* -------------------------------------------------------------------- */}

      <div ref={emblaRef} className="overflow-x-hidden overflow-y-visible py-10 px-2 -my-4">
        {/* ------------------------------------------------------------------ */}
        {/*                              TRACK                                 */}
        {/* ------------------------------------------------------------------ */}

        <div className="flex">
          {feedbacks.map((item, index) => (
            <div
              key={item._id || index}
              className="
                min-w-0
                shrink-0
                grow-0
                basis-full
                px-3
                md:basis-1/2
              "
            >
              {/* ---------------------------------------------------------- */}
              {/*                            CARD                            */}
              {/* ---------------------------------------------------------- */}

              <div
                className="
                  glass-card
                  group
                  relative
                  h-full
                  overflow-visible
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  md:p-10
                "
              >
                {/* Quote Icon */}

                <Quote
                  size={90}
                  className="
                    absolute
                    right-8
                    top-8
                    text-white/4
                    transition-colors
                    duration-300
                    group-hover:text-white/8
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

                <p
                  className="
                    relative
                    -mt-3
                    mb-8
                    text-[17px]
                    font-medium
                    leading-relaxed
                    text-white/90
                    md:text-[18px]
                  "
                >
                  “{item.comment}”
                </p>

                {/* Divider */}

                <div className="mb-8 h-px w-full bg-white/10" />

                {/* Client */}

                <div className="-mt-2 flex items-center gap-4">
                  {/* Avatar */}

                  <div
                    className="
                      flex
                      size-14
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      bg-linear-to-r
                      from-violet-500
                      via-indigo-400
                      to-cyan-400
                    "
                  >
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

                  {/* Client Info */}

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
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*                         CAROUSEL CONTROLS                             */}
      {/* -------------------------------------------------------------------- */}

      <div className="mt-8 flex items-center justify-center gap-4">
        {/* Previous */}

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous testimonial"
          className="
            flex
            size-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            text-[#AAA3C2]
            transition-all
            duration-200
            hover:border-[#0FD3FA]/40
            hover:bg-[#0FD3FA]/10
            hover:text-white
          "
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}

        <div className="flex items-center gap-2">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  selectedIndex === index
                    ? "w-3 bg-[#0FD3FA]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }
              `}
            />
          ))}
        </div>

        {/* Next */}

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next testimonial"
          className="
            flex
            size-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            text-[#AAA3C2]
            transition-all
            duration-200
            hover:border-[#0FD3FA]/40
            hover:bg-[#0FD3FA]/10
            hover:text-white
          "
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialFooter;
