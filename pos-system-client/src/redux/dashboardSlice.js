import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {},
  sales: [],
  recentOrders: [],
  lowStock: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setDashboardData: (state, action) => {
      state.stats = action.payload.stats;
      state.sales = action.payload.sales;
      state.recentOrders = action.payload.orders;
      state.lowStock = action.payload.lowStock;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setDashboardData,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;