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

export function getRefreshToken() {
  const jwtToken = getToken();
  if (!jwtToken) return "";
  const jwt = JSON.parse(atob(jwtToken.split(".")[1]));
  return jwt.rid;
}

export const isRunningOnLocalhost = (target?: string) => {
  const actualBaseUrl =
    target ??
    window.location.origin
      .replace("http://", "")
      .replace("https://", "")
      .split("/")[0];

  return (
    actualBaseUrl.startsWith("localhost") ||
    actualBaseUrl.startsWith("127.0.0.1") ||
    actualBaseUrl.startsWith("192.168.") ||
    actualBaseUrl.startsWith("0.0.0.0")
  );
};
