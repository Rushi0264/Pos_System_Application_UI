import purchaseApi from "../api/purchaseApi";

const purchaseService = {

  getAllPurchases: () =>
    purchaseApi.getAllPurchases(),

  getPurchaseById: (id) =>
    purchaseApi.getPurchaseById(id),

  getPurchasesBySupplier: (supplierId) =>
    purchaseApi.getPurchasesBySupplier(supplierId),

  createPurchase: (data) =>
    purchaseApi.createPurchase(data),

  deletePurchase: (id) =>
    purchaseApi.deletePurchase(id),

};

export default purchaseService;