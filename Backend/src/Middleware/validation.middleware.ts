import { RequestHandler } from "express";
import { ZodType } from "zod";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const validate = (schema: ZodType): RequestHandler =>
  asyncHandler(async (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0]?.message || "Validation failed",
        errors: result.error.flatten(),
      });
    }

    req.validatedData = result.data;

    next();
  });