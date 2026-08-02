import api from "./axios";

const BASE_URL = "/api/purchases";

const purchaseApi = {

  getAllPurchases: async () => {
    const res = await api.get(BASE_URL);
    return res.data;
  },

  getPurchaseById: async (id) => {
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  },

  getPurchasesBySupplier: async (supplierId) => {
    const res = await api.get(`${BASE_URL}/supplier/${supplierId}`);
    return res.data;
  },

  createPurchase: async (data) => {
    const res = await api.post(BASE_URL, data);
    return res.data;
  },

  deletePurchase: async (id) => {
    const res = await api.delete(`${BASE_URL}/${id}`);
    return res.data;
  },

};

export default purchaseApi;