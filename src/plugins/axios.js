import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE_URL,
  timeout: import.meta.env.VUE_APP_API_TIMEOUT,
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
});
// const token = localStorage.setItem("token", "J02w0cbz29XW1sO20sRgCxZSazhMKg0l");
// const token = "J02w0cbz29XW1sO20sRgCxZSazhMKg0l";
// api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${token}`;
//   config.withCredentials = true;
//   return config;
// });

export default api;
