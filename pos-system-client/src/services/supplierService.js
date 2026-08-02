import supplierApi from "../api/supplierApi";

const supplierService = {

  getAllSuppliers: () =>
    supplierApi.getAllSuppliers(),

  getSupplierById: (id) =>
    supplierApi.getSupplierById(id),

  createSupplier: (data) =>
    supplierApi.createSupplier(data),

  updateSupplier: (id, data) =>
    supplierApi.updateSupplier(id, data),

  deleteSupplier: (id) =>
    supplierApi.deleteSupplier(id),

};

export default supplierService;