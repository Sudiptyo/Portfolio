import { model, Schema } from "mongoose";
import { Status_Type } from "./Testimonial.model.js";
import { StatusType } from "./Testimonial.model.js";

export const Project_Type = {
  WEB: "Web Development",
  FULLSTACK: "Full Stack Development",
  FRONTEND: "Frontend Development",
  BACKEND: "Backend Development",
  APP: "App Development",
  UIUX: "UI/UX Design",
  COLLABORATION: "Collaboration",
  OTHER: "Other",
} as const;

export type ProjectType = (typeof Project_Type)[keyof typeof Project_Type];

export interface IContact {
  fullName: string;
  email: string;
  projectType: ProjectType;
  budgetRange?: number;
  status: StatusType;
  statusMessage?: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      index: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      required: true,
    },
    projectType: {
      type: String,
      enum: Object.values(Project_Type),
      default: Project_Type.WEB,
    },
    budgetRange: {
      type: Number,
      min: 3500,
    }, 
    status: {
      type: String,
      enum: Object.values(Status_Type),
      default: Status_Type.PENDING,
    },
    statusMessage: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true },
);

ContactSchema.index({ createdAt: 1 });
ContactSchema.set("toJSON", {
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Contact = model<IContact>("Contact", ContactSchema);
