import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const api = {
  getDoctors: async ({ page, q }) => {
    return await instance.get("/doctors", {
      params: { page, q },
    });
  },
  getDoctorDetails: async ({ id }) => {
    return await instance.get(`/doctors/${id}`);
  },
  createReview: async ({ id, ...body }) => {
    return await instance.post(`/doctors/${id}/review`, {
      starts: body.starts,
      comment: body.comment,
      reviewer: {
        names: body.names,
        location_id: body.location_id,
      },
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
  createAppointment: async ({ id, ...body }) => {
    return await instance.post(`/doctors/${id}/appointment`, {
      type: body.type,
      date: body.date,
      name: body.name,
      pacient: {
        names: body.names,
        location_id: body.location_id,
      },
    });
  },
};
