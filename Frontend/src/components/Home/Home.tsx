import {
  motion,
  type Variants,
  useTime,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import { MapPin, Rocket } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaPenNib } from "react-icons/fa";
import { HomeSectionData } from "@/Utils/HomeSection";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: "easeOut",
    },
  }),
};

type OrbitDotProps = {
  radius: number;
  duration: number;
  size: number;
  color: string;
  shadow: string;
  clockwise?: boolean;
};

const OrbitDot = ({
  radius,
  duration,
  size,
  color,
  shadow,
  clockwise = true,
}: OrbitDotProps) => {
  const angle = useMotionValue(0);

  useAnimationFrame((time) => {
    const progress = (time % (duration * 1000)) / (duration * 1000);

    angle.set((clockwise ? 1 : -1) * progress * Math.PI * 2);
  });

  const x = useTransform(angle, (a) => radius * Math.cos(a));
  const y = useTransform(angle, (a) => radius * Math.sin(a));

  return (
    <motion.div
      style={{
        x,
        y,
      }}
      className="absolute left-1/2 top-1/2"
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: color,
          boxShadow: shadow,
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  );
};

const TitleIcon = HomeSectionData.header.title2.icon;
const PlaceIcon = HomeSectionData.place.icon;
const AvailabilityIcon = HomeSectionData.availability.icon;

