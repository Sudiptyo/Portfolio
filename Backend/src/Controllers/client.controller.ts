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

type ContactData = z.infer<typeof contactSchemaValidator>;
type FeedbackData = z.infer<typeof feedbackSchemaValidator>;
type UpdateFeedbackData = z.infer<typeof updateFeedbackSchemaValidator>;

const submitContactMe = asyncHandler(async (req, res) => {
  console.log("submitContactMe: ", req.body);

  const data = req.validatedData as ContactData;

  const contact = await Contact.create({
    fullName: data.fullName,
    email: data.email,
    projectType: data.projectType,
    budgetRange: data.budgetRange,
    status: data.status,
    message: data.message,
  });

  // await sendContactConfirmationEmail({
  //   to: contact.email,
  //   name: contact.fullName,
  //   projectType: contact.projectType,
  //   budget: contact.budgetRange,
  // });
  emailProducer
    .addContactConfirmation({
      to: contact.email,
      name: contact.fullName,
      projectType: contact.projectType,
      budget: contact.budgetRange,
    })
    .catch((err) => {
      console.error("Failed to send confirmation email:", err);
    });

  // try {
  //   await sendMail({
  //     to: contact.email,
  //     subject: "Thanks for reaching out 🚀",
  //     html: contactConfirmationEmail({
  //       name: contact.fullName,
  //       projectType: contact.projectType,
  //       budget: contact.budgetRange,
  //     }),
  //   });
  // } catch (err) {
  //   console.error(err);
  // }

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
  console.log("submitFeedback: ", req.body);

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

  // const contactExists = await Contact.findById(data.contactId);

  // if (!contactExists) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Contact not found",
  //   });
  // }

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

  // await sendContactConfirmationEmail({
  //   to: testimonial.email,
  //   name: testimonial.fullName,
  //   projectType: testimonial.role,
  //   budget: testimonial.rating,
  // });

  emailProducer
    .addFeedbackThankYou({
      to: testimonial.email,
      name: testimonial.fullName,
      rating: testimonial.rating,
    })
    .catch((err) => {
      console.error("Failed to send Feedback email", err);
    });

  return res.status(201).json({
    success: true,
    message:
      "Feedback submitted successfully! Thanks for sharing your thoughts.",
    data: testimonial,
  });
});

const getFeedback = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
  const skip = (page - 1) * limit;

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
  console.log("update Feedback: ", req.body);

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

  return res.status(200).json({
    success: true,
    message: "Feedback deleted successfully",
  });
});

export {
  submitContactMe,
  submitFeedback,
  checkEmailStatus,
  getFeedback,
  updateFeedbackByEmail,
  deleteFeedbackByEmail,
};
