import { model, Schema, Query, Types } from "mongoose";

export const Status_Type = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const; // TypeScript has real enums, no need for Object.freeze

export const Role_Type = {
  CLIENT: "Client",
  STARTUP_FOUNDER: "Startup Founder",
  RECRUITER: "Recruiter",
  DEVELOPER: "Developer",
  DESIGNER: "Designer",
  MARKETER: "Marketer",
  FREELANCER: "Freelancer",
  OTHER: "Other",
} as const;

export type StatusType = (typeof Status_Type)[keyof typeof Status_Type];
export type RoleType = (typeof Role_Type)[keyof typeof Role_Type];

export interface ITestimonial {
  contactId?: Types.ObjectId;
  fullName: string;
  email: string;
  role: RoleType;
  profileImage?: string;
  rating: number;
  featured: boolean;
  status: StatusType;
  isEdited?: boolean;
  isDeleted?: boolean;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialCommentSchema = new Schema<ITestimonial>(
  {
    contactId: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      // required: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    email: {
      // Debounced Check
      type: String,
      index: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role_Type),
      default: Role_Type.CLIENT,
    },
    profileImage: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(Status_Type),
      default: Status_Type.PENDING,
    },
    isEdited: {
      type: Boolean,
      default: false,
      select: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    comment: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
    },
  },
  { timestamps: true },
);

TestimonialCommentSchema.index({ createdAt: 1 });
TestimonialCommentSchema.index({ status: 1 });
TestimonialCommentSchema.index(
  { status: 1, createdAt: -1 },
  { partialFilterExpression: { isDeleted: false } },
);

TestimonialCommentSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

TestimonialCommentSchema.pre(
  /^find/,
  function (this: Query<unknown, ITestimonial>) {
    this.where({ isDeleted: false });
  },
);

TestimonialCommentSchema.pre(
  "findOneAndUpdate",
  function (this: Query<unknown, ITestimonial>) {
    this.setOptions({ runValidators: true });
    this.set({ isEdited: true });
  },
);

export const TestimonialComment = model<ITestimonial>(
  "TestimonialComment",
  TestimonialCommentSchema,
);
