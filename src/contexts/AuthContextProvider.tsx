import React, { createContext, useContext, useEffect, useState } from "react";
import { IUserMeta } from "../models/auth/auth";
import { get } from "../services/api-service";
import {
  getToken,
  isRunningOnLocalhost,
  redirectToLogin,
} from "../helper/apiHelper";

const AuthContext = createContext<IUserMeta | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [meta, setMeta] = useState<IUserMeta>({
    userId: 0,
    clientCode: "",
    clientId: 0,
  });

  useEffect(() => {
    const loginCheck = async () => {
      const response = await get<IUserMeta>("/login/meta", {});
      if (response && response.data.userId) {
        setIsAuthorized(true);
        setMeta(response.data);
      }
    };

    const searchParams = new URLSearchParams(window.location.search);

    let token = getToken();
    if (searchParams.has("token")) {
      token = searchParams.get("token") || "";
      const returnUrl = searchParams.get("returnUrl");

      localStorage.setItem("access-token", token);

      if (returnUrl) {
        if (isRunningOnLocalhost(returnUrl.toString() ?? "")) {
          window.location.href = `${returnUrl}?token=${token}`;
          return;
        } else {
          window.location.href = `${returnUrl}`;
          return;
        }
      } else {
        window.location.href = "/";
      }
    }

    if (!token && !searchParams.has("token")) {
      redirectToLogin();
    } else loginCheck();
  }, []);
  return (
    <AuthContext.Provider value={meta}>
      {isAuthorized ? children : <p>loading</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
