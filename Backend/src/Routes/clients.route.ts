import { Router } from "express";
import {
  submitContactMe,
  submitFeedback,
  getFeedback,
  updateFeedbackByEmail,
  deleteFeedbackByEmail,
  checkEmailStatus,
  getTopFeedbackCached,
} from "../Controllers/client.controller.js";
import { validate } from "../Middleware/validation.middleware.js";
import {
  contactSchemaValidator,
  feedbackSchemaValidator,
  updateFeedbackSchemaValidator,
} from "../Utils/zodValidator.js";
import { upload } from "../Middleware/multer.middleware.js";

const router = Router();

router.post("/contact", validate(contactSchemaValidator), submitContactMe);
router.post(
  "/feedback",
  upload.single("profileImage"),
  validate(feedbackSchemaValidator),
  submitFeedback,
);
router.get("/check-email-status", checkEmailStatus);
router.get("/feedback/top", getTopFeedbackCached);
router.get("/feedback", getFeedback);
router.patch(
  "/feedback/:id",
  validate(updateFeedbackSchemaValidator),
  updateFeedbackByEmail,
);
router.delete("/feedback/:id", deleteFeedbackByEmail);

export default router;
