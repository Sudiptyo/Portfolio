import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

interface Language {
  id: number | string;
  name: string;
}

interface LanguageCarouselProps {
  languages: Language[];
  visibleCount?: number;
  interval?: number;
}

const LanguageCarousel = ({
  languages,
  visibleCount = 5,
  interval = 0,
}: LanguageCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || languages.length <= visibleCount) return;

    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % languages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [paused, interval, languages.length, visibleCount]);

  const visibleLanguages = useMemo(() => {
    return Array.from({ length: Math.min(visibleCount, languages.length) }).map(
      (_, index) => languages[(startIndex + index) % languages.length],
    );
  }, [languages, startIndex, visibleCount]);

  return (
    <div
      className="flex justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <LayoutGroup>
        <div className="flex gap-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleLanguages.map((language) => (
              <motion.div
                key={language.id}
                layout
                initial={{
                  opacity: 0,
                  x: 24,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -24,
                  scale: 0.95,
                }}
                transition={{
                  layout: {
                    duration: 0.45,
                  },
                  opacity: {
                    duration: 0.3,
                  },
                  x: {
                    duration: 0.45,
                  },
                  scale: {
                    duration: 0.3,
                  },
                }}
                className="whitespace-nowrap rounded-full border border-[hsl(263_83%_63%)]/20 bg-[hsl(263_83%_63%)]/10 px-3 py-1 text-xs font-semibold text-[hsl(263_83%_63%)]"
              >
                {language.name}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
};

export default LanguageCarousel;
