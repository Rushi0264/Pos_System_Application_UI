import axiosInstance from "../api/axios";
const transferStockToBranch = async ({
  storeId,
  branchId,
  productId,
  quantity,
}) => {
  const { data } = await axiosInstance.post(
    "/api/stock-movements/transfer",
    null,
    {
      params: {
        storeId,
        branchId,
        productId,
        quantity,
      },
    }
  );

  return data;
};

const getStoreStock = async (storeId, productId) => {
  const { data } = await axiosInstance.get(
    `/api/stock-movements/store/${storeId}/product/${productId}`
  );

  return data;
};

export default {
  transferStockToBranch,
  getStoreStock,
};