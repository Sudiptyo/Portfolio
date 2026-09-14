import { useEffect } from "react";

import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store/store";

import { getCurrentAdmin } from "@/API/apiAdminThunks";

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentAdmin());
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
