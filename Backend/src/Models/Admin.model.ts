import { model, Schema, HydratedDocument, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

export interface IAdmin {
  fullName: string;
  email: string;
  password: string;
  lastLogin?: Date;
}

interface IAdminMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
}

type AdminDocument = HydratedDocument<IAdmin, IAdminMethods>;
type AdminModel = Model<IAdmin, {}, IAdminMethods>;

const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true },
);

adminSchema.pre("save", async function (this: AdminDocument) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.isPasswordCorrect = function (
  this: AdminDocument,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function (
  this: AdminDocument,
): string {
  const secret = process.env.JWT_SECRET;
  const expiry = process.env.JWT_EXPIRY as StringValue;

  if (!secret) {
    throw new Error("JWT_SECRET missing");
  }

  if (!expiry) {
    throw new Error("JWT_EXPIRY missing");
  }

  return jwt.sign(
    {
      _id: this._id,
    },
    secret,
    {
      expiresIn: expiry,
    },
  );
};

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
