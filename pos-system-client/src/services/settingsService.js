import {
  getProfileApi,
  updateUserApi,
} from "../api/userApi";

import { getMyStore, updateStore } from "../api/storeApi";

const settingsService = {
  getProfile: () => getProfileApi(),
  updateProfile: (id, data) => updateUserApi(id, data),
  getMyStore: () => getMyStore(),
  updateStoreSettings: (id, data) => updateStore(id, data),
};

export default settingsService;