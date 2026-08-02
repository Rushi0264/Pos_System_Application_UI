import * as storeApi from "../api/storeApi";

const storeService = {
  getAllStores: storeApi.getAllStores,
  getStoreById: storeApi.getStoreById,
  getStoreByAdmin: storeApi.getStoreByAdmin,
  getStoreByEmployee: storeApi.getStoreByEmployee,
  createStore: storeApi.createStore,
  updateStore: storeApi.updateStore,
  moderateStore: storeApi.moderateStore,
  deleteStore: storeApi.deleteStore,
  getMyStore: storeApi.getMyStore,
   getStoreAdminsContact: storeApi.getStoreAdminsContact,
};

export default storeService;