import * as productApi from "../api/productApi";


const productService = {

  createProduct: productApi.createProduct,

  getProductById: productApi.getProductById,

  getProductsByStoreId: productApi.getProductsByStoreId,

  getProductsByStore: productApi.getProductsByStore,

  getAllProducts: productApi.getAllProducts,

  updateProduct: productApi.updateProduct,

  searchProducts: productApi.searchProducts,

  deleteProduct: productApi.deleteProduct,

  uploadProductImage: productApi.uploadProductImage,

};


export default productService;