import "express";
import type { HydratedDocument } from "mongoose";
import type { IAdmin } from "../Models/Admin.model.ts";

declare global {
  namespace Express {
    interface Request {
      validatedData?: any;
      admin?: HydratedDocument<IAdmin>;
    }
  }
}

export {};
