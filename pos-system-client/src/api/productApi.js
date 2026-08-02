import axiosInstance from "./axios";

/**
 * Create Product
 */
export const createProduct = async (productData) => {
  const response = await axiosInstance.post(
    "/api/products",
    productData
  );

  return response.data;
};

/**
 * Get Product By ID
 */
export const getProductById = async (id) => {
  const response = await axiosInstance.get(
    `/api/products/${id}`
  );

  return response.data;
};

/**
 * Get Products By Store
 */
export const getProductsByStoreId = async (storeId) => {
  const response = await axiosInstance.get(
    `/api/products/store/${storeId}`
  );

  return response.data;
};

/**
 * Update Product
 */
export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.patch(
    `/api/products/${id}`,
    productData
  );

  return response.data;
};

/**
 * Search Products
 */
export const searchProducts = async (storeId, keyword) => {
  const response = await axiosInstance.get(
    `/api/products/store/${storeId}/search`,
    {
      params: {
        keyword,
      },
    }
  );

  return response.data;
};

/**
 * Delete Product
 */
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(
    `/api/products/${id}`
  );

  return response.data;
};

/**
 * Upload Product Image
 */
export const uploadProductImage = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await axiosInstance.post(
    "/api/products/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const getProductsByStore = async(storeId)=>{
    const response = await axiosInstance.get(
        `/api/products/store/${storeId}`
    );

    return response.data;
};

export const getAllProducts = async () => {
    const response = await axiosInstance.get("/api/products");
    return response.data;
};