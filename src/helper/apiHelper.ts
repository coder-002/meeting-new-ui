import axios from "axios";
import { baseUrl } from "../services/api-service";

export const getToken = () => {
  if (window !== undefined) return localStorage.getItem("access-token");
};

export const redirectToLogin = async () => {
  const res = await axios.get(
    `${baseUrl}/api/login?returnUrl=${location.href}`
  );
  if (res) location.href = res.data;
};
