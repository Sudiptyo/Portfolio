import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../Config/Axios";
import { API } from "./apiEndpoints";
import { toast } from "react-toastify";
import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface Admin {
  id: string;
  fullName: string;
  email: string;
}

interface ApiResponse<T = unknown> {
  success?: boolean;
  message: string;
  data: T;
}

interface CheckEmailResponse {
  success: boolean;
  isAdmin: boolean;
  isClient: boolean;
  hasFeedback: boolean;
  feedback: {
    fullName: string;
    role: string;
    rating: number;
    comment: string;
  } | null;
}

interface DashboardStats {
  totalFeedbacks: number;
  pendingFeedbacks: number;
  averageRating: number;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface checkEmailPayload {
  email: string;
}

interface UpdateProjectPayload {
  id: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
}

interface ToggleFeaturedPayload {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                           CHECK ADMIN EMAIL                                */
/* -------------------------------------------------------------------------- */

export const checkAdminEmail = createAsyncThunk<
  CheckEmailResponse,
  checkEmailPayload,
  { rejectValue: string }
>("admin/checkEmail", async (data, { rejectWithValue }) => {
  try {
    const res = await Axios.post(API.ADMIN.CHECK_EMAIL_STATUS, data);

    return res.data;
  } catch (err) {
    let message = "Unable to verify email.";

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message ?? message;
    }

    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                                LOGIN                                       */
/* -------------------------------------------------------------------------- */

export const loginAdmin = createAsyncThunk<
  ApiResponse<Admin>,
  LoginPayload,
  { rejectValue: string }
>("admin/login", async (data, { rejectWithValue }) => {
  try {
    const res = await Axios.post(API.ADMIN.LOGIN, data);

    toast.success(res.data.message);

    return res.data;
  } catch (err) {
    let message = "Login failed.";

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message ?? message;
    }

    toast.error(message);

    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                                LOGOUT                                      */
/* -------------------------------------------------------------------------- */

export const logoutAdmin = createAsyncThunk<
  ApiResponse<null>,
  void,
  { rejectValue: string }
>("admin/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await Axios.post<ApiResponse<null>>(API.ADMIN.LOGOUT);

    toast.success(res.data.message);

    return res.data;
  } catch (error) {
    let message = "Logout failed.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? message;
    }

    toast.error(message);

    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                           DASHBOARD STATS                                  */
/* -------------------------------------------------------------------------- */

export const getDashboardStats = createAsyncThunk<
  ApiResponse<DashboardStats>,
  void,
  { rejectValue: string }
>("admin/dashboard", async (_, { rejectWithValue }) => {
  try {
    const res = await Axios.get<ApiResponse<DashboardStats>>(
      API.ADMIN.DASHBOARD,
    );

    return res.data;
  } catch (error) {
    let message = "Unable to fetch dashboard.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? message;
    }

    toast.error(message);

    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                        UPDATE PROJECT STATUS                               */
/* -------------------------------------------------------------------------- */

export const updateProjectStatus = createAsyncThunk<
  ApiResponse,
  UpdateProjectStatusPayload,
  { rejectValue: string }
>("admin/updateProjectStatus", async ({ id, ...data }, { rejectWithValue }) => {
  try {
    const res = await Axios.patch<ApiResponse>(
      API.ADMIN.UPDATE_PROJECT_STATUS(id),
      data,
    );

    toast.success(res.data.message);

    return res.data;
  } catch (error) {
    let message = "Unable to update project status.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? message;
    }

    toast.error(message);

    return rejectWithValue(message);
  }
});

/* -------------------------------------------------------------------------- */
/*                        TOGGLE FEATURED FEEDBACK                            */
/* -------------------------------------------------------------------------- */

export const toggleFeatured = createAsyncThunk<
  ApiResponse,
  ToggleFeaturedPayload,
  { rejectValue: string }
>("admin/toggleFeatured", async ({ id }, { rejectWithValue }) => {
  try {
    const res = await Axios.patch<ApiResponse>(
      API.ADMIN.TOGGLE_FEATURED(id),
    );

    toast.success(res.data.message);

    return res.data;
  } catch (error) {
    let message = "Unable to update featured status.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? message;
    }

    toast.error(message);

    return rejectWithValue(message);
  }
});
