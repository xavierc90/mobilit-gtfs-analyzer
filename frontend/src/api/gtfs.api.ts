import axios from "axios";

export const gtfsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});