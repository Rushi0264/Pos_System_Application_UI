import axiosInstance from "./axios";

export const getUsersApi = async () => {
  const response = await axiosInstance.get("/api/users");
  return response.data;
};

export const getUserByIdApi = async (id) => {
  const response = await axiosInstance.get(`/api/users/${id}`);
  return response.data;
};

export const createUserApi = async (data) => {
  const response = await axiosInstance.post("/api/users", data);
  return response.data;
};

export const updateUserApi = async (id, data) => {
  const response = await axiosInstance.put(`/api/users/${id}`, data);
  return response.data;
};

export const deleteUserApi = async (id) => {
  const response = await axiosInstance.delete(`/api/users/${id}`);
  return response.data;
};

// =====================
// USERS BY ROLE
// =====================

export const getUsersByRoleApi = async (role) => {
  const response = await axiosInstance.get(`/api/users/role/${role}`);
  return response.data;
};

export const getProfileApi = async () => {
  const response = await axiosInstance.get("/api/users/profile");
  return response.data;
};