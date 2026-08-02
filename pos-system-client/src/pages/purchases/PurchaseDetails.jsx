import { useEffect, useState } from "react";
import { Card, Descriptions, Spin, Table, Tag, message } from "antd";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import purchaseService from "../../services/purchaseService";
import BackButton from "../../components/comman/BackButton";

const PurchaseDetails = () => {
  const { id } = useParams();

  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchase();
  }, []);

  const loadPurchase = async () => {
    try {
      const data = await purchaseService.getPurchaseById(id);
      setPurchase(data);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load purchase."
      );
    } finally {
      setLoading(false);
    }
  };

  const itemColumns = [
    { title: "Product", dataIndex: ["product", "name"] },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Purchase Price", dataIndex: "purchasePrice" },
    { title: "Total Price", dataIndex: "totalPrice" },
  ];

  if (loading) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  if (!purchase) {
    return (
      <MainLayout>
        <Card>No Purchase Found</Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
        <BackButton/>
      <Card title="Purchase Details" style={{ marginBottom: 20 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Invoice Number">
            {purchase.invoiceNumber}
          </Descriptions.Item>

          <Descriptions.Item label="Supplier">
            {purchase.supplier?.name}
          </Descriptions.Item>

          <Descriptions.Item label="Branch">
            {purchase.branch?.name}
          </Descriptions.Item>

          <Descriptions.Item label="Payment Type">
            <Tag color="green">{purchase.paymentType}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Total Amount">
            ₹{purchase.totalAmount}
          </Descriptions.Item>

          <Descriptions.Item label="Created By">
            {purchase.createdBy?.fullName}
          </Descriptions.Item>

          <Descriptions.Item label="Remarks" span={2}>
            {purchase.remarks}
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {purchase.createdAt}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Purchase Items">
        <Table
          rowKey="id"
          columns={itemColumns}
          dataSource={purchase.items}
          pagination={false}
        />
      </Card>
    </MainLayout>
  );
};

export default PurchaseDetails;