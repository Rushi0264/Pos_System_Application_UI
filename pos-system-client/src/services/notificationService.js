import notificationApi from "../api/notificationApi";

const notificationService = {
  getNotificationsByBranch: (branchId) =>
    notificationApi.getNotificationsByBranch(branchId),
  getNotificationsByStore: (storeId) =>
    notificationApi.getNotificationsByStore(storeId),
  markAsRead: (id) => notificationApi.markAsRead(id),
};

export default notificationService;