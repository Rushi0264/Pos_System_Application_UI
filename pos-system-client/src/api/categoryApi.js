import axiosInstance from "./axios";

export const createCategory = async (data) => {
  const response = await axiosInstance.post("/api/categories", data);
  return response.data;
};

export const getCategoryById = async (id) => {
    const response = await axiosInstance.get(`/api/categories/${id}`);
    return response.data;
};

export const getAllCategories = async () => {
  const response = await axiosInstance.get("/api/categories");
  return response.data;
};

export const getCategoriesByStore = async (storeId) => {
  const response = await axiosInstance.get(`/api/categories/store/${storeId}`);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await axiosInstance.put(`/api/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/api/categories/${id}`);
  return response.data;
};
