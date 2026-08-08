import { createSlice } from "@reduxjs/toolkit";
// import type { Admin } from "./types"; // or keep the interface here

import { checkAdminEmail, loginAdmin, logoutAdmin } from "../../API/apiAdminThunks";

export interface Admin {
  id: string;
  fullName: string;
  email: string;
}

interface AdminState {
  isAdmin: boolean;
  admin: Admin | null;

  checkingEmail: boolean;
  emailMatched: boolean;

  loading: boolean;

  error: string | null;
}

const initialState: AdminState = {
  isAdmin: false,
  admin: null,

  checkingEmail: false,
  emailMatched: false,

  loading: false,

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
        state.error = action.error.message ?? "Unable to verify email.";
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
        state.error = action.error.message ?? "Login failed.";
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

        state.error = null;
      })

      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Logout failed.";
      });
  },
});

export const { clearError, resetEmailCheck } = adminSlice.actions;

export default adminSlice.reducer;
