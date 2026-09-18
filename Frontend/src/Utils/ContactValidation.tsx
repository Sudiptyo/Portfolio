export const ContactValidationRules = {
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

  projectType: {
    required: "Please select a project type",
  },

  budgetRange: {
    required: "Budget is required",
    valueAsNumber: true,
    min: {
      value: 3500,
      message: "Budget must be at least ₹3,500",
    },
  },

  message: {
    required: "Message is required",
    minLength: {
      value: 20,
      message: "Message must be at least 20 characters",
    },
  },
} as const;