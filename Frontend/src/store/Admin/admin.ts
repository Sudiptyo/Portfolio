import { createSlice } from "@reduxjs/toolkit";

import {
  checkAdminEmail,
  getCurrentAdmin,
  getDashboardActivity,
  getDashboardStats,
  loginAdmin,
  logoutAdmin,
} from "../../API/apiAdminThunks";

export interface Admin {
  id: string;
  fullName: string;
  email: string;
}

export interface DashboardChartData {
  date: string;
  contacts: number;
  feedbacks: number;
}

export interface DashboardStats {
  contacts: {
    total: number;
    pending: number;
    approved: number;
    approvalRate: number;
  };

  feedbacks: {
    total: number;
    pending: number;
    featured: number;
    averageRating: number;
  };
}

interface AdminState {
  isAdmin: boolean;
  admin: Admin | null;

  checkingSession: boolean;

  checkingEmail: boolean;
  emailMatched: boolean;

  loading: boolean;

  dashboardStats: DashboardStats | null;
  dashboardLoading: boolean;

  dashboardActivity: DashboardChartData[];
  activityLoading: boolean;

  error: string | null;
}

const initialState: AdminState = {
  isAdmin: false,
  admin: null,

  checkingSession: true,

  checkingEmail: false,
  emailMatched: false,

  loading: false,

  dashboardStats: null,
  dashboardLoading: false,

  dashboardActivity: [],
  activityLoading: false,

  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    clearError(state) {
      state.error = null;
    },

    resetEmailCheck(state) {
      state.checkingEmail = false;
      state.emailMatched = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===========================
      // CHECK ADMIN EMAIL
      // ===========================

      .addCase(checkAdminEmail.pending, (state) => {
        state.checkingEmail = true;
        state.error = null;
      })

      .addCase(checkAdminEmail.fulfilled, (state, action) => {
        state.checkingEmail = false;
        state.emailMatched = action.payload.isAdmin;
      })

      .addCase(checkAdminEmail.rejected, (state, action) => {
        state.checkingEmail = false;
        state.emailMatched = false;

        state.error =
          action.payload ?? action.error.message ?? "Unable to verify email.";
      })

      // ===========================
      // LOGIN
      // ===========================

      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdmin = true;
        state.admin = action.payload.data;
      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.isAdmin = false;
        state.admin = null;

        state.error = action.payload ?? action.error.message ?? "Login failed.";
      })

      // ===========================
      // LOGOUT
      // ===========================

      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;

        state.isAdmin = false;
        state.admin = null;

        state.emailMatched = false;
        state.checkingEmail = false;
        state.checkingSession = false;

        state.dashboardStats = null;
        state.dashboardLoading = false;

        state.dashboardActivity = [];
        state.activityLoading = false;

        state.error = null;
      })

      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ?? action.error.message ?? "Logout failed.";
      })

      // ===========================
      // RESTORE ADMIN SESSION
      // ===========================

      .addCase(getCurrentAdmin.pending, (state) => {
        state.checkingSession = true;
      })

      .addCase(getCurrentAdmin.fulfilled, (state, action) => {
        state.checkingSession = false;

        state.isAdmin = true;
        state.admin = action.payload.data;
      })

      .addCase(getCurrentAdmin.rejected, (state) => {
        state.checkingSession = false;

        state.isAdmin = false;
        state.admin = null;
      })

      // ===========================
      // GET DASHBOARD STATS
      // ===========================

      .addCase(getDashboardStats.pending, (state) => {
        state.dashboardLoading = true;
        state.error = null;
      })

      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardStats = action.payload.data;
      })

      .addCase(getDashboardStats.rejected, (state, action) => {
        state.dashboardLoading = false;

        state.error =
          action.payload ??
          action.error.message ??
          "Unable to fetch dashboard statistics.";
      })

      // ===========================
      // GET DASHBOARD ACTIVITY
      // ===========================

      .addCase(getDashboardActivity.pending, (state) => {
        state.activityLoading = true;
        state.error = null;
      })

      .addCase(getDashboardActivity.fulfilled, (state, action) => {
        state.activityLoading = false;
        state.dashboardActivity = action.payload.data;
      })

      .addCase(getDashboardActivity.rejected, (state, action) => {
        state.activityLoading = false;

        state.error =
          action.payload ??
          action.error.message ??
          "Unable to fetch dashboard activity.";
      });
  },
});

export const { clearError, resetEmailCheck } = adminSlice.actions;

export default adminSlice.reducer;
