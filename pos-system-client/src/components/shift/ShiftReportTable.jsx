import { Button, Space, Table, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const ShiftReportTable = ({ reports, loading, onView }) => {
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Cashier", dataIndex: ["cashier", "fullName"] },
    { title: "Shift Start", dataIndex: "shiftStart" },
    {
      title: "Shift End",
      dataIndex: "shiftEnd",
      render: (v) =>
        v ? v : <Tag color="orange">Active</Tag>,
    },
    {
      title: "Total Sale",
      dataIndex: "totalSale",
      render: (v) => `₹${v ?? 0}`,
    },
    {
      title: "Net Sale",
      dataIndex: "netSale",
      render: (v) => `₹${v ?? 0}`,
    },
    { title: "Orders", dataIndex: "totalOrders" },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => onView(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={reports}
    />
  );
};

export default ShiftReportTable;