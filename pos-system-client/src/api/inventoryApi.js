import axiosInstance from "./axios";

// Get Inventory By Branch
export const getInventoryByBranch = async (branchId) => {

  const response =
    await axiosInstance.get(
      `/api/inventories/branch/${branchId}`
    );

  return response.data;
};

// Get All Inventory
export const getAllInventory = async () => {
  const response = await axiosInstance.get("/api/inventories");
  return response.data;
};

// Get Inventory By Id
export const getInventoryById = async (id) => {
  const response = await axiosInstance.get(`/api/inventories/${id}`);
  return response.data;
};

// Create Inventory
export const createInventory = async (data) => {
  const response = await axiosInstance.post("/api/inventories", data);
  return response.data;
};

// Update Inventory
export const updateInventory = async (id, data) => {
  const response = await axiosInstance.put(`/api/inventories/${id}`, data);
  return response.data;
};

// Delete Inventory
export const deleteInventory = async (id) => {
  const response = await axiosInstance.delete(`/api/inventories/${id}`);
  return response.data;
};

