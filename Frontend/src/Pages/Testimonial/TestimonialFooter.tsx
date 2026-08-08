import { testimonialSectionData } from "@/Utils/TestimonialSection";
import { Quote, Star } from "lucide-react";

const TestimonialFooter = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-8 mt-20">
      {testimonialSectionData.map(
        ({ id, stars, description, image, name, designation }) => (
          <div
            key={id}
            className="
              glass-card
              relative
              overflow-hidden
              p-10
              transition-all
              duration-300
              hover:-translate-y-2
              group
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
              {Array.from({ length: stars }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className="fill-[#0FD3FA] text-[#0FD3FA]"
                />
              ))}
            </div>

            {/* Review */}
            <p className="relative -mt-3 mb-8 text-[18px] font-medium leading-relaxed text-white/90">
              “{description}”
            </p>

            {/* Divider */}
            <div className="mb-8 h-px w-full bg-white/10" />

            {/* Client */}
            <div className="flex items-center gap-4 -mt-2">
              {/* Avatar */}
              <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div>
                <h4 className="text-base font-bold text-white">{name}</h4>

                <span className="text-sm font-semibold text-[#0FD3FA]">
                  {designation ?? "Verified Client"}
                </span>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default TestimonialFooter;
