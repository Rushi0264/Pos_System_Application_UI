import { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import userService from "../../services/userService";
import { getTodayOrders } from "../../services/orderService";
import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/comman/BackButton";

const TodayOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodayOrders = async () => {
      try {
        setLoading(true);
        const user = await userService.getProfile();
        const branchId = user?.storeId;

        if (!branchId) {
          message.error("Branch not found for this user");
          return;
        }

        const data = await getTodayOrders(branchId);
        setOrders(data || []);
      } catch (error) {
        message.error("Unable to load today's orders");
      } finally {
        setLoading(false);
      }
    };

    loadTodayOrders();
  }, []);

  const statusColor = (status) => {
    if (status === "COMPLETED") return "green";
    if (status === "CREATED") return "blue";
    if (status === "CANCELLED") return "red";
    if (status === "RETURNED") return "purple";
    return "orange";
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      render: (name) => name || "Walk-in Customer",
    },
    {
      title: "Cashier",
      key: "cashier",
      render: (_, record) =>
        record.cashier?.fullName ||
        record.cashier?.name ||
        record.cashier?.email ||
        "-",
    },
    {
      title: "Branch",
      key: "branch",
      render: (_, record) => record.branch?.name || "-",
    },
    { title: "Payment", dataIndex: "paymentType", key: "paymentType" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColor(status)}>{status}</Tag>,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "right",
      render: (amount) => `₹${(amount || 0).toLocaleString("en-IN")}`,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleString() : "-"),
    },
  ];

  return (
    <MainLayout>
        <BackButton/>
    <div>
    
      <h2 style={{ marginBottom: 20 }}>Today's Orders</h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
    </MainLayout>
  );
};

export default TodayOrders;