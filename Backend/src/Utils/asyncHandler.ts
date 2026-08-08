import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncFunction = (
  // Because TS doesn't know what req, res, next
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

const asyncHandler =
  // fn must be an async express handler
  (fn: AsyncFunction): RequestHandler =>
    // Now TS knows this returns an Express middleware.
    (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };

export { asyncHandler };
