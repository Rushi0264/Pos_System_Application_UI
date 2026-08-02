import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ProductForm from "../../components/product/ProductForm";

import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import storeService from "../../services/storeService";
import BackButton from "../../components/comman/BackButton";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [productData, categoryData, storeData] =
        await Promise.all([
          productService.getProductById(id),
          categoryService.getAllCategories(),
          storeService.getAllStores(),
        ]);

      setProduct({
        ...productData,
        categoryId: productData.category?.id,
      });

      setCategories(categoryData);
      setStores(storeData);
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Failed to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true);

      await productService.updateProduct(id, values);

      message.success("Product updated successfully.");

      navigate("/products");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Update failed."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <BackButton/>
      <ProductForm
        initialValues={product}
        categories={categories}
        stores={stores}
        loading={loading}
        submitText="Update Product"
        onSubmit={handleUpdate}
      />
    </MainLayout>
  );
};

export default EditProduct;