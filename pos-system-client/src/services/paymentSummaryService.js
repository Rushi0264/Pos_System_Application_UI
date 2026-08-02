import paymentSummaryApi from "../api/paymentSummaryApi";

const paymentSummaryService = {
  getSummaryByBranch: (branchId) =>
    paymentSummaryApi.getSummaryByBranch(branchId),
};

export default paymentSummaryService;