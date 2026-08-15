// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import {
//   getFeedback,
//   submitFeedback,
//   updateFeedback,
//   deleteFeedback,
//   checkEmailStatus,
//   getTopFeedback,
// } from "@/API/apiClientThunks"; // Adjust path to where your thunks are defined

// export interface FeedbackItem {
//   _id: string;
//   fullName: string;
//   email?: string;
//   role: string;
//   rating: number;
//   comment: string;
//   profileImage?: string;
//   createdAt: string;
// }

// export interface PaginationMeta {
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// interface FeedbackState {
//   items: FeedbackItem[];
//   pagination: PaginationMeta | null;
//   loading: boolean;
//   submitting: boolean;
//   error: string | null;
//   emailStatus: {
//     hasWorkedWithAdmin: boolean;
//     contactId: string | null;
//     existingFeedback: FeedbackItem | null;
//   } | null;
// }

// const initialState: FeedbackState = {
//   items: [],
//   pagination: null,
//   loading: false,
//   submitting: false,
//   error: null,
//   emailStatus: null,
// };

// const feedbackSlice = createSlice({
//   name: "feedback",
//   initialState,
//   reducers: {
//     clearFeedbackError: (state) => {
//       state.error = null;
//     },
//     resetEmailStatus: (state) => {
//       state.emailStatus = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       /* --------------------------- GET FEEDBACK --------------------------- */
//       // .addCase(getFeedback.pending, (state) => {
//       //   state.loading = true;
//       //   state.error = null;
//       // })
//       // .addCase(getFeedback.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   state.items = action.payload.data as FeedbackItem[];
//       //   state.pagination = action.payload.pagination;
//       // })
//       // .addCase(getFeedback.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload || "Failed to fetch feedback";
//       // })

//       .addCase(getTopFeedback.pending, (state) => {
//     state.loading = true;
//     state.error = null;
//   })

//   .addCase(getTopFeedback.fulfilled, (state, action) => {
//     state.loading = false;
//     state.items = action.payload.data;
//   })

//   .addCase(getTopFeedback.rejected, (state, action) => {
//     state.loading = false;
//     state.error = action.payload ?? "Failed to fetch feedback";
//   });

//       /* ------------------------- SUBMIT FEEDBACK -------------------------- */
//       .addCase(submitFeedback.pending, (state) => {
//         state.submitting = true;
//         state.error = null;
//       })
//       .addCase(submitFeedback.fulfilled, (state, action) => {
//         state.submitting = false;
//         // Optionally prepend new item locally if payload contains data
//         if (action.payload.data) {
//           state.items.unshift(action.payload.data as FeedbackItem);
//         }
//       })
//       .addCase(submitFeedback.rejected, (state, action) => {
//         state.submitting = false;
//         state.error = action.payload || "Failed to submit feedback";
//       })

//       /* ------------------------- CHECK EMAIL STATUS ----------------------- */
//       .addCase(checkEmailStatus.fulfilled, (state, action) => {
//         state.emailStatus = action.payload.data;
//       })

//       /* ------------------------- UPDATE FEEDBACK -------------------------- */
//       .addCase(updateFeedback.fulfilled, (state, action) => {
//         const updated = action.payload.data as FeedbackItem;
//         const index = state.items.findIndex((item) => item._id === updated._id);
//         if (index !== -1) {
//           state.items[index] = { ...state.items[index], ...updated };
//         }
//       })

//       /* ------------------------- DELETE FEEDBACK -------------------------- */
//       .addCase(deleteFeedback.fulfilled, (state, action) => {
//         const deletedId = action.meta.arg.id;
//         state.items = state.items.filter((item) => item._id !== deletedId);
//       });
//   },
// });

// export const { clearFeedbackError, resetEmailStatus } = feedbackSlice.actions;
// export default feedbackSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getFeedback,
  submitFeedback,
  updateFeedback,
  deleteFeedback,
  checkEmailStatus,
  getTopFeedback,
} from "@/API/apiClientThunks";

export interface FeedbackItem {
  _id: string;
  fullName: string;
  email?: string;
  role: string;
  rating: number;
  comment: string;
  profileImage?: string;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FeedbackState {
  items: FeedbackItem[];
  pagination: PaginationMeta | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  emailStatus: {
    hasWorkedWithAdmin: boolean;
    contactId: string | null;
    existingFeedback: FeedbackItem | null;
  } | null;
}

const initialState: FeedbackState = {
  items: [],
  pagination: null,
  loading: false,
  submitting: false,
  error: null,
  emailStatus: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,

  reducers: {
    clearFeedbackError: (state) => {
      state.error = null;
    },

    resetEmailStatus: (state) => {
      state.emailStatus = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ------------------------- GET TOP FEEDBACK ------------------------- */

      .addCase(getTopFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTopFeedback.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.data;
      })

      .addCase(getTopFeedback.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to fetch top feedback";
      })

      /* --------------------------- GET FEEDBACK --------------------------- */

      .addCase(getFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getFeedback.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.data as FeedbackItem[];

        // Only if your normal getFeedback response contains pagination.
        state.pagination = action.payload.pagination;
      })

      .addCase(getFeedback.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to fetch feedback";
      })

      /* ------------------------- SUBMIT FEEDBACK -------------------------- */

      .addCase(submitFeedback.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })

      .addCase(submitFeedback.fulfilled, (state) => {
        state.submitting = false;

        /*
         * DO NOT add the submitted feedback directly to items.
         *
         * Redis/MongoDB decides which 5 feedbacks belong
         * in the homepage carousel.
         */
      })

      .addCase(submitFeedback.rejected, (state, action) => {
        state.submitting = false;

        state.error = action.payload ?? "Failed to submit feedback";
      })

      /* ------------------------- CHECK EMAIL STATUS ----------------------- */

      .addCase(checkEmailStatus.fulfilled, (state, action) => {
        state.emailStatus = action.payload.data;
      })

      /* ------------------------- UPDATE FEEDBACK -------------------------- */

      .addCase(updateFeedback.fulfilled, (state, action) => {
        const updated = action.payload.data as FeedbackItem;

        const index = state.items.findIndex((item) => item._id === updated._id);

        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...updated,
          };
        }
      })

      /* ------------------------- DELETE FEEDBACK -------------------------- */

      .addCase(deleteFeedback.fulfilled, (state, action) => {
        const deletedId = action.meta.arg.id;

        state.items = state.items.filter((item) => item._id !== deletedId);
      });
  },
});

export const { clearFeedbackError, resetEmailStatus } = feedbackSlice.actions;

export default feedbackSlice.reducer;
