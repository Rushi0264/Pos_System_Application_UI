import { message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import CategoryForm from "./CategoryForm";
import categoryService from "../../services/categoryService";
import BackButton from "../../components/comman/BackButton";

const CreateCategory = () => {
  const navigate = useNavigate();

  const handleCreate = async (values) => {
    try {
      await categoryService.createCategory(values);

      message.success("Category created successfully.");

      navigate("/categories");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Unable to create category."
      );
    }
  };

  return (
    <MainLayout>
      <BackButton/>
      <CategoryForm
        submitText="Create Category"
        onSubmit={handleCreate}
      />
    </MainLayout>
  );
};

export default CreateCategory;