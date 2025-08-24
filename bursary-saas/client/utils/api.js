import axios from "axios";

const api = axios.create({
  baseURL: typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
    : "/api"
});

export default api;
