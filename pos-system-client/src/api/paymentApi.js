import api from "./axios";

const BASE_URL = "/api/payments";

const paymentApi = {
  getAllPayments: async () => {
    const res = await api.get(BASE_URL);
    return res.data;
  },
  getPaymentByOrderId: async (orderId) => {
    const res = await api.get(`${BASE_URL}/order/${orderId}`);
    return res.data;
  },
  createPayment: async (data) => {
    const res = await api.post(BASE_URL, data);
    return res.data;
  },
  deletePayment: async (id) => {
    const res = await api.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};

export default paymentApi;