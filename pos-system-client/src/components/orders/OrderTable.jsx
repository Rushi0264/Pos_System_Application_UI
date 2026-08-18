import {
  Table,
  Button,
  Space,
  Popconfirm,
  Tag,
  Tooltip,
  Select,
} from "antd";

import {
  downloadInvoice,
} from "../../services/orderService";

import {
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import PaymentBadge from "./PaymentBadge";

const { Option } = Select;

const STATUS_COLORS = {
  CREATED: "orange",
  CONFIRMED: "blue",
  COMPLETED: "green",
  CANCELLED: "red",
  RETURNED: "purple",
};

const OrderTable = ({
  orders,
  loading,
  onView,
  onDelete,
  onStatus,   // आता (id, newStatus) असे दोन params घेईल
  hideDelete = false,
}) => {

  const columns = [

    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },

    {
      title: "Customer",
      key: "customer",
      width: 110,
      render: (_, record) =>
        record.customerName || "Walk-in",
    },

    {
      title: "Cashier",
      width: 110,
      render: (_, record) =>
        record.cashier?.fullName ||
        record.cashier?.email ||
        "-",
    },

    {
      title: "Branch",
      width: 100,
      render: (_, record) =>
        record.branch?.name || "-",
    },

    {
      title: "Payment",
      dataIndex: "paymentType",
      key: "paymentType",
      width: 90,
      render: (paymentType) => (
        <PaymentBadge paymentType={paymentType} />
      ),
    },

    {
  title: "Status",
  dataIndex: "status",
  key: "status",
  width: 150,
  render: (status, record) => {

    const isFinal =
      status === "COMPLETED" ||
      status === "CANCELLED" ||
      status === "RETURNED";

    if (isFinal || hideDelete) {
      return (
        <Tag color={STATUS_COLORS[status]}>
          {status}
        </Tag>
      );
    }

    return (
      <Select
        value={status}
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
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 90,
      render: (value) => `₹${value}`,
    },

    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (value) =>
        value
          ? new Date(value).toLocaleDateString()
          : "-",
    },

    {
      title: "Action",
      key: "action",
      width: 110,
      render: (_, record) => (

        <Space size={8}>

          <Tooltip title="View">
            <Button
              type="primary"
              icon={<EyeOutlined style={{ fontSize: 16 }} />}
              onClick={() => onView(record.id)}
            />
          </Tooltip>

          <Tooltip title="Invoice">
            <Button
              icon={<DownloadOutlined style={{ fontSize: 16 }} />}
              onClick={() => downloadInvoice(record.id)}
            />
          </Tooltip>

          {!hideDelete && (
            <Popconfirm
              title="Delete Order?"
              onConfirm={() => onDelete(record.id)}
            >
              <Tooltip title="Delete">
                <Button
                  danger
                  icon={<DeleteOutlined style={{ fontSize: 16 }} />}
                />
              </Tooltip>
            </Popconfirm>
          )}

        </Space>

      ),
    },

  ];

  return (
    <Table
      bordered
      rowKey="id"
      columns={columns}
      dataSource={orders}
      loading={loading}
      pagination={{
        pageSize: 10,
      }}
      scroll={{ x: 1000 }}
    />
  );
};

export default OrderTable;