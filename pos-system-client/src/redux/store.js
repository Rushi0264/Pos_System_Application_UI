import { configureStore } from "@reduxjs/toolkit";
import branchReducer from "./branchSlice";
import categoryReducer from "./categorySlice";

import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import storeReducer from "./storeSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    store: storeReducer,
    branch: branchReducer,
    category: categoryReducer,
    product: productReducer,
    
  },
});