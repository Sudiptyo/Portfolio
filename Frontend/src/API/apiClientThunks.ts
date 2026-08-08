import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../Config/Axios";
import { API } from "./apiEndpoints";
import { toast } from "react-toastify";
import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface ContactPayload {
  fullName: string;
  email: string;
  projectType: string;
  budgetRange: number;
  message: string;
}

export interface FeedbackPayload {
  contactId: string;
  fullName: string;
  email: string;
  role: string;
  rating: number;
  comment: string;
}

export interface UpdateFeedbackPayload {
  id: string;
  fullName?: string;
  email?: string;
  role?: string;
  rating?: number;
  comment?: string;
}

export interface DeleteFeedbackPayload {
  id: string;
  email: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/* -------------------------------------------------------------------------- */
/*                              SUBMIT CONTACT                                */
/* -------------------------------------------------------------------------- */

export const submitContact = createAsyncThunk<
  ApiResponse,
  ContactPayload,
  { rejectValue: string }
>("contact/submit", async (data, { rejectWithValue }) => {
  try {
    const res = await Axios.post(API.CONTACT.SUBMIT, data);

    toast.success(res.data.message);

    return res.data;
  } catch (err) {
    let message = "Unable to submit contact request.";

    if (axios.isAxiosError(err)) {
      message = err.response?.data.message || message;
    }

    toast.error(message);
    console.error(err);

    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                              CHECK EMAIL STATUS                            */
/* -------------------------------------------------------------------------- */

export const checkEmailStatus = createAsyncThunk(
  "feedback/checkEmailStatus",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await Axios.get(API.FEEDBACK.CHECK_EMAIL_STATUS, {
        params: { email },
      });
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || "Check failed");
      }

      return rejectWithValue("Check failed");
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                              SUBMIT FEEDBACK                               */
/* -------------------------------------------------------------------------- */

// export const submitFeedback = createAsyncThunk<
//   ApiResponse,
//   FeedbackPayload,
//   { rejectValue: string }
// >("feedback/submit", async (data, { rejectWithValue }) => {
//   try {
//     const res = await Axios.post(API.FEEDBACK.SUBMIT, data);

//     toast.success(res.data.message);

//     return res.data;
//   } catch (err) {
//     let message = "Unable to submit feedback.";

//     if (axios.isAxiosError(err)) {
//       message = err.response?.data.message || message;

//       toast.error(message);
//       return rejectWithValue(message);
//     }
//   }
// });

export const submitFeedback = createAsyncThunk<
  ApiResponse,
  FormData,
  { rejectValue: string }
>("feedback/submit", async (formData, { rejectWithValue }) => {
  try {
    const res = await Axios.post<ApiResponse>(API.FEEDBACK.SUBMIT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(res.data.message);
    return res.data;
  } catch (err) {
    let message = "Unable to submit feedback.";

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message ?? message;
    }

    toast.error(message);
    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                               GET FEEDBACK                                 */
/* -------------------------------------------------------------------------- */

export const getFeeedback = createAsyncThunk<
  ApiResponse,
  {
    page?: number;
    limit?: number;
    status?: string;
    role?: string;
    sortBy?: "createdAt" | "rating";
    order?: "asc" | "desc";
  },
  { rejectValue: string }
>("feedback/getAll", async (params = {}, { rejectWithValue }) => {
  try {
    const res = await Axios.get(API.FEEDBACK.GET_ALL, { params });

    return res.data;
  } catch (err) {
    let message = "Unable to fetch feedback.";

    if (axios.isAxiosError(err)) {
      message = err.response?.data.message || message;
    }

    toast.error(message);
    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                              UPDATE FEEDBACK                               */
/* -------------------------------------------------------------------------- */

export const updateFeedback = createAsyncThunk<
  ApiResponse,
  UpdateFeedbackPayload,
  { rejectValue: string }
>("feedback/update", async ({ id, ...data }, { rejectWithValue }) => {
  try {
    const res = await Axios.patch<ApiResponse>(API.FEEDBACK.UPDATE(id), data);

    toast.success(res.data.message);

    return res.data;
  } catch (err) {
    let message = "Unable to update feedback.";

    if (axios.isAxiosError(err)) {
      message = err.response?.data.message || message;
    }

    toast.error(message);
    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                              DELETE FEEDBACK                               */
/* -------------------------------------------------------------------------- */

export const deleteFeedback = createAsyncThunk<
  ApiResponse,
  DeleteFeedbackPayload,
  { rejectValue: string }
>("feedback/delete", async ({ id, email }, { rejectWithValue }) => {
  try {
    const res = await Axios.delete<ApiResponse>(API.FEEDBACK.DELETE(id), {
      data: { email },
    });

    toast.success(res.data.message);

    return res.data;
  } catch (error) {
    let message = "Unable to delete feedback.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? message;
    }

    toast.error(message);

    return rejectWithValue(message);
  }
});
