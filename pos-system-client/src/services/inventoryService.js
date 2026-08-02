import * as inventoryApi from "../api/inventoryApi";

const inventoryService = {
  getAllInventory: inventoryApi.getAllInventory,

  getInventoryById: inventoryApi.getInventoryById,

  createInventory: inventoryApi.createInventory,

  updateInventory: inventoryApi.updateInventory,

  deleteInventory: inventoryApi.deleteInventory,
  getInventoryByBranch: inventoryApi.getInventoryByBranch,


  
};

export default inventoryService;