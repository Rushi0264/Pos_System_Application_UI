import { Button, Space, Table, Tag, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Option } = Select;

const STATUS_COLORS = {
  PENDING: "orange",
  APPROVED: "blue",
  REJECTED: "red",
  PROCESSED: "green",
};

const RefundTable = ({ refunds, loading, onView, onStatus }) => {
  const columns = [
    { title: "Refund ID", dataIndex: "id" },

    {
      title: "Order ID",
      render: (_, record) => record.order?.id || "-",
    },

    {
      title: "Customer",
      render: (_, record) =>
        record.order?.customerName || "Walk-in Customer",
    },

    { title: "Reason", dataIndex: "reason" },

    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => `₹${amount}`,
    },

    {
      title: "Cashier",
      dataIndex: "cashierName",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => {

        const isFinal =
          status === "APPROVED" ||
          status === "REJECTED" ||
          status === "PROCESSED";

        if (isFinal) {
          return (
            <Tag color={STATUS_COLORS[status]}>
              {status}
            </Tag>
          );
        }

        return (
          <Select
            value={status || "PENDING"}
            size="small"
            style={{ width: 130 }}
            onChange={(newStatus) => onStatus(record.id, newStatus)}
          >
            {Object.keys(STATUS_COLORS).map((s) => (
              <Option key={s} value={s}>
                <Tag color={STATUS_COLORS[s]} style={{ marginRight: 0 }}>
                  {s}
                </Tag>
              </Option>
            ))}
          </Select>
        );

      },
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) =>
        value ? new Date(value).toLocaleString() : "-",
    },

    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onView(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={refunds}
    />
  );
};

export default RefundTable;