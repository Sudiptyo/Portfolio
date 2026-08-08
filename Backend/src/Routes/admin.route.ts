import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  checkEmailStatus,
  getAdminDashboardStats,
  toggleFeaturedFeedback,
  updateProjectStatus,
} from "../Controllers/admin.controller.js";
import { verifyAdmin } from "../Middleware/admin.middleware.js";
import { adminLoginLimiter } from "../Utils/rateLimiter.js";
import { validate } from "../Middleware/validation.middleware.js";
import { adminLoginSchemaValidator } from "../Utils/zodValidator.js";

const router = Router();

router.post("/check-email-status", checkEmailStatus);
router.post(
  "/login-admin",
  adminLoginLimiter,
  validate(adminLoginSchemaValidator),
  adminLogin,
);
router.post("/logout-admin", verifyAdmin, adminLogout);
router.patch(
  "/update-project-status/:id/status",
  verifyAdmin,
  updateProjectStatus,
);
router.patch("/feedback/:id/featured", verifyAdmin, toggleFeaturedFeedback);
router.get("/dashboard", verifyAdmin, getAdminDashboardStats);

export default router;
