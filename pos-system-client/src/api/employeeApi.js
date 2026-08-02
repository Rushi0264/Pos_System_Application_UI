import api from "./axios";

const BASE_URL = "/api/users";

const employeeApi = {

  getEmployeesByStore: async (storeId) => {
    const res = await api.get(`${BASE_URL}/store/${storeId}`);
    return res.data;
  },

    getAllEmployees: async () => {
    const res = await api.get(`${BASE_URL}`);
    return res.data;
  },

  createEmployee: async (data) => {
    const res = await api.post(`${BASE_URL}/employee`, data);
    return res.data;
  },

  updateEmployee: async (id, data) => {
    const res = await api.put(`${BASE_URL}/employee/${id}`, data);
    return res.data;
  },

  deleteEmployee: async (id) => {
    const res = await api.delete(`${BASE_URL}/employee/${id}`);
    return res.data;
  },

  getEmployeeById: async (id) => {
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  }

};

export default employeeApi;