import { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Tag,
  Spin,
  message,
  Button,
  Space,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/comman/BackButton";

import MainLayout from "../../layouts/MainLayout";
import storeService from "../../services/storeService";
import { storage } from "../../utils/storage";

const StoreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = storage.getUser();
  const isSuperAdmin = currentUser?.role === "ROLE_SUPER_ADMIN";

  useEffect(() => {
    loadStore();
  }, []);

  const loadStore = async () => {
    try {
      const data = await storeService.getStoreById(id);
      setStore(data);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load store."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (!store) {
    return (
      <MainLayout>
        <Card>No Store Found.</Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Card title="Store Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Store ID">
            {store.id}
          </Descriptions.Item>

          <Descriptions.Item label="Brand">
            {store.brand}
          </Descriptions.Item>

          <Descriptions.Item label="Store Type">
            {store.storeType}
          </Descriptions.Item>

          <Descriptions.Item label="Description">
            {store.description}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag color={store.status === "ACTIVE" ? "green" : "red"}>
              {store.status}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Address">
            {store.contact?.address || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Phone">
            {store.contact?.phone || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {store.contact?.email || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {store.createdAt}
          </Descriptions.Item>

          <Descriptions.Item label="Updated At">
            {store.updatedAt}
          </Descriptions.Item>
        </Descriptions>

        <Space wrap style={{ marginTop: 24 }}>
          {!isSuperAdmin && (
            <>
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/stores/${store.id}/branches`)
                }
              >
                Manage Branches
              </Button>

              <Button
                onClick={() => navigate("/employees")}
              >
                Manage Employees
              </Button>

              <Button
                onClick={() => navigate("/products")}
              >
                Manage Products
              </Button>

              <Button
                onClick={() => navigate("/categories")}
              >
                Manage Categories
              </Button>
            </>
          )}

          <Button
            onClick={() => navigate("/stores")}
          >
            Back to Stores
          </Button>
        </Space>
      </Card>
    </MainLayout>
  );
};

export default StoreDetails;