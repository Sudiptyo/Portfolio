import { asyncHandler } from "../Utils/asyncHandler.js";
import { Contact } from "../Models/Contact.model.js";
import {
  Status_Type,
  TestimonialComment,
} from "../Models/Testimonial.model.js";
import { z } from "zod";
import {
  contactSchemaValidator,
  feedbackSchemaValidator,
  updateFeedbackSchemaValidator,
} from "../Utils/zodValidator.js";
import { StatusType, RoleType } from "../Models/Testimonial.model.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { emailProducer } from "../Services/Queue/producer.service.js";
import {
  addFeedbackToCache,
  clearBestFeedback,
  getBestFeedback,
  setBestFeedback,
} from "../Services/Cache/feedback.service.js";
import { logger } from "../Utils/logger.js";

type ContactData = z.infer<typeof contactSchemaValidator>;
type FeedbackData = z.infer<typeof feedbackSchemaValidator>;
type UpdateFeedbackData = z.infer<typeof updateFeedbackSchemaValidator>;

const submitContactMe = asyncHandler(async (req, res) => {
  logger.info(
    {
      fullName: req.body.fullName,
      projectType: req.body.projectType,
    },
    "Contact form submitted",
  );

  const data = req.validatedData as ContactData;

  const contact = await Contact.create({
    fullName: data.fullName,
    email: data.email,
    projectType: data.projectType,
    budgetRange: data.budgetRange,
    status: data.status,
    message: data.message,
  });

  emailProducer
    .addContactConfirmation({
      to: contact.email,
      name: contact.fullName,
      projectType: contact.projectType,
      budget: contact.budgetRange,
    })
    .catch((err) => {
      logger.error(
        { err, email: contact.email },
        "Failed to queue contact confirmation email",
      );
    });

  return res.status(201).json({
    success: true,
    message: "Thanks for reaching out! I'll get back to you soon.",
    data: contact,
  });
});

const checkEmailStatus = asyncHandler(async (req, res) => {
  // const email = (req.query.email as string)?.trim().toLocaleLowerCase();
  const email = (req.query.email as string)?.trim();

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const contact = await Contact.findOne({ email });
  const existingFeedback = await TestimonialComment.findOne({
    email,
    isDeleted: false,
  });

  return res.status(200).json({
    success: true,
    data: {
      hasWorkedWithAdmin: !!contact,
      contactId: contact ? contact._id : null,
      existingFeedback: existingFeedback
        ? {
            id: existingFeedback._id,
            fullName: existingFeedback.fullName,
            role: existingFeedback.role,
            rating: existingFeedback.rating,
            comment: existingFeedback.comment,
          }
        : null,
    },
  });
});

const submitFeedback = asyncHandler(async (req, res) => {
  logger.info(
    {
      fullName: req.body.fullName,
      rating: req.body.rating,
    },
    "Feedback submitted",
  );

  const data = req.validatedData as FeedbackData;

  let contactId = data.contactId;
  if (!contactId) {
    const contactExists = await Contact.findOne({ email: data.email });
    if (contactExists) {
      contactId = contactExists._id.toString();
    }
  }

  let profileImage: string | undefined;
  if (req.file) {
    const uploadImage = await uploadOnCloudinary(req.file.path);
    if (uploadImage) {
      profileImage = uploadImage.secure_url;
    }
  }

  const testimonial = await TestimonialComment.create({
    contactId: contactId || undefined,
    fullName: data.fullName,
    email: data.email,
    role: data.role,
    rating: data.rating,
    status: data.status || Status_Type.APPROVED,
    comment: data.comment,
    profileImage,
  });

  if (testimonial.status === Status_Type.APPROVED) {
    try {
      await addFeedbackToCache({
        _id: testimonial._id.toString(),
        fullName: testimonial.fullName,
        role: testimonial.role,
        rating: testimonial.rating,
        comment: testimonial.comment,
        createdAt: testimonial.createdAt,
        profileImage: testimonial.profileImage,
      });
    } catch (err) {
      // Redis failure should NOT make feedback submission fail.
      logger.warn({ err }, "Failed to update feedback cache");
    }
  }

  emailProducer
    .addFeedbackThankYou({
      to: testimonial.email,
      name: testimonial.fullName,
      rating: testimonial.rating,
    })
    .catch((err) => {
      logger.error(
        {
          err,
          email: testimonial.email,
        },
        "Failed to queue feedback thank-you email",
      );
    });

  return res.status(201).json({
    success: true,
    message:
      "Feedback submitted successfully! Thanks for sharing your thoughts.",
    data: testimonial,
  });
});

