import axios from "axios";
import { baseUrl } from "./constants";

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 12331
    },
});

// Add a request interceptor to include the token dynamically
apiClient.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;