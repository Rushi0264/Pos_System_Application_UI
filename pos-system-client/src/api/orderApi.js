import axiosInstance from "./axios";

const BASE_URL = "/api/orders";

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post(BASE_URL, orderData);
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await axiosInstance.put(
    `${BASE_URL}/${id}/status`,
    null,
    {
      params: { status },
    }
  );

  return response.data;
};

export const getOrdersByBranch = async (
  branchId,
  customerId,
  cashierId,
  paymentType,
  status
) => {

  const params = {};

  if (customerId) params.customerId = customerId;
  if (cashierId) params.cashierId = cashierId;
  if (paymentType) params.paymentType = paymentType;
  if (status) params.status = status;


  const response = await axiosInstance.get(
    `${BASE_URL}/branch/${branchId}`,
    { params }
  );

  return response.data;
};

export const getOrdersByCustomer = async (customerId) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/customer/${customerId}`
  );
  return response.data;
};

export const getOrdersByCashier = async (cashierId) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/cashier/${cashierId}`
  );
  return response.data;
};

export const getTodayOrders = async (branchId) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/today/branch/${branchId}`
  );
  return response.data;
};

export const getRecentOrders = async (branchId) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/recent/${branchId}`
  );
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const downloadInvoice = async (id) => {

  const response = await axiosInstance.get(
    `${BASE_URL}/${id}/invoice`,
    {
      responseType: "blob",
    }
  );


  const blob = new Blob(
    [response.data],
    {
      type: "application/pdf",
    }
  );


  const url = window.URL.createObjectURL(blob);


  const link = document.createElement("a");

  link.href = url;

  link.download = `invoice-${id}.pdf`;

  document.body.appendChild(link);

  link.click();


  link.remove();

  window.URL.revokeObjectURL(url);

};

export const getAllOrders = async (
  customerId,
  cashierId,
  paymentType,
  status
) => {

  const params = {};

  if (customerId) params.customerId = customerId;
  if (cashierId) params.cashierId = cashierId;
  if (paymentType) params.paymentType = paymentType;
  if (status) params.status = status;

  const response = await axiosInstance.get(BASE_URL, { params });

  return response.data;
};