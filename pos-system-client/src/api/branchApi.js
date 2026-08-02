import axiosInstance from "./axios";

// Create Branch
export const createBranch = async (branchData) => {
  const response = await axiosInstance.post(
    "/api/branches",
    branchData
  );
  return response.data;
};

// Get Branch By Id
export const getBranchById = async (id) => {
  const response = await axiosInstance.get(
    `/api/branches/${id}`
  );
  return response.data;
};

// Get All Branches Of Store

export const getBranchesByStore = async (storeId) => {
  const response = await axiosInstance.get(
    `/api/branches/store/${storeId}`
  );
  return response.data;
};

// Update Branch
export const updateBranch = async (id, data) => {
  const response = await axiosInstance.put(
    `/api/branches/${id}`,
    data
  );
  return response.data;
};

// Delete Branch
export const deleteBranch = async (id) => {
  const response = await axiosInstance.delete(
    `/api/branches/${id}`
  );
  return response.data;
};

export const getAllBranches = async () => {
  const response = await axiosInstance.get("/api/branches");
  return response.data;
};