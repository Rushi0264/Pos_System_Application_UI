import axiosInstance from "./axios";
/**
 * Create Customer
 */
export const createCustomer = async (customerData) => {
  const response = await axiosInstance.post(
    "/api/customers",
    customerData
  );

  return response.data;
};

/**
 * Update Customer
 */
export const updateCustomer = async (id, customerData) => {
  const response = await axiosInstance.put(
    `/api/customers/${id}`,
    customerData
  );

  return response.data;
};

/**
 * Delete Customer
 */
export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(
    `/api/customers/${id}`
  );

  return response.data;
};

/**
 * Get All Customers
 */
export const getAllCustomers = async () => {
  const response = await axiosInstance.get(
    "/api/customers"
  );

  return response.data;
};

/**
 * Search Customer
 */
export const searchCustomers = async (keyword) => {
  const response = await axiosInstance.get(
    "/api/customers/search",
    
    {
      
      params: {
        q: keyword,
      },
    }
  );

  return response.data;
};