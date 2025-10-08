import axios from "axios";

const API_BASE = "https://fotoyu-backend-production.up.railway.app/api";

export const getLocations = async () => axios.get(`${API_BASE}/locations`);
export const addLocation = async (data: any) =>
  axios.post(`${API_BASE}/locations`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
