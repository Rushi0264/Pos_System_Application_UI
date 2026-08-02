import { useEffect, useState } from "react";
import { Card, Descriptions, Spin, message } from "antd";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import supplierService from "../../services/supplierService";
import BackButton from "../../components/comman/BackButton";

const SupplierDetails = () => {
  const { id } = useParams();

  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = async () => {
    try {
      const data = await supplierService.getSupplierById(id);
      setSupplier(data);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load supplier."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  if (!supplier) {
    return (
      <MainLayout>
        <Card>No Supplier Found</Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
        <BackButton/>
      <Card title="Supplier Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{supplier.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{supplier.name}</Descriptions.Item>
          <Descriptions.Item label="Contact Person">
            {supplier.contactPerson}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">{supplier.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{supplier.email}</Descriptions.Item>
          <Descriptions.Item label="GST Number">
            {supplier.gstNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {supplier.address}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {supplier.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {supplier.updatedAt}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </MainLayout>
  );
};

export default SupplierDetails;