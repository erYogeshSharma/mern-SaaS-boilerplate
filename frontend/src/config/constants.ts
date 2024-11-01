export const isDev = true;
export const API_URL = isDev
  ? "http://localhost:8080/v1"
  : "https://api.example.com";

export const APP_CONFIG = {
  API_URL: isDev ? "http://localhost:3000/v1" : "https://api.example.com",
  APP_NAME: "My App",
};
