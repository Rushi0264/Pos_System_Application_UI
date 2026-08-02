import { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Table,
  Spin,
  message,
 Tag,
} from "antd";
import { useParams } from "react-router-dom";

import { getOrderById } from "../../services/orderService";
import BackButton from "../../components/comman/BackButton";
import MainLayout from "../../layouts/MainLayout";

const OrderDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err) {
      message.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" />;

  if (!order) return null;

  const columns = [
  {
    title: "Product",
    dataIndex: "productName",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    align: "center",
  },
  {
    title: "Price",
    dataIndex: "price",
    align: "right",
    render: (price) => `₹${price.toLocaleString()}`,
  },
  {
    title: "Subtotal",
    align: "right",
    render: (_, record) =>
      `₹${(record.price * record.quantity).toLocaleString()}`,
  },
];

  return (
<MainLayout>
  <BackButton/>
  <Card title={`Order #${order.id}`}>
    <Descriptions bordered column={2}>

      <Descriptions.Item label="Order ID">
        {order.id}
      </Descriptions.Item>

      <Descriptions.Item label="Status">
        <Tag
          color={
            order.status === "COMPLETED"
              ? "green"
              : order.status === "CREATED"
              ? "blue"
              : order.status === "CANCELLED"
              ? "red"
              : "orange"
          }
        >
          {order.status}
        </Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Payment Type">
        {order.paymentType}
      </Descriptions.Item>

      <Descriptions.Item label="Subtotal">
        ₹{order.subtotal?.toLocaleString()}
      </Descriptions.Item>

      <Descriptions.Item label="Tax">
        ₹{order.taxAmount?.toLocaleString()}
      </Descriptions.Item>

      <Descriptions.Item label="Discount">
        ₹{order.discountAmount?.toLocaleString()}
      </Descriptions.Item>

      <Descriptions.Item label="Total Amount">
        <strong>₹{order.totalAmount?.toLocaleString()}</strong>
      </Descriptions.Item>

      <Descriptions.Item label="Branch">
        {order.branch?.name || "-"}
      </Descriptions.Item>

      <Descriptions.Item label="Cashier">
        {order.cashier?.fullName ||
          order.cashier?.name ||
          order.cashier?.email ||
          "-"}
      </Descriptions.Item>

      <Descriptions.Item label="Customer">
        {order.customerName || "Walk-in Customer"}
      </Descriptions.Item>

      <Descriptions.Item label="Customer Phone">
        {order.customerPhone || "-"}
      </Descriptions.Item>

      <Descriptions.Item label="Created At" span={2}>
        {order.createdAt
          ? new Date(order.createdAt).toLocaleString()
          : "-"}
      </Descriptions.Item>

    </Descriptions>

    <Table
      style={{ marginTop: 24 }}
      rowKey="id"
      pagination={false}
      columns={columns}
      dataSource={order.items || []}
    />
  </Card>
  </MainLayout>
);

};

export default OrderDetails;