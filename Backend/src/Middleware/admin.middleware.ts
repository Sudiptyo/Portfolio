import { asyncHandler } from "../Utils/asyncHandler.js";
import { Admin } from "../Models/Admin.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AdminJwtPayload extends JwtPayload {
  _id: string;
}

const verifyAdmin = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.adminToken as string | undefined;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is missing");
    }

    const decodedToken = jwt.verify(token, secret) as AdminJwtPayload;
    const admin = await Admin.findById(decodedToken._id).select("-password");

    if (!admin) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.admin = admin;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

export { verifyAdmin };
