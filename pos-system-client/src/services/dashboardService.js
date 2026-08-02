import {
  getDashboardStats,
  getSalesReport,
  getRecentOrders,
  getLowStockProducts,
  getMonthlySales,
  getSuperAdminDashboard,
  getPaymentMethods,
  getRecentActivity,
  getRecentStores,
  getStoreGrowth,
  getStoreStatusBreakdown,
} from "../api/dashboardApi";

const dashboardService = {
  getDashboardStats,
  getSalesReport,
  getRecentOrders,
  getLowStockProducts,
  getMonthlySales,
  getSuperAdminDashboard,
  getPaymentMethods,
  getRecentActivity,
  getRecentStores,
  getStoreGrowth,
  getStoreStatusBreakdown,
};

export default dashboardService;