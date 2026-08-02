import api from "./axios";

const BASE_URL = "/api/refunds";

const refundApi = {
  getAllRefunds: async () => {
    const res = await api.get(BASE_URL);
    return res.data;
  },
  getRefundById: async (id) => {
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  },
  getRefundsByBranch: async (branchId) => {
    const res = await api.get(`${BASE_URL}/branch/${branchId}`);
    return res.data;
  },
  getRefundsByCashier: async (cashierId) => {
    const res = await api.get(`${BASE_URL}/cashier/${cashierId}`);
    return res.data;
  },
  createRefund: async (data) => {
    const res = await api.post(BASE_URL, data);
    return res.data;
  },
    updateRefundStatus: async (id, status) => {
    const res = await api.put(
      `${BASE_URL}/${id}/status`,
      null,
      { params: { status } }
    );
    return res.data;
  },
};

export default refundApi;