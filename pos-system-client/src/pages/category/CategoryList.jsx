import { useEffect, useMemo, useState } from "react";
import { Button, Card, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import CategoryTable from "../../components/category/CategoryTable";
import CategorySearch from "../../components/category/CategorySearch";
import DeleteCategoryModal from "../../components/category/DeleteCategoryModal";
import CategoryStats from "../../components/category/CategoryStats";

import categoryService from "../../services/categoryService";

const CategoryList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await categoryService.getAllCategories();

      // If your backend returns { success, message, data }
      setCategories(data.data || data);

    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await categoryService.deleteCategory(selectedId);

      message.success("Category deleted successfully.");

      fetchCategories();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Delete failed."
      );
    }

    setDeleteOpen(false);
  };

  return (
    <MainLayout>
      <Card
        title="Category Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/categories/create")}
          >
            Add Category
          </Button>
        }
      >
        <CategoryStats categories={filteredCategories} />

        <CategorySearch
          search={search}
          setSearch={setSearch}
        />

<CategoryTable
  categories={filteredCategories}
  loading={loading}
  onView={(id) => navigate(`/categories/${id}`)}
  onEdit={(id) => navigate(`/categories/edit/${id}`)}
  onDelete={handleDelete}
/>

        <DeleteCategoryModal
          open={deleteOpen}
          loading={loading}
          onOk={confirmDelete}
          onCancel={() => setDeleteOpen(false)}
        />
      </Card>
    </MainLayout>
  );
};

export default CategoryList;