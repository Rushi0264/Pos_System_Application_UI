import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setCategories(state, action) {
      state.categories = action.payload;
    },

    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },

    addCategory(state, action) {
      state.categories.push(action.payload);
    },

    updateCategoryInState(state, action) {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id
          ? action.payload
          : category
      );
    },

    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setCategories,
  setSelectedCategory,
  addCategory,
  updateCategoryInState,
  removeCategory,
  setError,
} = categorySlice.actions;

export default categorySlice.reducer;