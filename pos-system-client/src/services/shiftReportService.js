import shiftReportApi from "../api/shiftReportApi";

const shiftReportService = {
  startShift: () => shiftReportApi.startShift(),
  endShift: () => shiftReportApi.endShift(),
  getCurrentShiftProgress: () => shiftReportApi.getCurrentShiftProgress(),
  getShiftReportById: (id) => shiftReportApi.getShiftReportById(id),
  getShiftReportsByBranch: (branchId) =>
    shiftReportApi.getShiftReportsByBranch(branchId),
  getShiftReportsByStore: (storeId) =>
    shiftReportApi.getShiftReportsByStore(storeId),
  getShiftReportsByCashier: (cashierId) =>
    shiftReportApi.getShiftReportsByCashier(cashierId),
};

export default shiftReportService;