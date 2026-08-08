import { z } from "zod";
import { Status_Type, type StatusType } from "../Models/Testimonial.model.js";
import { Project_Type, type ProjectType } from "../Models/Contact.model.js";
import { Role_Type, type RoleType } from "../Models/Testimonial.model.js";
import mongoose from "mongoose";

const PROJECT_TYPES = Object.values(Project_Type) as [
  ProjectType,
  ...ProjectType[],
];

const STATUS_TYPES = Object.values(Status_Type) as [
  StatusType,
  ...StatusType[],
];

const ROLE_TYPES = Object.values(Role_Type) as [RoleType, ...RoleType[]];

export const contactSchemaValidator = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full Name is required")
    .min(3, "Full Name must be at least 3 characters long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email format"),
  projectType: z.enum(PROJECT_TYPES).default(Project_Type.WEB),
  status: z.enum(STATUS_TYPES).optional().default(Status_Type.PENDING),
  budgetRange: z.coerce
    .number()
    .positive("Budget must be a positive number")
    .min(3500, "Budget must be at least 3500"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(5, "Message isn't too descriptive")
    .max(500, "Message too long"),
});

export const feedbackSchemaValidator = z.object({
  contactId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Contact ID",
  })
  .optional(),
  fullName: z
    .string()
    .trim()
    .min(1, "Full Name is required")
    .min(3, "Full Name must be at least 3 characters long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email format"),
  role: z.enum(ROLE_TYPES).default(Role_Type.CLIENT),
  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  status: z.enum(STATUS_TYPES).optional().default(Status_Type.PENDING),
  comment: z
    .string()
    .trim()
    .min(1, "Comment is required")
    .min(10, "Comment isn't too descriptive")
    .max(500, "Comment too long"),
});

export const updateFeedbackSchemaValidator = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Full Name is required")
      .min(3, "Full Name must be at least 3 characters long")
      .optional(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email("Invalid email format")
      .optional(),
    role: z.enum(ROLE_TYPES).default(Role_Type.CLIENT).optional(),
    rating: z.coerce
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5")
      .optional(),
    comment: z
      .string()
      .trim()
      .min(1, "Comment is required")
      .min(10, "Comment isn't too descriptive")
      .max(500, "Comment too long")
      .optional(),
  })
  .refine(
    (data) =>
      data.fullName !== undefined ||
      data.email !== undefined ||
      data.role !== undefined ||
      data.rating !== undefined ||
      data.comment !== undefined,
    {
      message:
        "At least one field (fullName, email, role, rating, comment) must be provided for update",
    },
  );

export const adminLoginSchemaValidator = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(12, "Password must be at most 12 characters long"),
});
