import axios from "axios";

const api = axios.create({
  baseURL: "https://librarymanagementsystem-backend-iea2.onrender.com",
  withCredentials: true, // send cookies (refresh token)
});

// Request interceptor: attach accessToken from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: auto refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {

    console.log("Interceptor caught error:", error.response?.status);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;

        console.log("new access token", newToken);

        localStorage.setItem("accessToken", newToken);

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest); // retry original request
      } catch (error) {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        window.location.href = "/login"; // force logout
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
