import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    updateProductInState: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id
          ? action.payload
          : product
      );
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearProducts: (state) => {
      state.products = [];
      state.selectedProduct = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setSelectedProduct,
  addProduct,
  updateProductInState,
  removeProduct,
  setError,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;