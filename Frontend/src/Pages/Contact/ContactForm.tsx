import { useState, useEffect } from "react";
import { ContactSectionData } from "@/Utils/ContactSection";
import { ContactValidationRules } from "@/Utils/ContactValidation";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { LuSend, LuShieldCheck, LuLock, LuX } from "react-icons/lu";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { submitContact } from "@/API/apiClientThunks";
import { checkAdminEmail, loginAdmin } from "@/API/apiAdminThunks";
import { useNavigate } from "react-router-dom";
import { uiLogger } from "@/Config/Logger";

const Project_Type = [
  "Web Development",
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "App Development",
  "UI/UX Design",
  "Collaboration",
  "Other",
];

type ContactFormData = {
  fullName: string;
  email: string;
  projectType: string;
  budgetRange: number;
  message: string;
};

const ContactForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>();

  // Modal & Admin State
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  const emailValue = watch("email");

  // Debounced Check for Admin Email
  useEffect(() => {
    if (!emailValue || !/^\S+@\S+\.\S+$/.test(emailValue)) return;

    const timer = setTimeout(async () => {
      try {
        const res = await dispatch(
          checkAdminEmail({ email: emailValue }),
        ).unwrap();

        if (res?.isAdmin) {
          setAdminEmail(emailValue);
          setShowAdminPasswordModal(true);
        }
      } catch (err) {
        uiLogger.warn("Admin email verification failed", {
          error: err,
        });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [emailValue, dispatch]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) return;

    setIsVerifyingPassword(true);
    setAdminAuthError(null);

    try {
      await dispatch(
        loginAdmin({ email: adminEmail, password: adminPassword }),
      ).unwrap();

      setShowAdminPasswordModal(false);
      setAdminPassword("");
      navigate("/admin/dashboard");
    } catch (err: unknown) {
      uiLogger.warn("Admin login failed", {
        error: err,
      });
      setAdminAuthError(
        typeof err === "string" ? err : "Invalid admin password",
      );
    } finally {
      setIsVerifyingPassword(false);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await dispatch(submitContact(data)).unwrap();
      reset();
      navigate("/");
    } catch (err) {
      uiLogger.error("Contact form submission failed", {
        error: err,
      });
      reset();
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-10 mt-15">
      {/* Contact Form */}
      <motion.div
        whileHover={{
          y: -5,
        }}
        className="glass-card h-fit p-7 sm:p-8 lg:p-10 transition-all duration-200"
        // className="glass-card h-fit p-5 sm:p-8 lg:p-10 transition-all duration-200"
      >
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            uiLogger.debug("Contact form validation failed", {
              fields: Object.keys(errors),
            });
          })}
          className="flex flex-col gap-6"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <label htmlFor="fullName" className="font-semibold text-sm">
                  Full Name
                </label>
                <span className="text-cyan-400 text-sm">*</span>
              </div>

              <input
                id="fullName"
                type="text"
                placeholder="Your name"
                {...register("fullName", ContactValidationRules.fullName)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
              />
              {errors.fullName && (
                <p className="text-sm text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <label htmlFor="email" className="font-semibold text-sm">
                  Email
                </label>
                <span className="text-cyan-400 text-sm">*</span>
              </div>

              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", ContactValidationRules.email)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="projectType" className="font-semibold text-sm">
                Project Type
              </label>

              <select
                id="projectType"
                defaultValue=""
                {...register("projectType", ContactValidationRules.projectType)}
                className="w-full appearance-none rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none transition focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
              >
                <option value="" disabled>
                  Select project type
                </option>

                {Project_Type.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="bg-[#090616] text-white"
                  >
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="text-sm text-red-400">
                  {errors.projectType.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="budgetRange" className="font-semibold text-sm">
                Budget Range
              </label>

              <input
                id="budgetRange"
                type="number"
                placeholder="Select budget range"
                min={3500}
                {...register("budgetRange", ContactValidationRules.budgetRange)}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
              />
              {errors.budgetRange && (
                <p className="text-sm text-red-400">
                  {errors.budgetRange.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <label htmlFor="message" className="font-semibold text-sm">
                Message
              </label>
              <span className="text-cyan-400 text-sm">*</span>
            </div>

            <textarea
              id="message"
              rows={6}
              placeholder="Tell me about your project, goals, or any questions you have..."
              {...register("message", ContactValidationRules.message)}
              className="w-full resize-none rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
            />
            {errors.message && (
              <p className="text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              position: "relative",
              zIndex: 99999,
            }}
            className="mt-2 flex items-center justify-center gap-2 text-lg w-full rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 py-6 px-8 cursor-pointer font-semibold text-white shadow-lg shadow-violet-500/30 btn-glow disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:translate-y-0 active:scale-[0.98] active:duration-75"
          >
            <LuSend size={20} />
            Send Message
          </button>
        </form>
      </motion.div>

      {/* Right Side */}
      <div className="grid gap-6 h-fit">
        <motion.div
          whileHover={{
            y: -5,
          }}
className="glass-card p-5 sm:p-8 transition-all duration-200"
          // className="glass-card p-8 transition-all duration-200"
        >
          <h3 className="text-xl font-bold mb-6">
            {ContactSectionData.ContactInfo.text}
          </h3>
          <div className="flex flex-col space-y-5">
            {ContactSectionData.ContactInfo.items.map(
              ({ id, icon: Icon, heading, link }) => (
                <div key={id} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.4)] transition-all rounded-full cursor-pointer flex items-center justify-center bg-[hsl(263,83%,63%)]/15 border border-[hsl(263,83%,63%)]/20">
                    <Icon className="text-[hsl(263,83%,63%)]" size={18} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-[oklab(0.731774_0.0189071_-0.0400685/0.6)] -mb-0.5">
                      {heading}
                    </p>
                    <a
                      href={heading === "Email" ? `mailto:${link}` : link}
                      target={heading === "Email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="text-sm text-[#AAA3C2] group-hover:text-[hsl(263,83%,63%)]"
                    >
                      {link}
                    </a>
                  </div>
                </div>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="glass-card p-8 transition-all duration-200"
        >
          <h3 className="text-base font-bold text-white mb-3">
            {ContactSectionData.ResponseTime.text}
          </h3>

          <p className="text-sm leading-relaxed text-[#AAA3C2]">
            {ContactSectionData.ResponseTime.firstDescription}{" "}
            <span className="font-medium text-[#0FD3FA]">
              {ContactSectionData.ResponseTime.time} hours
            </span>
            . {ContactSectionData.ResponseTime.lastDescription}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="glass-card-static p-8 transition-all duration-200"
        >
          <div className="flex gap-2 items-center mb-3">
            <span
              className={`bg-${ContactSectionData.Availability.iconColor} w-2 h-2 rounded-full animate-pulse`}
            ></span>
            <h3 className="text-base font-bold text-white">
              {ContactSectionData.Availability.text}
            </h3>
          </div>
          <p className="text-[#AAA3C2] text-sm leading-relaxed">
            {ContactSectionData.Availability.description}
          </p>
        </motion.div>
      </div>

      {/* ADMIN PASSWORD VERIFICATION MODAL */}
      <AnimatePresence>
        {showAdminPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card relative max-w-md w-full p-8 border border-violet-500/30 rounded-3xl shadow-2xl bg-[#090616]"
            >
              <button
                onClick={() => {
                  setShowAdminPasswordModal(false);
                  setAdminPassword("");
                  setAdminAuthError(null);
                }}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
              >
                <LuX size={20} />
              </button>

              <div className="flex flex-col items-center text-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <LuShieldCheck size={26} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Admin Credentials Detected
                </h3>
                <p className="text-xs text-[#AAA3C2]">
                  Enter your password to access the Admin Panel.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-300">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={adminEmail}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-400 outline-none cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-300">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 pl-10 text-sm text-white outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
                    />
                    <LuLock
                      className="absolute left-3.5 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>

                {adminAuthError && (
                  <p className="text-xs text-red-400 text-center">
                    {adminAuthError}
                  </p>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminPasswordModal(false);
                      setAdminPassword("");
                      setAdminAuthError(null);
                    }}
                    className="flex-1 rounded-full bg-white/5 border border-white/10 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifyingPassword}
                    className="flex-1 rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 btn-glow disabled:opacity-60 transition-all"
                  >
                    {isVerifyingPassword ? "Verifying..." : "Access Admin"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactForm;
