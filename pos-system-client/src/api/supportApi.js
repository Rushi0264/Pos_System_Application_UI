import axiosInstance from "./axios";

const contactSupport = async (data) => {
  const response = await axiosInstance.post(
    "/api/support/contact",
    data
  );

  return response.data;
};

export { contactSupport };