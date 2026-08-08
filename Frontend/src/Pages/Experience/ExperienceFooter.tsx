// import { ExperienceSectionData } from "@/Utils/ExperienceSection";
// import ExperienceCard from "./ExperienceCard";
// import { motion } from "framer-motion";

// const ExperienceFooter = () => {
//   return (
//     <div className="relative mx-auto mt-20 max-w-7xl">
//       {/* Center Line (Unchanged) */}
//       <motion.div
//         initial={{ scaleY: 0 }}
//         whileInView={{ scaleY: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1.2 }}
//         className="
//           absolute
//           left-1/2
//           top-0
//           bottom-0
//           w-px
//           origin-top
//           -translate-x-1/2
//           bg-white/10
//         "
//       />

//       {/* Timeline Items */}
//       <div className="space-y-28">
//         {ExperienceSectionData.experiences.map((experience, index) => {
//           // Inverted: index 0 (1st card) is now false -> renders on the RIGHT side
//           const isLeft = index % 2 === 1;
//           const isPresent = experience.year.toLowerCase().includes("present");

//           return (
//             <div
//               key={experience.id}
//               className="
//                 grid
//                 grid-cols-[1fr_auto_1fr]
//                 items-center
//                 gap-12
//               "
//             >
//               {/* Left Card */}
//               <div className="flex justify-end">
//                 {isLeft && (
//                   <ExperienceCard experience={experience} direction="left" />
//                 )}
//               </div>

//               {/* Timeline Dot */}
//               <div className="relative flex items-center justify-center">
//                 {/* Ping animation ONLY for Present items */}
//                 {isPresent && (
//                   <span className="absolute size-5 animate-ping rounded-full bg-cyan-400 opacity-75" />
//                 )}

//                 <motion.div
//                   initial={{ scale: 0 }}
//                   whileInView={{ scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: 0.2,
//                     type: "spring",
//                     stiffness: 300,
//                   }}
//                   className={`
//                     relative
//                     z-20
//                     size-5
//                     rounded-full
//                     border
//                     transition-all
//                     duration-300
//                     ${
//                       isPresent
//                         ? "border-cyan-300 bg-cyan-400 shadow-[0_0_25px_#22d3ee]"
//                         : "border-white/20 bg-[#221C36] shadow-none"
//                     }
//                   `}
//                 />
//               </div>

//               {/* Right Card */}
//               <div className="flex justify-start">
//                 {!isLeft && (
//                   <ExperienceCard experience={experience} direction="right" />
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ExperienceFooter;

// import { ExperienceSectionData } from "@/Utils/ExperienceSection";
// import ExperienceCard from "./ExperienceCard";
// import { motion } from "framer-motion";

// const ExperienceFooter = () => {
//   return (
//     <div className="relative mx-auto mt-20 max-w-7xl">
//       {/* Center Line */}
//       <motion.div
//         initial={{ scaleY: 0 }}
//         whileInView={{ scaleY: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1.2 }}
//         className="
//           absolute
//           left-1/2
//           top-0
//           bottom-0
//           w-px
//           origin-top
//           -translate-x-1/2
//           bg-white/10
//         "
//       />

//       {/* Timeline Items */}
//       <div className="space-y-28">
//         {ExperienceSectionData.map((experience, index) => {
//           const isLeft = index % 2 === 1;
//           const isPresent = experience.year.toLowerCase().includes("present");

//           return (
//             <div
//               key={experience.id}
//               className="
//                 grid
//                 grid-cols-[1fr_auto_1fr]
//                 items-center
//                 gap-12
//               "
//             >
//               {/* Left Card */}
//               <div className="flex justify-end">
//                 {isLeft && (
//                   <ExperienceCard experience={experience} direction="left" />
//                 )}
//               </div>

//               {/* Timeline Dot */}
//               <div className="relative flex items-center justify-center">
//                 {isPresent && (
//                   <span className="absolute size-5 animate-ping rounded-full bg-[#0FD3FA] opacity-75" />
//                 )}

//                 <motion.div
//                   initial={{ scale: 0 }}
//                   whileInView={{ scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: 0.2,
//                     type: "spring",
//                     stiffness: 300,
//                   }}
//                   className={`
//                     relative
//                     z-20
//                     size-5
//                     rounded-full
//                     border
//                     transition-all
//                     duration-300
//                     ${
//                       isPresent
//                         ? "border-cyan-300 bg-[#0FD3FA] shadow-[0_0_25px_#22d3ee]"
//                         : "border-white/20 bg-[#221C36] shadow-none"
//                     }
//                   `}
//                 />
//               </div>

//               {/* Right Card */}
//               <div className="flex justify-start">
//                 {!isLeft && (
//                   <ExperienceCard experience={experience} direction="right" />
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ExperienceFooter;

import { useRef, useState } from "react";
import { ExperienceSectionData } from "@/Utils/ExperienceSection";
import ExperienceCard from "./ExperienceCard";
import { motion, useInView } from "framer-motion";

const TimelineItem = ({
  experience,
  index,
  activeId,
  setActiveId,
}: {
  experience: any;
  index: number;
  activeId: number | null;
  setActiveId: (id: number) => void;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  // Detects when the node enters a centered focal range in the viewport
  const isInView = useInView(itemRef, { margin: "-40% 0px -40% 0px" });

  if (isInView && activeId !== experience.id) {
    setActiveId(experience.id);
  }

  const isLeft = index % 2 === 1;
  const isActive = activeId === experience.id;

  return (
    <div
      ref={itemRef}
      className="
        grid
        grid-cols-[1fr_auto_1fr]
        items-center
        gap-12
      "
    >
      {/* Left Card */}
      <div className="flex justify-end">
        {isLeft && (
          <ExperienceCard
            experience={experience}
            direction="left"
            isActive={isActive}
          />
        )}
      </div>

      {/* Timeline Dot */}
      <div className="relative flex items-center justify-center">
        {isActive && (
          <span className="absolute size-5 animate-ping rounded-full bg-[#0FD3FA] opacity-75" />
        )}

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 300,
          }}
          className={`
            relative
            z-20
            size-5
            rounded-full
            border
            transition-all
            duration-300
            ${
              isActive
                ? "border-cyan-300 bg-[#0FD3FA] shadow-[0_0_25px_#22d3ee]"
                : "border-white/20 bg-[#221C36] shadow-none"
            }
          `}
        />
      </div>

      {/* Right Card */}
      <div className="flex justify-start">
        {!isLeft && (
          <ExperienceCard
            experience={experience}
            direction="right"
            isActive={isActive}
          />
        )}
      </div>
    </div>
  );
};

const ExperienceFooter = () => {
  const [activeId, setActiveId] = useState<number | null>(
    ExperienceSectionData[0]?.id ?? null
  );

  return (
    <div className="relative mx-auto mt-20 max-w-7xl">
      {/* Static Center Line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="
          absolute
          left-1/2
          top-0
          bottom-0
          w-px
          origin-top
          -translate-x-1/2
          bg-white/10
        "
      />

      {/* Timeline Items */}
      <div className="space-y-28">
        {ExperienceSectionData.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            experience={experience}
            index={index}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceFooter;