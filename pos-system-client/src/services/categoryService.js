import * as categoryApi from "../api/categoryApi";

const categoryService = {
  createCategory: categoryApi.createCategory,
  getAllCategories: categoryApi.getAllCategories,
  getCategoriesByStore: categoryApi.getCategoriesByStore,
  updateCategory: categoryApi.updateCategory,
  deleteCategory: categoryApi.deleteCategory,
  getCategoryById: categoryApi.getCategoryById,
};

export default categoryService;