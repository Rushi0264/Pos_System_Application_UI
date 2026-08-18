import { useEffect, useState } from "react";
import { Table, Avatar, Tag, Spin } from "antd";
import dashboardService from "../../services/dashboardService";

const columns = [
  {
    title: "Customer",
    dataIndex: "customerName",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar style={{ background: "#0d9488" }}>
          {record.customerName ? record.customerName[0] : "?"}
        </Avatar>

        <div>
          <div style={{ fontWeight: 600 }}>
            {record.customerName || "Walk-in Customer"}
          </div>

          <div style={{ color: "#888", fontSize: 12 }}>
            ORD-{record.id}
          </div>
        </div>
      </div>
    ),
  },

  {
    title: "Cashier",
    dataIndex: "cashier",
    render: (cashier) => cashier?.fullName || "-",
  },

  {
    title: "Payment",
    dataIndex: "paymentType",
    render: (payment) => <Tag color="blue">{payment}</Tag>,
  },

  {
    title: "Amount",
    dataIndex: "totalAmount",
    render: (amount) => <strong>₹{amount}</strong>,
  },

  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status === "COMPLETED" ? "green" : "orange"}>
        {status}
      </Tag>
    ),
  },
];

const RecentOrdersTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getRecentOrders();
      setData(res.map((item) => ({ ...item, key: item.id })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin />;

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="middle"
      scroll={{ x: 500 }} 
    />
  );
};

export default RecentOrdersTable;