import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branches: [],
  selectedBranch: null,
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "branch",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setBranches(state, action) {
      state.branches = action.payload;
    },

    setSelectedBranch(state, action) {
      state.selectedBranch = action.payload;
    },

    addBranch(state, action) {
      state.branches.push(action.payload);
    },

    updateBranchInState(state, action) {
      state.branches = state.branches.map((branch) =>
        branch.id === action.payload.id
          ? action.payload
          : branch
      );
    },

    removeBranch(state, action) {
      state.branches = state.branches.filter(
        (branch) => branch.id !== action.payload
      );
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setBranches,
  setSelectedBranch,
  addBranch,
  updateBranchInState,
  removeBranch,
  setError,
} = branchSlice.actions;

export default branchSlice.reducer;