import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (e) => Promise.reject(e)
);

api.interceptors.response.use(
  (res) => res,
  (e) => {
    alert(e.response?.data?.message || "Couldn't connect to server!");
    return Promise.reject(e);
  }
);

export default api;
