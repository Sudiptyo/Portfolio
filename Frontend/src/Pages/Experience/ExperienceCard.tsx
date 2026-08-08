// import { motion } from "framer-motion";

// interface Experience {
//   id: number;
//   year: string;
//   title: string;
//   description: string;
// }

// interface ExperienceCardProps {
//   experience: Experience;
//   direction: "left" | "right";
// }

// const ExperienceCard = ({ experience, direction }: ExperienceCardProps) => {
//   const isPresent = experience.year.toLowerCase().includes("present");

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         x: direction === "left" ? -80 : 80,
//         y: 30,
//       }}
//       whileInView={{
//         opacity: 1,
//         x: 0,
//         y: 0,
//       }}
//       viewport={{ once: true, amount: 0.35 }}
//       transition={{
//         duration: 0.65,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       whileHover={{
//         y: -6,
//         scale: 1.015,
//       }}
//       className="
//         group
//         relative
//         w-full
//         max-w-90
//       "
//     >
//       {/* Glow */}
//       <div
//         className="
//           absolute
//           inset-0
//           rounded-[28px]
//           bg-[hsl(263_83%_63%)]
//           opacity-0
//           blur-3xl
//           transition-opacity
//           duration-500
//           group-hover:opacity-20
//         "
//       />

//       {/* Card */}
//       <div
//         className="
//           relative
//           flex
//           h-fit
//           flex-col
//           justify-start
//           rounded-3xl
//           border
//           border-white/8
//           bg-[#221C36]
//           p-8
//           shadow-[0_0_40px_rgba(124,58,237,.08)]
//           backdrop-blur-xl
//           transition-all
//           duration-300
//           group-hover:border-[hsl(263_83%_63%)]/20
//         "
//       >
//         {/* Date Pill */}
//         <div className={direction === "left" ? "flex justify-end" : ""}>
//           <div
//             className="
//               mb-6
//               inline-flex
//               items-center
//               gap-2
//               rounded-full
//               border
//               border-[hsl(263_83%_63%)]/20
//               bg-[hsl(263_83%_63%)]/10
//               px-4
//               py-1.5
//               text-xs
//               font-semibold
//               text-[hsl(263_83%_63%)]
//             "
//           >
//             {isPresent && (
//               <span className="size-2 rounded-full bg-[#0FD3FA] transition-all duration-300" />
//             )}

//             {experience.year}
//           </div>
//         </div>

//         {/* Title */}
//         <h3
//           className={`
//             text-xl
//             font-bold
//             leading-snug
//             text-white
//             -mb-2
//             ${direction === "left" ? "text-right" : "text-left"}
//           `}
//         >
//           {experience.title}
//         </h3>

//         {/* Description */}
//         <p
//           className={`
//             mt-5
//             text-sm
//             leading-relaxed
//             text-[#AAA3C2]
//             ${direction === "left" ? "text-right" : "text-left"}
//           `}
//         >
//           {experience.description}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default ExperienceCard;

import { motion } from "framer-motion";

interface Experience {
  id: number;
  year: string;
  title: string;
  description: string;
}

interface ExperienceCardProps {
  experience: Experience;
  direction: "left" | "right";
  isActive?: boolean;
}

const ExperienceCard = ({
  experience,
  direction,
  isActive = false,
}: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction === "left" ? -80 : 80,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      className="
        group
        relative
        w-full
        max-w-90
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-[28px]
          bg-[hsl(263_83%_63%)]
          opacity-0
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-20
        "
      />

      {/* Card */}
      <div
        className="
          relative
          flex
          h-fit
          flex-col
          justify-start
          rounded-3xl
          border
          border-white/8
          bg-[#221C36]
          p-8
          shadow-[0_0_40px_rgba(124,58,237,.08)]
          backdrop-blur-xl
          transition-all
          duration-300
          group-hover:border-[hsl(263_83%_63%)]/20
        "
      >
        {/* Date Pill */}
        <div className={direction === "left" ? "flex justify-end" : ""}>
          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[hsl(263_83%_63%)]/20
              bg-[hsl(263_83%_63%)]/10
              px-4
              py-1.5
              text-xs
              font-semibold
              text-[hsl(263_83%_63%)]
            "
          >
            {/* Blue dot visible on active role */}
            {isActive && (
              <span className="size-2 rounded-full bg-[#0FD3FA] transition-all duration-300" />
            )}

            {experience.year}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`
            -mb-2
            text-xl
            font-bold
            leading-snug
            text-white
            ${direction === "left" ? "text-right" : "text-left"}
          `}
        >
          {experience.title}
        </h3>

        {/* Description */}
        <p
          className={`
            mt-5
            text-sm
            leading-relaxed
            text-[#AAA3C2]
            ${direction === "left" ? "text-right" : "text-left"}
          `}
        >
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;