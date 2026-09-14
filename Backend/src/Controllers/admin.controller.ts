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
import { logger } from "../Utils/logger.js";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
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
  const { email } = req.body as CheckEmailBody;

  const normalizedEmail = email?.trim().toLowerCase();
  logger.info({ email: normalizedEmail }, "Admin email status check");

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

  if (prevStatus !== status) {
    switch (status) {
      case Status_Type.APPROVED:
        emailProducer
          .addProjectApproved({
            to: contact.email,
            name: contact.fullName,
          })
          .catch((err) => {
            logger.error(
              { err, contactId: contact.id },
              "Failed to queue approved project email",
            );
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
            logger.error(
              { err, contactId: contact.id },
              "Failed to queue rejected project email",
            );
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
            logger.error(
              { err, contactId: contact.id },
              "Failed to queue pending project email",
            );
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

// const getAdminDashboardStats = asyncHandler(async (req, res) => {
//   const range = String(req.query.range || "7");
//   const allowedRange = ["7", "30", "90", "all"];

//   if (!allowedRange.includes(range)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid range",
//     });
//   }

//   const now = new Date();
//   let startDate: Date | null = null;

//   if (range !== "all") {
//     const days = Number(range);
//     startDate = new Date();
//     startDate.setHours(0, 0, 0, 0);
//     startDate.setDate(startDate.getDate() - (days - 1));
//   }
//   const [
//     totalContacts,
//     pendingContacts,
//     approvedContacts,

//     totalFeedback,
//     pendingFeedback,
//     featuredFeedback,

//     avgRatingResult,
//   ] = await Promise.all([
//     Contact.countDocuments(),
//     Contact.countDocuments({ status: Status_Type.PENDING }),
//     Contact.countDocuments({ status: Status_Type.APPROVED }),

//     TestimonialComment.countDocuments(),
//     TestimonialComment.countDocuments({ status: Status_Type.PENDING }),
//     TestimonialComment.countDocuments({
//       featured: true,
//     }),

//     TestimonialComment.aggregate([
//       {
//         $match: { status: Status_Type.APPROVED },
//       },
//       {
//         $group: {
//           _id: null,
//           avgRating: { $avg: "$rating" },
//         },
//       },
//     ]),
//   ]);

//   /* ------------------------------------------------------------------------ */
//   /*                              APPROVAL RATE                               */
//   /* ------------------------------------------------------------------------ */
//   const contactApprovalRate =
//     totalContacts > 0
//       ? Math.round((approvedContacts / totalContacts) * 100)
//       : 0;

//   /* ------------------------------------------------------------------------ */
//   /*                             AVERAGE RATING                               */
//   /* ------------------------------------------------------------------------ */
//   const avgRating = avgRatingResult[0]?.avgRating ?? 0;

//   /* ------------------------------------------------------------------------ */
//   /*                           ACTIVITY MATCH QUERY                           */
//   /* ------------------------------------------------------------------------ */
//   const activityMatchQuery = startDate
//     ? {
//         createdAt: {
//           $gte: startDate,
//           $lte: now,
//         },
//       }
//     : {};

//   const contactActivity = await Contact.aggregate([
//     {
//       $match: activityMatchQuery,
//     },

//     {
//       $group: {
//         _id: {
//           $dateToString: {
//             format: "%Y-%m-%d",
//             date: "$createdAt",
//           },
//         },

//         count: {
//           $sum: 1,
//         },
//       },
//     },

//     {
//       $sort: {
//         _id: 1,
//       },
//     },
//   ]);

//   /* ------------------------------------------------------------------------ */
//   /*                       GET FEEDBACK ACTIVITY DATA                         */
//   /* ------------------------------------------------------------------------ */

//   const feedbackActivity = await TestimonialComment.aggregate([
//     {
//       $match: activityMatchQuery,
//     },

//     {
//       $group: {
//         _id: {
//           $dateToString: {
//             format: "%Y-%m-%d",
//             date: "$createdAt",
//           },
//         },

//         count: {
//           $sum: 1,
//         },
//       },
//     },

//     {
//       $sort: {
//         _id: 1,
//       },
//     },
//   ]);

//   /* ------------------------------------------------------------------------ */
//   /*                    CONVERT ACTIVITY INTO LOOKUP MAPS                     */
//   /* ------------------------------------------------------------------------ */

//   const contactsMap = new Map(
//     contactActivity.map((item) => [item._id, item.count]),
//   );

//   const feedbacksMap = new Map(
//     feedbackActivity.map((item) => [item._id, item.count]),
//   );

//   /* ------------------------------------------------------------------------ */
//   /*                              BUILD GRAPH DATA                            */
//   /* ------------------------------------------------------------------------ */

//   const activity = [];

//   /*
//     --------------------------------------------------------------------------
//     7 / 30 / 90 DAYS
//     --------------------------------------------------------------------------
//   */

//   if (startDate) {
//     const days = Number(range);

//     for (let i = days - 1; i >= 0; i--) {
//       const date = new Date();

//       date.setHours(0, 0, 0, 0);

//       date.setDate(date.getDate() - i);

//       const key = date.toISOString().split("T")[0];

//       const label =
//         days === 7
//           ? date.toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })
//           : date.toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             });

//       activity.push({
//         date: i === 0 ? "Today" : label,

//         contacts: contactsMap.get(key) ?? 0,

//         feedbacks: feedbacksMap.get(key) ?? 0,
//       });
//     }
//   }

//   /*
//     --------------------------------------------------------------------------
//     ALL TIME
//     --------------------------------------------------------------------------
//   */
//   else {
//     /*
//       Combine every date that exists in either collection.
//     */

//     const allDates = new Set([...contactsMap.keys(), ...feedbacksMap.keys()]);

//     const sortedDates = [...allDates].sort();

//     for (const dateString of sortedDates) {
//       const date = new Date(`${dateString}T00:00:00`);

//       activity.push({
//         date: date.toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//           year: "numeric",
//         }),

//         contacts: contactsMap.get(dateString) ?? 0,

//         feedbacks: feedbacksMap.get(dateString) ?? 0,
//       });
//     }
//   }

//   return res.status(200).json({
//     success: true,
//     data: {
//       contacts: {
//         total: totalContacts,
//         pending: pendingContacts,
//         approved: approvedContacts,
//         approvalRate: contactApprovalRate,
//       },

//       feedbacks: {
//         total: totalFeedback,
//         pending: pendingFeedback,
//         featured: featuredFeedback,
//         averageRating: Number(avgRating.toFixed(1)),
//       },
//       activity,
//     },
//   });
// });

const getAdminDashboardStats = asyncHandler(async (_req, res) => {
  const [
    totalContacts,
    pendingContacts,
    approvedContacts,

    totalFeedback,
    pendingFeedback,
    featuredFeedback,

    // clientInquiries,
    avgRatingResult,
  ] = await Promise.all([
    Contact.countDocuments(),

    Contact.countDocuments({
      status: Status_Type.PENDING,
    }),

    Contact.countDocuments({
      status: Status_Type.APPROVED,
    }),

    TestimonialComment.countDocuments(),

    TestimonialComment.countDocuments({
      status: Status_Type.PENDING,
    }),

    TestimonialComment.countDocuments({
      featured: true,
    }),

    TestimonialComment.aggregate([
      {
        $match: {
          status: Status_Type.APPROVED,
        },
      },
      {
        $group: {
          _id: null,
          avgRating: {
            $avg: "$rating",
          },
        },
      },
    ]),
  ]);

  const approvalRate =
    totalContacts > 0
      ? Math.round((approvedContacts / totalContacts) * 100)
      : 0;

  const averageRating = avgRatingResult[0]?.avgRating ?? 0;

  return res.status(200).json({
    success: true,

    data: {
      contacts: {
        total: totalContacts,
        pending: pendingContacts,
        approved: approvedContacts,
        approvalRate,
      },

      feedbacks: {
        total: totalFeedback,
        pending: pendingFeedback,
        featured: featuredFeedback,
        averageRating: Number(averageRating.toFixed(1)),
      },
    },
  });
});

const getAdminDashboardActivity = asyncHandler(async (req, res) => {
  const range = String(req.query.range ?? "7");

  const allowedRanges = ["7", "30", "90", "all"];

  if (!allowedRanges.includes(range)) {
    return res.status(400).json({
      success: false,
      message: "Invalid range",
    });
  }

  const now = new Date();

  let startDate: Date | null = null;

  if (range !== "all") {
    const days = Number(range);

    startDate = new Date();

    startDate.setHours(0, 0, 0, 0);

    startDate.setDate(startDate.getDate() - (days - 1));
  }

  const activityMatchQuery = startDate
    ? {
        createdAt: {
          $gte: startDate,
          $lte: now,
        },
      }
    : {};

  const [contactActivity, feedbackActivity] = await Promise.all([
    Contact.aggregate([
      {
        $match: activityMatchQuery,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]),

    TestimonialComment.aggregate([
      {
        $match: activityMatchQuery,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]),
  ]);

  const contactsMap = new Map(
    contactActivity.map((item) => [item._id, item.count]),
  );

  const feedbacksMap = new Map(
    feedbackActivity.map((item) => [item._id, item.count]),
  );

  const activity: {
    date: string;
    contacts: number;
    feedbacks: number;
  }[] = [];

  /* ---------------------------------------------------------------------- */
  /*                             7 / 30 / 90 DAYS                           */
  /* ---------------------------------------------------------------------- */

  if (startDate) {
    const days = Number(range);

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();

      date.setHours(0, 0, 0, 0);

      date.setDate(date.getDate() - i);

      const key = date.toISOString().split("T")[0];

      const label = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      activity.push({
        date: i === 0 ? "Today" : label,

        contacts: contactsMap.get(key) ?? 0,

        feedbacks: feedbacksMap.get(key) ?? 0,
      });
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                               ALL TIME                                 */
  /* ---------------------------------------------------------------------- */
  else {
    const allDates = [
      ...new Set([...contactsMap.keys(), ...feedbacksMap.keys()]),
    ].sort();

    for (const dateString of allDates) {
      const date = new Date(`${dateString}T00:00:00`);

      activity.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),

        contacts: contactsMap.get(dateString) ?? 0,

        feedbacks: feedbacksMap.get(dateString) ?? 0,
      });
    }
  }

  return res.status(200).json({
    success: true,

    data: activity,
  });
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  return res.status(200).json({
    success: true,
    data: {
      id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
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
  getAdminDashboardActivity,
  getCurrentAdmin,
};
