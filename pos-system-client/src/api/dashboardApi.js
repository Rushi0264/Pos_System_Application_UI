import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("pos_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getDashboardStats = async () => {
  const res = await API.get("/dashboard/stats");
  return res.data;
};

export const getSalesReport = async () => {
  const res = await API.get("/dashboard/sales");
  return res.data;
};

export const getRecentOrders = async () => {
  const res = await API.get("/dashboard/recent-orders");  
  return res.data;
};

export const getLowStockProducts = async () => {
  const res = await API.get("/dashboard/low-stock");
  return res.data;
};
export const getMonthlySales = async () => {
  const res = await API.get("/dashboard/monthly-sales");
  return res.data;
};

export const getSuperAdminDashboard = async () => {
  const res = await API.get("/dashboard/super-admin");
  return res.data;
};


export const getRecentActivity = async () => {
  const res = await API.get("/dashboard/recent-activity");
  return res.data;
};



export const getPaymentMethods = async () => {
  const res = await API.get("/dashboard/payment-methods");
  return res.data;
};

export const getInventoryManagerStats = async () => {
  const res = await API.get("/dashboard/inventory-manager-stats");
  return res.data;
};

export const getRecentStockActivity = async () => {
  const res = await API.get("/dashboard/recent-stock-activity");
  return res.data;
};

export const getAccountantStats = async () => {
  const res = await API.get("/dashboard/accountant-stats");
  return res.data;
};

export const getRecentStores = async () => {
  const res = await API.get("/dashboard/super-admin/recent-stores");
  return res.data;
};

export const getStoreGrowth = async () => {
  const res = await API.get("/dashboard/super-admin/store-growth");
  return res.data;
};

export const getStoreStatusBreakdown = async () => {
  const res = await API.get("/dashboard/super-admin/store-status");
  return res.data;
};