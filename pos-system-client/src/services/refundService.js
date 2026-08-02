import refundApi from "../api/refundApi";

const refundService = {
  getAllRefunds: () => refundApi.getAllRefunds(),
  getRefundById: (id) => refundApi.getRefundById(id),
  getRefundsByBranch: (branchId) => refundApi.getRefundsByBranch(branchId),
  getRefundsByCashier: (cashierId) => refundApi.getRefundsByCashier(cashierId),
  createRefund: (data) => refundApi.createRefund(data),
  updateRefundStatus: (id, status) => refundApi.updateRefundStatus(id, status),
};

export default refundService;