export const API_BASE = {
  CLIENT: "/api/v1/clients",
  ADMIN: "/api/v1/admin",
} as const;

export const API = {
  ADMIN: {
    CHECK_EMAIL_STATUS: `${API_BASE.ADMIN}/check-email-status`,
    LOGIN: `${API_BASE.ADMIN}/login-admin`,
    LOGOUT: `${API_BASE.ADMIN}/logout-admin`,
    DASHBOARD: `${API_BASE.ADMIN}/dashboard`,
    UPDATE_PROJECT_STATUS: (id: string) =>
      `${API_BASE.ADMIN}/update-project-status/${id}/status`,
    TOGGLE_FEATURED: (id: string) =>
      `${API_BASE.ADMIN}/feedback/${id}/featured`,
  },

  CONTACT: {
    SUBMIT: `${API_BASE.CLIENT}/contact`,
  },

  FEEDBACK: {
    CHECK_EMAIL_STATUS: `${API_BASE.CLIENT}/check-email-status`,
    SUBMIT: `${API_BASE.CLIENT}/feedback`,
    GET_ALL: `${API_BASE.CLIENT}/get-feedback`,
    UPDATE: (id: string) => `${API_BASE.CLIENT}/update-feedback/${id}`,
    DELETE: (id: string) => `${API_BASE.CLIENT}/delete-feedback/${id}`,
  },
} as const;
