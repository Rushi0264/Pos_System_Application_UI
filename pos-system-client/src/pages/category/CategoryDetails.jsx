import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Skeleton,
  Space,
  Tag,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import categoryService from "../../services/categoryService";

const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCategory = async () => {
    try {
      setLoading(true);

      // Recommended backend endpoint:
      // GET /api/categories/{id}
      if (categoryService.getCategoryById) {
        const data = await categoryService.getCategoryById(id);
        setCategory(data.data || data);
      } else {
        message.warning(
          "Backend endpoint GET /api/categories/{id} is not available."
        );
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Unable to load category."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Card>
          <Skeleton active />
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Card
        title="Category Details"
        extra={
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() =>
                navigate(`/categories/edit/${id}`)
              }
            >
              Edit
            </Button>
          </Space>
        }
      >
        <Descriptions
          bordered
          column={1}
          size="middle"
        >
          <Descriptions.Item label="Category ID">
            {category?.id}
          </Descriptions.Item>

          <Descriptions.Item label="Category Name">
            <Tag color="blue">{category?.name}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Store ID">
            {category?.storeId}
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {category?.createdAt || "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Updated At">
            {category?.updatedAt || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </MainLayout>
  );
};

export default CategoryDetails;