import { Admin } from "../Models/Admin.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { Contact } from "../Models/Contact.model.js";
import {
  Status_Type,
  StatusType,
  TestimonialComment,
} from "../Models/Testimonial.model.js";
import { CookieOptions } from "express";
import { emailProducer } from "../Services/Queue/producer.service.js";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
};

interface AdminLoginBody {
  email: string;
  password: string;
}

interface CheckEmailBody {
  email: string;
}

interface UpdateProjectBody {
  status: StatusType;
  message?: string;
}

const checkEmailStatus = asyncHandler(async (req, res) => {
  console.log("Admin Checking:", req.body);

  const { email } = req.body as CheckEmailBody;

  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const [isAdmin, isClient, feedback] = await Promise.all([
    Admin.exists({ email: normalizedEmail }),
    Contact.exists({ email: normalizedEmail }),
    TestimonialComment.findOne({
      email: normalizedEmail,
      isDeleted: false,
    }).select("fullName role rating comment status"),
  ]);

  return res.status(200).json({
    success: true,
    isAdmin: !!isAdmin,
    isClient: !!isClient,
    hasFeedback: !!feedback,
    feedback: feedback
      ? {
          fullName: feedback.fullName,
          role: feedback.role,
          rating: feedback.rating,
          comment: feedback.comment,
        }
      : null,
    allowFeedback: !!isClient || !!isAdmin,
  });
});

// const checkEmailStatus = asyncHandler(async (req, res) => {
//   const { email } = req.validatedData as CheckEmailBody;
//   console.log("Admin Checking: ", req.body);

//   if (!email) {
//     return res.status(400).json({ success: false, message: "Email required" });
//   }

//   const [isAdmin, isClient, feedback] = await Promise.all([
//     Admin.exists({ email }),
//     Contact.exists({ email }),
//     TestimonialComment.findOne({ email, isDeleted: false }).select(
//       "fullName role rating comment status",
//     ), // Check if the user has submitted feedback before and retrieve it for pre-filling the form if they are an admin or client. Only non-deleted feedback is considered.
//   ]);

//   return res.status(200).json({
//     success: true,
//     isAdmin: !!isAdmin,
//     isClient: !!isClient,
//     hasFeedback: !!feedback,
//     feedback: feedback
//       ? {
//           fullName: feedback.fullName,
//           role: feedback.role,
//           rating: feedback.rating,
//           comment: feedback.comment,
//         }
//       : null,
//     allowFeedback: !!isClient || !!isAdmin,
//   });
// });

const adminLogin = asyncHandler(async (req, res) => {
  const data = req.validatedData as AdminLoginBody;

  const admin = await Admin.findOne({ email: data.email.toLowerCase() });
  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await admin.isPasswordCorrect(data.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const adminToken = admin.generateAccessToken();
  if (!adminToken) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  const adminData = {
    id: admin.id,
    email: admin.email,
    fullName: admin.fullName,
  };

  return res.status(200).cookie("adminToken", adminToken, cookieOptions).json({
    message: "Admin Access Successful !!",
    data: adminData,
    isAdmin: true,
  });
});

const adminLogout = asyncHandler(async (req, res) => {
  return res.status(200).clearCookie("adminToken", cookieOptions).json({
    message: "Admin logged out successfully !!",
  });
});

const updateProjectStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status, message } = req.validatedData as UpdateProjectBody;

  if (!Object.values(Status_Type).includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  const prevStatus = contact.status;

  contact.status = status;
  contact.statusMessage = message ?? "";

  await contact.save({ validateBeforeSave: false });

  // let subject = "";
  // let html = "";

  // switch (status) {
  //   case Status_Type.APPROVED:
  //     subject = "Project Accepted 🎉";
  //     await sendApprovedProjectEmail({
  //       to: contact.email,
  //       name: contact.fullName,
  //     });
  //     // html = approvedProjectEmail(contact.fullName);

  //     break;
  //   case Status_Type.REJECTED:
  //     subject = "Project Rejected";
  //     await sendRejectedProjectEmail({
  //       to: contact.email,
  //       name: contact.fullName,
  //       message,
  //     });
  //     // html = rejectedProjectEmail(contact.fullName, message);

  //     break;
  //   case Status_Type.PENDING:
  //     subject = "Project Update (Pending)";
  //     await sendPendingProjectEmail({
  //       to: contact.email,
  //       name: contact.fullName,
  //       message,
  //     });
  //     // html = pendingProjectEmail(contact.fullName, message);
  //     break;

  //   default:
  //     return res.status(400).json({
  //       success: false,
  //       message: "Invalid status",
  //     });
  // }

  // if (prevStatus !== status) {
  //   // send email

  //   await sendMail({
  //     to: contact.email,
  //     subject,
  //     html,
  //   }).catch((err) => {
  //     console.error("Error sending status update email: ", err);
  //   });
  // }

  if (prevStatus !== status) {
    switch (status) {
      case Status_Type.APPROVED:
        emailProducer
          .addProjectApproved({
            to: contact.email,
            name: contact.fullName,
          })
          .catch((err) => {
            console.error("Failed to queue approved email:", err);
          });

        break;

      case Status_Type.REJECTED:
        emailProducer
          .addProjectRejected({
            to: contact.email,
            name: contact.fullName,
            message,
          })
          .catch((err) => {
            console.error("Failed to queue rejected email:", err);
          });
        break;

      case Status_Type.PENDING:
        emailProducer
          .addProjectPending({
            to: contact.email,
            name: contact.fullName,
            message,
          })
          .catch((err) => {
            console.error("Failed to queue pending email:", err);
          });
        break;
    }
  }

  return res.status(200).json({
    success: true,
    message: "Project status updated successfully",
    data: contact,
  });
});

const toggleFeaturedFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const feedback = await TestimonialComment.findById(id);

  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: "Feedback not found",
    });
  }

  feedback.featured = !feedback.featured;
  await feedback.save();

  return res.status(200).json({
    success: true,
    message: `Feedback ${feedback.featured ? "marked as featured" : "removed from featured"}`,
    data: feedback,
  });
});

const getAdminDashboardStats = asyncHandler(async (req, res) => {
  const [totalFeedback, pendingFeedback, avgRatingResult] = await Promise.all([
    TestimonialComment.countDocuments(),

    TestimonialComment.countDocuments({ status: Status_Type.PENDING }),

    TestimonialComment.aggregate([
      {
        $match: { status: Status_Type.APPROVED },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]),
  ]);

  const avgRating = avgRatingResult[0]?.avgRating ?? 0;

  return res.status(200).json({
    success: true,
    data: {
      totalFeedback,
      pendingFeedback,
      averageRating: Number(avgRating.toFixed(1)),
    },
  });
});

export {
  checkEmailStatus,
  adminLogin,
  adminLogout,
  updateProjectStatus,
  toggleFeaturedFeedback,
  getAdminDashboardStats,
};
