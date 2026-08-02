import * as customerApi from "../api/customerApi";

/**
 * Create Customer
 */
export const createCustomer = async (customerData) => {
  return await customerApi.createCustomer(customerData);
};

/**
 * Update Customer
 */
export const updateCustomer = async (id, customerData) => {
  return await customerApi.updateCustomer(id, customerData);
};

/**
 * Delete Customer
 */
export const deleteCustomer = async (id) => {
  return await customerApi.deleteCustomer(id);
};

/**
 * Get All Customers
 */
export const getAllCustomers = async () => {
  return await customerApi.getAllCustomers();
};

/**
 * Search Customers
 */
export const searchCustomers = async (keyword) => {
  return await customerApi.searchCustomers(keyword);
};