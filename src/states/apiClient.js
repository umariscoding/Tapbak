import axios from "axios";
import { baseUrl } from "./constants";

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;