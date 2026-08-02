import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ProductForm from "../../components/product/ProductForm";

import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import storeService from "../../services/storeService";
import BackButton from "../../components/comman/BackButton";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("pos_user") || "null");

  // Store Admin आणि Inventory Manager दोघांनाही फक्त स्वतःचाच स्टोअर हवा
  const isSingleStoreUser =
    currentUser?.role === "ROLE_STORE_ADMIN" ||
    currentUser?.role === "ROLE_INVENTORY_MANAGER";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (isSingleStoreUser) {
        const categoryData = await categoryService.getAllCategories();
        setCategories(categoryData);
      } else {
        const [categoryData, storeData] = await Promise.all([
          categoryService.getAllCategories(),
          storeService.getAllStores(),
        ]);

        setCategories(categoryData);
        setStores(storeData);
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Failed to load form data."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      const imagePath = await productService.uploadProductImage(file);
      setImageUrl(imagePath);
      message.success("Image uploaded successfully");

      if (onSuccess) {
        onSuccess(imagePath);
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Image upload failed"
      );

      if (onError) {
        onError(error);
      }
    }
  };

  const handleCreateProduct = async (values) => {
    try {
      setLoading(true);

      const finalData = {
        ...values,
        image: imageUrl,
      };

      await productService.createProduct(finalData);

      message.success("Product created successfully.");

      navigate("/products");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <BackButton/>
      <ProductForm
        categories={categories}
        stores={stores}
        loading={loading}
        submitText="Add Product"
        onSubmit={handleCreateProduct}
        handleImageUpload={handleImageUpload}
        imageUrl={imageUrl}
        isStoreAdmin={isSingleStoreUser}
        currentStoreId={currentUser?.storeId}
      />
    </MainLayout>
  );
};

export default AddProduct;