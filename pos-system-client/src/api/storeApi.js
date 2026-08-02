import axiosInstance from "./axios";

export const getAllStores = async () => {
  const response = await axiosInstance.get("/api/stores");
  return response.data;
};

// Get store by ID
export const getStoreById = async (id) => {
  const response = await axiosInstance.get(`/api/stores/${id}`);
  return response.data;
};

// Get logged-in admin's store
export const getStoreByAdmin = async () => {
  const response = await axiosInstance.get("/api/stores/admin");
  return response.data;
};

// Get logged-in employee's store
export const getStoreByEmployee = async () => {
  const response = await axiosInstance.get("/api/stores/employee");
  return response.data;
};

// Create store
export const createStore = async (storeData) => {
  const response = await axiosInstance.post("/api/stores", storeData);
  return response.data;
};

// Update store
export const updateStore = async (id, storeData) => {
  const response = await axiosInstance.put(
    `/api/stores/${id}`,
    storeData
  );
  return response.data;
};

// Moderate store
export const moderateStore = async (id, status) => {
  const response = await axiosInstance.put(
    `/api/stores/${id}/moderate?status=${status}`
  );
  return response.data;
};

// Delete store
export const deleteStore = async (id) => {
  const response = await axiosInstance.delete(`/api/stores/${id}`);
  return response.data;
};

export const getMyStore = async () => {
  const response = await axiosInstance.get("/api/stores/my-store");
  return response.data;
};

export const getStoreAdminsContact = async (storeId) => {
  const response = await axiosInstance.get(
    `/api/stores/${storeId}/admin-contact`
  );
  return response.data;
};