import { motion } from "framer-motion";
import { aboutSectionData } from "../../Utils/AboutSection";

const About = () => {
  return (
    <>
      <section
        id="about"
        className="relative min-h-screen flex items-center mt-30"
      >
        {/* Container */}
        <div className="flex w-full flex-col gap-8 lg:gap-15">
          {/* <div className="flex w-full flex-col gap-15"> */}
          {/* Upper */}
          <div>
            <div>
              <p className="text-sm text-[#0FD3FA] font-bold">WHO I AM</p>
              <div className="relative flex flex-col gap-2 lg:gap-5 w-fit">
                {/* Heading */}
                <div className="flex items-center space-x-2 font-bold">
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl">About</h1>

                  <span className="text-5xl bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Me
                  </span>
                </div>

                {/* Underline */}
                <span className="absolute bottom-0 left-0 h-1 w-24 rounded-full bg-linear-to-r from-violet-500 via-indigo-400/50 to-transparent"></span>
              </div>
            </div>
          </div>

          {/* Lower */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Lower - Left */}
            <div className="flex w-full flex-col gap-4 text-base leading-7 sm:text-lg sm:leading-8">
              <p className="text-[#AAA3C2]">
                I'm a{" "}
                <span className="font-bold text-white">
                  Full Stack Developer
                </span>{" "}
                with a strong foundation in UI/UX design, focused on building
                complete digital products — not just interfaces.
              </p>

              <p className="text-[#AAA3C2]">
                I work across the entire stack — from designing intuitive user
                experiences to developing scalable backend systems and APIs. My
                goal is to create applications that are not only visually
                appealing but also efficient, secure, and production-ready.
              </p>

              <p className="text-[#AAA3C2]">
                I have a strong interest in{" "}
                <span className="font-bold text-white">
                  Data Structures & Algorithms
                </span>
                , with 200+ problems solved across competitive platforms. I
                enjoy breaking down complex problems and writing optimized,
                clean solutions.
              </p>

              <p className="text-cyan-400 font-medium text-base">
                Currently expanding my expertise in cybersecurity and system
                design to build more robust and secure applications. Actively
                seeking internship opportunities in Full Stack or Backend
                development.
              </p>
            </div>

            {/* Lower - Right */}
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"> */}
                {/* Card 1 */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass-card h-31.25 px-4 py-5 sm:px-8 sm:py-6 lg:px-9 lg:py-7 flex flex-col justify-center"
                  // className="glass-card h-31.25 px-9 py-7 flex flex-col justify-center"
                >
                  <h2 className="text-[38px] leading-none font-bold text-[#8E52EF]">
                    2+
                  </h2>
                  <p className="mt-3 text-[15px] leading-none font-semibold text-[#AAA3C2]">
                    Years Experience
                  </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass-card h-29.5 px-4 py-5 sm:px-8 sm:py-6 flex flex-col justify-center"
                  // className="glass-card h-29.5 px-8 py-6 flex flex-col justify-center"
                >
                  <h2 className="text-[38px] leading-none font-bold text-[#0FD3FA]">
                    10+
                  </h2>
                  <p className="mt-3 text-[15px] leading-none font-semibold text-[#AAA3C2]">
                    Projects Built
                  </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass-card h-29.5 px-4 py-5 sm:px-8 sm:py-6 flex flex-col justify-center"
                  // className="glass-card h-29.5 px-8 py-6 flex flex-col justify-center"
                >
                  <h2 className="text-[38px] leading-none font-bold text-[#A78BFA]">
                    200+
                  </h2>
                  <p className="mt-3 text-[15px] leading-none font-semibold text-[#AAA3C2]">
                    DSA Problems Solved
                  </p>
                </motion.div>

                {/* Card 4 */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass-card h-29.5 px-4 py-5 sm:px-8 sm:py-6 flex flex-col justify-center"
                  // className="glass-card h-29.5 px-8 py-6 flex flex-col justify-center"
                >
                  <h2 className="text-[38px] leading-none font-bold text-[#10E6A5]">
                    5+
                  </h2>
                  <p className="mt-3 text-[15px] leading-none font-semibold text-[#AAA3C2]">
                    Tech Stacks
                  </p>
                </motion.div>

                {/* Bottom Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass-card col-span-2 h-auto min-h-75 px-5 py-7 sm:min-h-75 sm:px-8"
                  // className="glass-card col-span-1 sm:col-span-2 h-75 px-8 py-7 flex flex-col"
                >
                  <h3 className="text-lg font-bold text-white">
                    What I Bring
                  </h3>
                  <div className="flex flex-col gap-5 mt-5">
                    {aboutSectionData.map(
                      ({ id, icon: Icon, title, description }) => (
                        <div key={id} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[hsl(263_83%_63%)]/15 border border-[hsl(263_83%_63%)]/20">
                            <Icon size={15} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-white">
                              {title}
                            </p>
                            <p className="text-xs text-[#AAA3C2]">
                              {description}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
