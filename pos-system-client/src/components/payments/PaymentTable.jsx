import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const statusColor = {
  SUCCESS: "green",
  PENDING: "orange",
  FAILED: "red",
};

const PaymentTable = ({
  payments,
  loading,
  onView,
  onDelete,
}) => {
  const columns = [
    { title: "Payment ID", dataIndex: "id" },
    { title: "Order ID", dataIndex: "orderId" },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => `₹${amount}`,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={statusColor[status]}>{status}</Tag>
      ),
    },
    { title: "Date", dataIndex: "createdAt" },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
          />

          <Popconfirm
            title="Delete Payment?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={payments}
      	scroll={{ x: 600 }}
    />
  );
};

export default PaymentTable;