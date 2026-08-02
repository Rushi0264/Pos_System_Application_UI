import axiosInstance from "./axios";

export const loginApi = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const signupApi = async (data) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const registerStoreApi = async (data) => {
  const response = await axiosInstance.post("/auth/register-store", data);
  return response.data;
};