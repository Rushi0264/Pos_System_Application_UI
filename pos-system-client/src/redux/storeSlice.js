import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
  selectedStore: null,
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "store",

  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setStores: (state, action) => {
      state.stores = action.payload;
    },

    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },

    addStore: (state, action) => {
      state.stores.push(action.payload);
    },

    updateStoreInState: (state, action) => {
      state.stores = state.stores.map((store) =>
        store.id === action.payload.id ? action.payload : store
      );
    },

    removeStore: (state, action) => {
      state.stores = state.stores.filter(
        (store) => store.id !== action.payload
      );
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setStores,
  setSelectedStore,
  addStore,
  updateStoreInState,
  removeStore,
  setError,
} = storeSlice.actions;

export default storeSlice.reducer;