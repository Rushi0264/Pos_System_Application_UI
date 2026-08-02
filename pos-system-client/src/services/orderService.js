import * as orderApi from "../api/orderApi";

export const createOrder = async (orderData) => {
  try {
    return await orderApi.createOrder(orderData);
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to create order"
    );
  }
};

export const getOrderById = async (id) => {
  try {
    return await orderApi.getOrderById(id);
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to fetch order"
    );
  }
};

export const updateOrderStatus = async (id, status) => {
  const response = await orderApi.updateOrderStatus(id, status);
  return response.data;
};

export const getOrdersByBranch = async (
  branchId,
  customerId,
  cashierId,
  paymentType,
  status
) => {
  try {
    return await orderApi.getOrdersByBranch(
      branchId,
      customerId,
      cashierId,
      paymentType,
      status
    );
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to fetch orders"
    );
  }
};

export const getOrdersByCustomer = async (customerId) => {
  try {
    return await orderApi.getOrdersByCustomer(customerId);
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to fetch customer orders"
    );
  }
};

export const getOrdersByCashier = async (cashierId) => {
  try {
    return await orderApi.getOrdersByCashier(cashierId);
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to fetch cashier orders"
    );
  }
};

export const getTodayOrders = async (branchId) => {
  try {
    return await orderApi.getTodayOrders(branchId);
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to fetch today's orders"
    );
  }
};

export const getRecentOrders = async (branchId) => {
  try {
    return await orderApi.getRecentOrders(branchId);
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to fetch recent orders"
    );
  }
};

export const deleteOrder = async (id) => {
  try {
    return await orderApi.deleteOrder(id);
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to delete order"
    );
  }
};

export const downloadInvoice = async (id) => {
  try {
    return await orderApi.downloadInvoice(id);
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to download invoice"
    );
  }
};
export const getAllOrders = async (
  customerId,
  cashierId,
  paymentType,
  status
) => {
  try {
    return await orderApi.getAllOrders(
      customerId,
      cashierId,
      paymentType,
      status
    );
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to fetch orders"
    );
  }
};