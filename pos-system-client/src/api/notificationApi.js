import api from "./axios";

const BASE_URL = "/api/notifications";

const notificationApi = {
  getNotificationsByBranch: async (branchId) => {
    const res = await api.get(`${BASE_URL}/branch/${branchId}`);
    return res.data;
  },
  getNotificationsByStore: async (storeId) => {
    const res = await api.get(`${BASE_URL}/store/${storeId}`);
    return res.data;
  },
  markAsRead: async (id) => {
    const res = await api.put(`${BASE_URL}/${id}/read`);
    return res.data;
  },
};

export default notificationApi;