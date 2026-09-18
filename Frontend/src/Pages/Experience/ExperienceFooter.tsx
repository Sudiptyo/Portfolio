import { useRef, useState, useEffect } from "react";
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
  const isInView = useInView(itemRef, { margin: "-40% 0px -40% 0px" });

  // ✅ Fixed: Moved state updating into useEffect to avoid updating during render
  useEffect(() => {
    if (isInView && activeId !== experience.id) {
      setActiveId(experience.id);
    }
  }, [isInView, activeId, experience.id, setActiveId]);

  const isLeft = index % 2 === 1;
  const isActive = activeId === experience.id;

  return (
    <div
      ref={itemRef}
      className="
  grid
  grid-cols-[20px_1fr]
  items-center
  gap-4
  lg:grid-cols-[1fr_auto_1fr]
  lg:gap-12
"
    >
      {/* Left Card */}
      <div className="col-start-2 row-start-1 flex justify-start lg:col-start-1 lg:row-auto lg:justify-end">
        {isLeft && (
          <ExperienceCard
            experience={experience}
            direction="left"
            isActive={isActive}
          />
        )}
      </div>

      {/* Timeline Dot */}
      <div className="relative col-start-1 row-start-1 flex items-center justify-center lg:col-auto lg:row-auto">
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
      <div className="col-start-2 row-start-1 flex justify-start lg:col-start-3 lg:row-auto">
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
    ExperienceSectionData[0]?.id ?? null,
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
  left-2.5
  top-0
  bottom-0
  w-px
  origin-top
  bg-white/10
  lg:left-1/2
  lg:-translate-x-1/2
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
