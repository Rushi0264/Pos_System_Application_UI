import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const PurchaseTable = ({
  purchases,
  loading,
  onView,
  onDelete,
}) => {
  const columns = [
    {
      title: "Invoice No.",
      dataIndex: "invoiceNumber",
    },
    {
      title: "Supplier",
      dataIndex: ["supplier", "name"],
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (amount) => `₹${amount}`,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      render: (type) => <Tag color="green">{type}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onView(record.id)}
          />

          <Popconfirm
            title="Delete Purchase?"
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
      dataSource={purchases}
      scroll={{ x: 600 }}
    />
  );
};

export default PurchaseTable;