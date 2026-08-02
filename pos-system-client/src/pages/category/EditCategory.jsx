import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import CategoryForm from "./CategoryForm";
import categoryService from "../../services/categoryService";
import BackButton from "../../components/comman/BackButton";

const EditCategory = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState(null);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      setLoading(true);

      // Backend currently has no GET /categories/{id}
      // Replace this when you add the endpoint.
      const categories =
        await categoryService.getCategoriesByStore(1);

      const found = categories.find(
        (c) => c.id === Number(id)
      );

      setCategory(found);
    } catch (error) {
      message.error("Unable to load category.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      await categoryService.updateCategory(id, values);

      message.success("Category updated successfully.");

      navigate(-1);
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Update failed."
      );
    }
  };

  if (loading && !category)
    return (
      <MainLayout>
        <Spin />
      </MainLayout>
    );

  return (
    <MainLayout>
      <BackButton/>
      <CategoryForm
        initialValues={category}
        submitText="Update Category"
        onSubmit={handleUpdate}
      />
    </MainLayout>
  );
};

export default EditCategory;