import api from "./axios";

const BASE_URL = "/api/payment-summary";

const paymentSummaryApi = {
  getSummaryByBranch: async (branchId) => {
    const res = await api.get(`${BASE_URL}/branch/${branchId}`);
    return res.data;
  },
};

export default paymentSummaryApi;