const Home = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center mt-1">
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full ">
        {/* ================= LEFT ================= */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex flex-col items-start"
        >
          {/* Badges */}

          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="flex items-center gap-4 mb-4 whitespace-nowrap"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-400 text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 animate-ping opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>
              <p className="text-sm"> {HomeSectionData.header.title}</p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-violet-400 text-sm font-medium">
              <TitleIcon size={15} />
              <p className="font-bold text-sm">
                {HomeSectionData.header.title2.title}
              </p>
            </div>
          </motion.div>

          {/* Heading */}

          <motion.h1
            variants={fadeUp}
            custom={0.2}
            className="mt-1 text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight"
          >
            {HomeSectionData.title}
            <br />
            <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {HomeSectionData.name}
            </span>
          </motion.h1>

          {/* Subtitle */}

          <motion.h2
            variants={fadeUp}
            custom={0.3}
            className="mt-5 text-[24px] font-semibold text-[#AAA3C2] max-w-xl leading-[1.3]"
          >
            {`${HomeSectionData.qualification.title1} | ${HomeSectionData.qualification.title2}`}
            <br />
          </motion.h2>

          {/* Description */}

          <motion.p
            variants={fadeUp}
            custom={0.4}
            className="mt-5 text-[16px] leading-relaxed text-[#AAA3C2] max-w-xl"
          >
            {HomeSectionData.descriptionDev}
          </motion.p>

          {/* Highlight */}

          <motion.p
            variants={fadeUp}
            custom={0.5}
            className="mt-5 text-[oklab(0.800338_-0.112242_-0.0872615/_0.8)] font-semibold text-[16px] max-w-xl"
          >
            {HomeSectionData.descriptionDsa}
          </motion.p>

          {/* Location */}

          <motion.div
            variants={fadeUp}
            custom={0.6}
            className="mt-5 flex flex-wrap items-center gap-4 text-zinc-400"
          >
            <div className="flex items-center gap-1">
              <PlaceIcon size={16} />
              <p className="text-[14px]">
                Based in {HomeSectionData.place.place}
              </p>
            </div>

            <span className="hidden md:block">•</span>

            <div className="flex items-center gap-2">
              <AvailabilityIcon size={16} />
              <p className="text-[14px]">
                Open to {HomeSectionData.availability.availability}
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={0.7}
            className="mt-4 ml-1 flex flex-wrap items-center gap-5"
          >
            {/* View Work */}

            <ScrollLink
              // to="portfolio"
              to={HomeSectionData.work.link}
              smooth={true}
              duration={700}
              spy={true}
              offset={-90}
              className="group cursor-pointer"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-1 -z-10 rounded-full bg-linear-to-r from-violet-600/40 to-cyan-500/40 blur-xl" />

                {/* Button */}
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
    relative overflow-hidden rounded-full
    bg-linear-to-r from-violet-600 to-cyan-500
    px-8 py-4 text-white font-semibold
    shadow-[0_0_18px_rgba(139,92,246,0.4),0_0_36px_rgba(34,211,238,0.2)]
    transition-all
    hover:shadow-[0_0_25px_rgba(139,92,246,0.55),0_0_55px_rgba(34,211,238,0.3)]
  "
                >
                  <span className="relative z-10">
                    {HomeSectionData.work.work}
                  </span>

                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
                </motion.div>
              </div>
            </ScrollLink>

            {/* Contact */}

            <NavLink to={HomeSectionData.contact.link}>
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="rounded-full border border-[hsl(263_83%_63%)]/50 backdrop-blur-md px-8 py-4 font-semibold text-zinc-100 transition-all hover:bg-[hsl(263_83%_63%)]/10"
              >
                {HomeSectionData.contact.contact}
              </motion.div>
            </NavLink>
          </motion.div>

          {/* Social Icons */}

          {/* Social Icons */}

          <motion.div
            variants={fadeUp}
            custom={0.8}
            className="mt-4 flex items-center gap-2"
          >
            {HomeSectionData.links.map(({ id, icon: Icon, link }) => {

              return (
                <motion.a
                  key={id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-[#AAA3C2] transition-all hover:border-violet-500 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.45)]"
                >
                  <Icon size={25} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ================= RIGHT ================= */}

        <div className="relative flex justify-center items-center w-full h-full">
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
              delay: 0.25,
            }}
            className="relative flex items-center justify-center w-125 h-125 mx-auto"
          >
            {/* Background Glow */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-95 h-95
rounded-full
bg-cyan-500/15
blur-[90px]"
            />

            {/* Outer Ring */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-90 h-90 rounded-full border border-cyan-400/20 border-dashed"
            />

            {/* Inner Ring */}
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-70 h-70 rounded-full border border-violet-400/20 border-dashed"
            />

            {/* Middle Glow */}
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-52 h-52 rounded-full bg-linear-to-br from-violet-500/30 to-cyan-500/30 blur-3xl"
            />

            {/* Core Sphere */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-20 w-44 h-44 rounded-full
                       bg-zinc-900/70
                       backdrop-blur-xl
                       border border-white/10
                       shadow-[0_0_80px_rgba(56,189,248,0.25)]
                       flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 rounded-full
                         bg-linear-to-r
                         from-cyan-400
                         to-violet-500
                         blur-xl"
              />
            </motion.div>

            {/* ================= OUTER ORBIT ================= */}

            {/* <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[360px] h-[360px]"
          >
            <div
              className="absolute
                         left-1/2
                         -translate-x-1/2
                         -top-2
                         w-5
                         h-5
                         rounded-full
                         bg-violet-500
                         shadow-[0_0_25px_rgba(168,85,247,.95)]"
            />
          </motion.div> */}

            {/* ================= INNER ORBIT ================= */}

            {/* <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[280px] h-[280px]"
          >
            <div
              className="absolute
                         left-1/2
                         -translate-x-1/2
                         -top-2
                         w-4
                         h-4
                         rounded-full
                         bg-cyan-400
                         shadow-[0_0_22px_rgba(34,211,238,.95)]"
            />
          </motion.div> */}

            {/* Purple Orb */}
            <OrbitDot
              radius={160}
              duration={12}
              size={18}
              clockwise={false}
              color="#a855f7"
              shadow="0 0 25px rgba(168,85,247,.9)"
            />

            {/* Blue Orb */}
            <OrbitDot
              radius={125}
              duration={8}
              size={14}
              clockwise
              color="#22d3ee"
              shadow="0 0 20px rgba(34,211,238,.9)"
            />

            {/* Floating Particles */}

            {[...Array(10)].map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0, 1, 0],
                  y: [0, -25],
                }}
                transition={{
                  duration: 2 + i * 0.25,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute rounded-full bg-cyan-400/80"
                style={{
                  width: `${4 + (i % 3)}px`,
                  height: `${4 + (i % 3)}px`,
                  left: `${20 + i * 7}%`,
                  top: `${35 + (i % 4) * 12}%`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;

// import {
//   motion,
//   type Variants,
//   useTime,
//   useTransform,
//   useMotionValue,
//   useAnimationFrame,
// } from "framer-motion";
// import { Link as ScrollLink } from "react-scroll";
// import { NavLink } from "react-router-dom";
// import { MapPin, Rocket } from "lucide-react";
// import { FaGithub, FaLinkedinIn, FaPenNib } from "react-icons/fa";

// const fadeUp: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 40,
//   },
//   visible: (delay: number = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       delay,
//       ease: "easeOut",
//     },
//   }),
// };

// type OrbitDotProps = {
//   radius: number;
//   duration: number;
//   size: number;
//   color: string;
//   shadow: string;
//   clockwise?: boolean;
// };

// const OrbitDot = ({
//   radius,
//   duration,
//   size,
//   color,
//   shadow,
//   clockwise = true,
// }: OrbitDotProps) => {
//   const angle = useMotionValue(0);

//   useAnimationFrame((time) => {
//     const progress = (time % (duration * 1000)) / (duration * 1000);

//     angle.set((clockwise ? 1 : -1) * progress * Math.PI * 2);
//   });

//   const x = useTransform(angle, (a) => radius * Math.cos(a));
//   const y = useTransform(angle, (a) => radius * Math.sin(a));

//   return (
//     <motion.div
//       style={{
//         x,
//         y,
//       }}
//       className="absolute left-1/2 top-1/2"
//     >
//       <div
//         className="rounded-full"
//         style={{
//           width: size,
//           height: size,
//           background: color,
//           boxShadow: shadow,
//           transform: "translate(-50%, -50%)",
//         }}
//       />
//     </motion.div>
//   );
// };

// const Home = () => {
//   return (
//     <section id="home" className="relative min-h-screen flex items-center mt-1">
//       <div className="grid lg:grid-cols-2 gap-16 items-center w-full ">
//         {/* ================= LEFT ================= */}

//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={0}
//           className="flex flex-col items-start"
//         >
//           {/* Badges */}

//           <motion.div
//             variants={fadeUp}
//             custom={0.1}
//             className="flex items-center gap-4 mb-4 whitespace-nowrap"
//           >
//             <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-400 text-sm font-medium">
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 animate-ping opacity-75" />
//                 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
//               </span>
//               <p className="text-sm"> Available for Opportunities</p>
//             </div>

//             <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-violet-400 text-sm font-medium">
//               <Rocket size={15} />
//               <p className="font-bold text-sm">
//                 Seeking Internships (Full Stack / Backend)
//               </p>
//             </div>
//           </motion.div>

//           {/* Heading */}

//           <motion.h1
//             variants={fadeUp}
//             custom={0.2}
//             className="mt-1 text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight"
//           >
//             Hey, I'm
//             <br />
//             <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
//               Sudiptyo
//             </span>
//           </motion.h1>

//           {/* Subtitle */}

//           <motion.h2
//             variants={fadeUp}
//             custom={0.3}
//             className="mt-5 text-[24px] font-semibold text-[#AAA3C2] max-w-xl leading-[1.3]"
//           >
//             Full Stack Developer | Strong in DSA & Problem
//             <br />
//             Solving
//           </motion.h2>

//           {/* Description */}

//           <motion.p
//             variants={fadeUp}
//             custom={0.4}
//             className="mt-5 text-[16px] leading-7 text-[#AAA3C2] max-w-xl"
//           >
//             I build fast, scalable and user-focused web applications from
//             frontend to backend. Combining clean design with strong engineering
//             to create real-world solutions that perform.
//           </motion.p>

//           {/* Highlight */}

//           <motion.p
//             variants={fadeUp}
//             custom={0.5}
//             className="mt-5 text-[oklab(0.800338_-0.112242_-0.0872615/_0.8)] font-semibold text-[16px] max-w-xl"
//           >
//             I design scalable systems and solve complex problems using Data
//             Structures & Algorithms.
//           </motion.p>

//           {/* Location */}

//           <motion.div
//             variants={fadeUp}
//             custom={0.6}
//             className="mt-5 flex flex-wrap items-center gap-4 text-zinc-400"
//           >
//             <div className="flex items-center gap-1">
//               <MapPin size={16} />
//               <p className="text-[14px]">Based in India</p>
//             </div>

//             <span className="hidden md:block">•</span>

//             <div className="flex items-center gap-2">
//               <FaPenNib size={16} />
//               <p className="text-[14px]">
//                 Open to freelance & full-time opportunities
//               </p>
//             </div>
//           </motion.div>

//           {/* CTA Buttons */}
//           <motion.div
//             variants={fadeUp}
//             custom={0.7}
//             className="mt-4 ml-1 flex flex-wrap items-center gap-5"
//           >
//             {/* View Work */}

//             <ScrollLink
//               to="portfolio"
//               smooth={true}
//               duration={700}
//               spy={true}
//               offset={-90}
//               className="group cursor-pointer"
//             >
//               <div className="relative">
//                 {/* Glow */}
//                 <div className="absolute -inset-1 -z-10 rounded-full bg-linear-to-r from-violet-600/40 to-cyan-500/40 blur-xl" />

//                 {/* Button */}
//                 <motion.div
//                   whileHover={{
//                     scale: 1.04,
//                     y: -2,
//                   }}
//                   whileTap={{
//                     scale: 0.97,
//                   }}
//                   className="
//     relative overflow-hidden rounded-full
//     bg-linear-to-r from-violet-600 to-cyan-500
//     px-8 py-4 text-white font-semibold
//     shadow-[0_0_18px_rgba(139,92,246,0.4),0_0_36px_rgba(34,211,238,0.2)]
//     transition-all
//     hover:shadow-[0_0_25px_rgba(139,92,246,0.55),0_0_55px_rgba(34,211,238,0.3)]
//   "
//                 >
//                   <span className="relative z-10">View My Work</span>

//                   <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
//                 </motion.div>
//               </div>
//             </ScrollLink>

//             {/* Contact */}

//             <NavLink to="/contact">
//               <motion.div
//                 whileHover={{
//                   scale: 1.02,
//                 }}
//                 whileTap={{
//                   scale: 0.98,
//                 }}
//                 className="rounded-full border border-[hsl(263_83%_63%)]/50 backdrop-blur-md px-8 py-4 font-semibold text-zinc-100 transition-all hover:bg-[hsl(263_83%_63%)]/10"
//               >
//                 Contact Me
//               </motion.div>
//             </NavLink>
//           </motion.div>

//           {/* Social Icons */}

//           <motion.div
//             variants={fadeUp}
//             custom={0.8}
//             className="mt-4 flex items-center gap-2"
//           >
//             <motion.a
//               href="https://github.com/Sudiptyo"
//               target="_blank"
//               rel="noopener noreferrer"
//               whileHover={{
//                 scale: 1.02,
//               }}
//               whileTap={{
//                 scale: 0.95,
//               }}
//               className="flex h-12 w-12 items-center justify-center rounded-full text-[#AAA3C2] transition-all hover:border-violet-500 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.45)]"
//             >
//               <FaGithub size={25} />
//             </motion.a>

//             <motion.a
//               href="https://linkedin.com/in/your-linkedin"
//               target="_blank"
//               rel="noopener noreferrer"
//               whileHover={{
//                 scale: 1.02,
//               }}
//               whileTap={{
//                 scale: 0.95,
//               }}
//               className="flex h-12 w-12 items-center justify-center rounded-full text-[#AAA3C2] transition-all hover:border-violet-500 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.45)]"
//             >
//               <FaLinkedinIn size={25} />
//             </motion.a>
//           </motion.div>
//         </motion.div>

//         {/* ================= RIGHT ================= */}

//         <div className="relative flex justify-center items-center w-full h-full">
//           <motion.div
//             initial={{
//               opacity: 0,
//               x: 80,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             transition={{
//               duration: 0.9,
//               ease: "easeOut",
//               delay: 0.25,
//             }}
//             className="relative flex items-center justify-center w-125 h-125 mx-auto"
//           >
//             {/* Background Glow */}
//             <motion.div
//               animate={{
//                 scale: [1, 1.08, 1],
//                 opacity: [0.35, 0.55, 0.35],
//               }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="absolute w-95 h-95
// rounded-full
// bg-cyan-500/15
// blur-[90px]"
//             />

//             {/* Outer Ring */}
//             <motion.div
//               animate={{
//                 rotate: 360,
//               }}
//               transition={{
//                 duration: 40,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               className="absolute w-90 h-90 rounded-full border border-cyan-400/20 border-dashed"
//             />

//             {/* Inner Ring */}
//             <motion.div
//               animate={{
//                 rotate: -360,
//               }}
//               transition={{
//                 duration: 28,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               className="absolute w-70 h-70 rounded-full border border-violet-400/20 border-dashed"
//             />

//             {/* Middle Glow */}
//             <motion.div
//               animate={{
//                 scale: [1, 1.06, 1],
//                 opacity: [0.75, 1, 0.75],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="absolute w-52 h-52 rounded-full bg-linear-to-br from-violet-500/30 to-cyan-500/30 blur-3xl"
//             />

//             {/* Core Sphere */}
//             <motion.div
//               animate={{
//                 scale: [1, 1.04, 1],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="relative z-20 w-44 h-44 rounded-full
//                        bg-zinc-900/70
//                        backdrop-blur-xl
//                        border border-white/10
//                        shadow-[0_0_80px_rgba(56,189,248,0.25)]
//                        flex items-center justify-center"
//             >
//               <motion.div
//                 animate={{
//                   scale: [1, 1.15, 1],
//                   opacity: [0.5, 1, 0.5],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//                 className="w-24 h-24 rounded-full
//                          bg-linear-to-r
//                          from-cyan-400
//                          to-violet-500
//                          blur-xl"
//               />
//             </motion.div>

//             {/* ================= OUTER ORBIT ================= */}

//             {/* <motion.div
//             animate={{
//               rotate: -360,
//             }}
//             transition={{
//               duration: 12,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//             className="absolute w-[360px] h-[360px]"
//           >
//             <div
//               className="absolute
//                          left-1/2
//                          -translate-x-1/2
//                          -top-2
//                          w-5
//                          h-5
//                          rounded-full
//                          bg-violet-500
//                          shadow-[0_0_25px_rgba(168,85,247,.95)]"
//             />
//           </motion.div> */}

//             {/* ================= INNER ORBIT ================= */}

//             {/* <motion.div
//             animate={{
//               rotate: 360,
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//             className="absolute w-[280px] h-[280px]"
//           >
//             <div
//               className="absolute
//                          left-1/2
//                          -translate-x-1/2
//                          -top-2
//                          w-4
//                          h-4
//                          rounded-full
//                          bg-cyan-400
//                          shadow-[0_0_22px_rgba(34,211,238,.95)]"
//             />
//           </motion.div> */}

//             {/* Purple Orb */}
//             <OrbitDot
//               radius={160}
//               duration={12}
//               size={18}
//               clockwise={false}
//               color="#a855f7"
//               shadow="0 0 25px rgba(168,85,247,.9)"
//             />

//             {/* Blue Orb */}
//             <OrbitDot
//               radius={125}
//               duration={8}
//               size={14}
//               clockwise
//               color="#22d3ee"
//               shadow="0 0 20px rgba(34,211,238,.9)"
//             />

//             {/* Floating Particles */}

//             {[...Array(10)].map((_, i) => (
//               <motion.span
//                 key={i}
//                 initial={{
//                   opacity: 0,
//                   scale: 0,
//                 }}
//                 animate={{
//                   opacity: [0, 0.9, 0],
//                   scale: [0, 1, 0],
//                   y: [0, -25],
//                 }}
//                 transition={{
//                   duration: 2 + i * 0.25,
//                   repeat: Infinity,
//                   delay: i * 0.3,
//                 }}
//                 className="absolute rounded-full bg-cyan-400/80"
//                 style={{
//                   width: `${4 + (i % 3)}px`,
//                   height: `${4 + (i % 3)}px`,
//                   left: `${20 + i * 7}%`,
//                   top: `${35 + (i % 4) * 12}%`,
//                 }}
//               />
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;