const getTopFeedbackCached = asyncHandler(async (req, res) => {
  const forceRefresh = req.query.refresh === "true";

  /*
   * Manual refresh:
   * Clear Redis first so MongoDB becomes the source of truth.
   */
  if (forceRefresh) {
    try {
      await clearBestFeedback();
      logger.info({ source: "manual" }, "Feedback cache cleared");
    } catch (err) {
      logger.warn({ err }, "Failed to clear feedback cache");
    }
  }

  // Try Redis first unless manually refreshing
  if (!forceRefresh) {
    const cachedFeedback = await getBestFeedback();

    if (cachedFeedback) {
      return res.status(200).json({
        success: true,
        source: "redis",
        data: cachedFeedback,
      });
    }
  }

  // Cache MISS / forced refresh → MongoDB
  const feedbacks = await TestimonialComment.find({
    status: Status_Type.APPROVED,
    isDeleted: false,
  })
    .select("fullName role rating comment createdAt profileImage")
    .sort({
      rating: -1,
      createdAt: -1,
    })
    .limit(5)
    .lean();

  try {
    await setBestFeedback(
      feedbacks.map((feedback) => ({
        _id: feedback._id.toString(),
        fullName: feedback.fullName,
        role: feedback.role,
        rating: feedback.rating,
        comment: feedback.comment,
        createdAt: feedback.createdAt
          ? new Date(feedback.createdAt).toISOString()
          : new Date().toISOString(),
        profileImage: feedback.profileImage,
      })),
    );
  } catch (err) {
    logger.warn({ err }, "Failed to populate feedback cache");
  }

  return res.status(200).json({
    success: true,
    source: forceRefresh ? "mongodb-refresh" : "mongodb",
    data: feedbacks,
  });
});

const getFeedback = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1); // Ensure page is at least 1
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50); // Limit to a maximum of 50
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const {
    status,
    role,
    sortBy = "createdAt",
    order = "desc",
  } = req.query as {
    status?: StatusType;
    role?: RoleType;
    sortBy?: "createdAt" | "rating";
    order?: "asc" | "desc";
  };

  // 🔍 Build filter
  const filter: {
    status?: StatusType;
    role?: RoleType;
  } = {};

  if (status) {
    filter.status = status.toLowerCase() as StatusType;
  } else {
    filter.status = Status_Type.APPROVED;
  }
  if (role) filter.role = role;

  // 🔃 Sorting
  const allowedSortFields = ["createdAt", "rating"] as const;
  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

  const sortOrder = order === "asc" ? 1 : -1;

  const sortOptions: Record<"createdAt" | "rating", 1 | -1> = {
    createdAt: -1,
    rating: -1,
  };

  sortOptions[safeSortBy] = sortOrder;

  // 📦 Query
  const feedbacks = await TestimonialComment.find(filter)
    // .populate("contactId", "fullName email") // optional
    .select("fullName role rating comment createdAt")
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  // 📊 Total count
  const total = await TestimonialComment.countDocuments(filter);

  return res.status(200).json({
    success: true,
    message: "Feedback fetched successfully",
    data: feedbacks,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

const updateFeedbackByEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  logger.info(
    {
      feedbackId: id,
      rating: req.body.rating,
    },
    "Feedback update requested",
  );

  const data = req.validatedData as UpdateFeedbackData;

  const updatedFeedback = await TestimonialComment.findOneAndUpdate(
    {
      _id: id,
      email: data.email,
      isDeleted: false,
    },
    {
      fullName: data.fullName,
      role: data.role,
      rating: data.rating,
      comment: data.comment,
    },
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validation runs on update
    },
  );

  if (!updatedFeedback) {
    return res.status(404).json({
      success: false,
      message: "Feedback not found",
    });
  }

  try {
    await clearBestFeedback();
  } catch (err) {
    logger.warn(
      { err, feedbackId: id },
      "Failed to clear feedback cache after feedback update",
    );
  }

  return res.status(200).json({
    success: true,
    message: "Feedback updated successfully",
    data: updatedFeedback,
  });
});

const deleteFeedbackByEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body as {
    email: string;
  };
  const deletedFeedback = await TestimonialComment.findOneAndUpdate(
    {
      _id: id,
      email: email,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  if (!deletedFeedback) {
    return res.status(404).json({
      success: false,
      message: "Feedback not found",
    });
  }

  try {
    await clearBestFeedback();
  } catch (err) {
    logger.warn(
      { err, feedbackId: id },
      "Failed to clear feedback cache after feedback deletion",
    );
  }

  return res.status(200).json({
    success: true,
    message: "Feedback deleted successfully",
  });
});

export {
  submitContactMe,
  submitFeedback,
  checkEmailStatus,
  getTopFeedbackCached,
  getFeedback,
  updateFeedbackByEmail,
  deleteFeedbackByEmail,
};
