import axios from "axios";
import { API_URL } from "../config/constants";

const API = axios.create({
  baseURL: API_URL,
});

export function get_token(
  type: "accessToken" | "refreshToken"
): string | undefined {
  const tokenSerial = localStorage.getItem("tokens");

  const tokenJSON: Tokens | null = tokenSerial ? JSON.parse(tokenSerial) : null;

  const token = tokenJSON?.[type] as string;
  return token;
}

API.interceptors.request.use((req) => {
  const token = get_token("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers["ngrok-skip-browser-warning"] = "true";
  }

  return req;
});

API.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.data.statusCode === "10003") {
      localStorage.clear();
      window.location.href = "/";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data);
  }
);

/* -------------------------------------------------------------------------- */
/*                                AUTH ROUTEṢ                                */
/* -------------------------------------------------------------------------- */
export const sign_up = (form: SignUpForm) => API.post("/auth/register", form);
export const sing_in = (form: SignInForm) => API.post("/auth/login", form);
export const forgot_password = (form: ForgotPasswordForm) =>
  API.post("/auth/forgot-password", form);
export const reset_password = (form: ResetPasswordForm) =>
  API.post("/auth/reset-password", form);
export const log_out = () =>
  API.post("/auth/logout", { refreshToken: get_token("refreshToken") });
