import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const api = {
  getDoctors: async ({ page }) => {
    return await instance.get("/doctors", {
      params: { page },
    });
  },
  getDoctorDetails: async ({ id }) => {
    return await instance.get(`/doctors/${id}`);
  },
  createReview: async ({ doctor, user_id, comment, starts }) => {
    return await instance.post(`/doctors/${doctor}/review`, {
      user_id,
      comment,
      starts,
    });
  },
  getLocations: async () => {
    return await instance.get(`/locations`);
  },
  createUser: async ({ location_id, names }) => {
    return await instance.post("/users", {
      location_id,
      names,
    });
  },
};
