import api from "./axios";

const BASE_URL = "/api/shift-reports";

const shiftReportApi = {
  startShift: async () => {
    const res = await api.post(`${BASE_URL}/start`);
    return res.data;
  },
  endShift: async () => {
    const res = await api.patch(`${BASE_URL}/end`);
    return res.data;
  },
  getCurrentShiftProgress: async () => {
    const res = await api.get(`${BASE_URL}/current`);
    return res.data;
  },
  getShiftReportById: async (id) => {
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  },
  getShiftReportsByBranch: async (branchId) => {
    const res = await api.get(`${BASE_URL}/branch/${branchId}`);
    return res.data;
  },
  getShiftReportsByCashier: async (cashierId) => {
    const res = await api.get(`${BASE_URL}/cashier/${cashierId}`);
    return res.data;
  },

  getShiftReportsByStore: async (storeId) => {
    const res = await api.get(`${BASE_URL}/store/${storeId}`);
    return res.data;
  },

};

export default shiftReportApi;