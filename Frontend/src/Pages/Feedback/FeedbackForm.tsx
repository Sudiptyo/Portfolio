import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FeedbackValidationRules } from "@/Utils/FeedbackValidation";
import { Link } from "react-router-dom";
import { LuSend } from "react-icons/lu";
import { Star } from "lucide-react";
import { FiCamera } from "react-icons/fi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import {
  submitFeedback,
  updateFeedback,
  checkEmailStatus,
} from "@/API/apiClientThunks";

const StatusType = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

type FeedbackStatus = (typeof StatusType)[keyof typeof StatusType];

type FeedbackFormData = {
  image?: FileList;
  fullName: string;
  email: string;
  role: string;
  rating: number;
  comment: string;
  contactId?: string;
  status?: FeedbackStatus;
};

const ratingLabels = {
  1: "Poor - 1/5",
  2: "Fair - 2/5",
  3: "Good - 3/5",
  4: "Very Good - 4/5",
  5: "Excellent - 5/5",
};

const FeedbackForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormData>();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [preview, setPreview] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNoAdminModal, setShowNoAdminModal] = useState(false);
  const [showExistingFeedbackModal, setShowExistingFeedbackModal] =
    useState(false);
  const [pendingFeedbackData, setPendingFeedbackData] = useState<any>(null);

  const emailValue = watch("email");

  // Debounce email check
  useEffect(() => {
    // Don't trigger status modal if user is actively editing an existing record
    if (editingId || !emailValue || !/^\S+@\S+\.\S+$/.test(emailValue)) return;

    const timer = setTimeout(async () => {
      try {
        const res = await dispatch(checkEmailStatus(emailValue)).unwrap();
        const payload = res?.data || res;
        const { hasWorkedWithAdmin, contactId, existingFeedback } = payload;

        if (contactId) {
          setValue("contactId", contactId);
        }

        if (existingFeedback) {
          setPendingFeedbackData(existingFeedback);
          setShowExistingFeedbackModal(true);
        } else if (!hasWorkedWithAdmin) {
          setShowNoAdminModal(true);
        }
      } catch (err) {
        console.error("Failed email status check:", err);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [emailValue, dispatch, setValue, editingId]);

  const handlePopulateOldFeedback = () => {
    if (pendingFeedbackData) {
      setEditingId(pendingFeedbackData.id);
      setValue("fullName", pendingFeedbackData.fullName);
      setValue("role", pendingFeedbackData.role);
      setValue("rating", pendingFeedbackData.rating, { shouldValidate: true });
      setValue("comment", pendingFeedbackData.comment);
      setSelectedStar(pendingFeedbackData.rating);
    }
    setShowExistingFeedbackModal(false);
  };

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      if (editingId) {
        await dispatch(
          updateFeedback({
            id: editingId,
            fullName: data.fullName,
            email: data.email,
            role: data.role,
            rating: data.rating,
            comment: data.comment,
          }),
        ).unwrap();
      } else {
        const formData = new FormData();

        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("role", data.role);
        formData.append("rating", String(data.rating));
        formData.append("comment", data.comment);

        if (data.contactId) {
          formData.append("contactId", data.contactId);
        }

        if (data.status) {
          formData.append("status", data.status);
        }

        // Optional profile image
        if (imageFile) {
          formData.append("profileImage", imageFile);
        }

        await dispatch(submitFeedback(formData)).unwrap();
      }

      setEditingId(null);
      setSelectedStar(0);
      setHoveredStar(0);
      setImageFile(null);
      setPreview("");
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-12">
      <motion.div className="glass-card h-fit p-8 md:p-10 transition-all duration-200">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Image Upload */}
          <div className="flex justify-center mb-2">
            <label
              htmlFor="image"
              className="group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-white/30 bg-white/5 transition-all"
            >
              {preview ? (
                <>
                  <div className="h-full w-full overflow-hidden rounded-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 rounded-full border border-white/20 p-1.5 text-[#AAA3C2] shadow-md backdrop-blur-md">
                    <FiCamera size={14} />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-white/60">
                  <FiCamera size={24} />
                  <span className="text-xs font-medium">Upload</span>
                </div>
              )}

              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  },
                })}
              />
            </label>
          </div>

          {/* Row 1 - Full Name & Email */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-sm font-semibold">
                Full Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Your name"
                {...register("fullName", FeedbackValidationRules.fullName)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
              />
              {errors.fullName && (
                <p className="text-sm text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email <span className="text-cyan-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", FeedbackValidationRules.email)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-sm font-semibold">
              Role / Title <span className="text-cyan-400">*</span>
            </label>
            <select
              id="role"
              defaultValue=""
              {...register("role", FeedbackValidationRules.role)}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30 text-white"
            >
              <option value="" disabled className="bg-[#090616] text-gray-400">
                Select your role
              </option>
              {[
                "Client",
                "Startup Founder",
                "Recruiter",
                "Developer",
                "Designer",
                "Marketer",
                "Freelancer",
                "Other",
              ].map((roleOption) => (
                <option
                  key={roleOption}
                  value={roleOption}
                  className="bg-[#090616] text-white"
                >
                  {roleOption}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-sm text-red-400">{errors.role.message}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setSelectedStar(star);
                    setValue("rating", star, { shouldValidate: true });
                  }}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                >
                  <Star
                    size={32}
                    className={`transition-all duration-200 ${
                      star <= (hoveredStar || selectedStar)
                        ? "fill-[#0FD3FA] text-[#0FD3FA] scale-110"
                        : "text-white/25"
                    }`}
                  />
                </button>
              ))}
            </div>
            {selectedStar > 0 && (
              <p className="text-xs font-medium text-[#AAA3C2]">
                {ratingLabels[selectedStar as keyof typeof ratingLabels]}
              </p>
            )}
            <input
              type="hidden"
              value={selectedStar || ""}
              {...register("rating", FeedbackValidationRules.rating)}
            />
            {errors.rating && (
              <p className="text-sm text-red-400">{errors.rating.message}</p>
            )}
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-2">
            <label htmlFor="comment" className="text-sm font-semibold">
              Comment <span className="text-cyan-400">*</span>
            </label>
            <textarea
              id="comment"
              rows={6}
              placeholder="Share your experience working with me..."
              {...register("comment", FeedbackValidationRules.comment)}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-[hsl(263,83%,63%)]/50 focus:ring-1 focus:ring-[hsl(263,83%,63%)]/30"
            />
            {errors.comment && (
              <p className="text-sm text-red-400">{errors.comment.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-glow mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-200 active:scale-[0.98]"
          >
            <LuSend size={20} />
            {editingId ? "Update Feedback" : "Send Feedback"}
          </button>
        </form>
      </motion.div>

      {/* MODAL 1: Not worked with admin */}
      <AnimatePresence>
        {showNoAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-md p-6 text-center border border-white/10 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                Haven't Worked With Admin?
              </h3>
              <p className="text-sm text-[#AAA3C2] mb-6">
                You haven't worked with admin yet. Would you still like to give
                feedback, or reach out to work with him first?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowNoAdminModal(false)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  Still Give Feedback
                </button>
                <Link
                  to="/contact"
                  onClick={() => setShowNoAdminModal(false)}
                  className="rounded-full bg-linear-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all"
                >
                  Work with Admin
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Existing feedback prompt */}
      <AnimatePresence>
        {showExistingFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-md p-6 text-center border border-white/10 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                Existing Feedback Found
              </h3>
              <p className="text-sm text-[#AAA3C2] mb-6">
                You have already submitted feedback with this email. Would you
                like to edit your previous feedback or submit a new one?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handlePopulateOldFeedback}
                  className="rounded-full bg-linear-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all"
                >
                  Edit Old Feedback
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setShowExistingFeedbackModal(false);
                  }}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  Submit New
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackForm;
