export const FeedbackValidationRules = {
  fullName: {
    required: "Full name is required",
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
  },

  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email",
    },
  },

  rating: {
    required: "Please rate your experience",
    valueAsNumber: true,
  },

  comment: {
    required: "Comment is required",
    minLength: {
      value: 20,
      message: "Comment must be at least 10 characters",
    },
  },
} as const;
