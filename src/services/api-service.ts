import axios, { AxiosError } from "axios";
import { getToken, redirectToLogin } from "../helper/apiHelper";

let baseUrl = "";

if (process.env.NODE_ENV === "development")
  baseUrl = "http://168.119.14.23:8002";

const instance = axios.create({
  baseURL: `${baseUrl}/api`,
});

instance.interceptors.request.use(function (config) {
  const accessToken = getToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    switch (error.response?.status) {
      case 401: {
        return redirectToLogin();
      }
      case 500: {
        return "Something went wrong";
      }
      default:
        return error;
    }
  }
);

export const get = async <T>(
  url: string,
  headers?: Record<string, string>,
  onError?: (error: AxiosError) => void
) => {
  const res = await instance.get<T>(url, headers).catch((err) => {
    if (onError) onError(err);
  });
  if (res) {
    return res;
  }
};

export const post = async (
  url: string,
  body: {},
  headers?: Record<string, string>,
  onError?: (error: AxiosError) => void
) => {
  try {
    const res = await instance.post(url, body, headers);
    if (res.status >= 200 || res.status <= 300) {
      return res;
    } else throw res;
  } catch (err) {
    if (onError) {
      onError((err as AxiosError<any>)?.response?.data.message);
    }
  }
};

export const put = async (
  url: string,
  body: {},
  headers?: Record<string, string>,
  onError?: (error: AxiosError) => void
) => {
  try {
    const res = await instance.put(url, body, headers);

    if (res.status >= 200 || res.status <= 300) {
      return res;
    } else throw res;
  } catch (err) {
    if (onError) {
      onError((err as AxiosError<any>)?.response?.data.message);
    }
  }
};

export const del = async (
  url: string,
  headers?: Record<string, string>,
  onError?: (error: AxiosError) => void
) => {
  try {
    const res = await instance.delete(url, headers);

    if (res.status >= 200 || res.status <= 300) {
      return res;
    } else throw res;
  } catch (err) {
    if (onError) {
      onError((err as AxiosError<any>)?.response?.data.message);
    }
  }
};

export { baseUrl };
export default instance;
