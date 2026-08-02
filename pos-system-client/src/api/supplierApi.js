import api from "./axios";

const BASE_URL = "/api/suppliers";

const supplierApi = {

  getAllSuppliers: async () => {
    const res = await api.get(BASE_URL);
    return res.data;
  },

  getSupplierById: async (id) => {
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  },

  createSupplier: async (data) => {
    const res = await api.post(BASE_URL, data);
    return res.data;
  },

  updateSupplier: async (id, data) => {
    const res = await api.put(`${BASE_URL}/${id}`, data);
    return res.data;
  },

  deleteSupplier: async (id) => {
    const res = await api.delete(`${BASE_URL}/${id}`);
    return res.data;
  },

};

export default supplierApi;