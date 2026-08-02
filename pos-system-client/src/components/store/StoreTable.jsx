import { Table, Button, Space, Tag } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const StoreTable = ({
  stores,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Store Type",
      dataIndex: "storeType",
      key: "storeType",
    },
    {
      title: "Phone",
      render: (_, record) => record.contact?.phone,
    },
    {
      title: "Email",
      render: (_, record) => record.contact?.email,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = "default";

        switch (status) {
          case "ACTIVE":
            color = "green";
            break;
          case "PENDING":
            color = "orange";
            break;
          case "SUSPENDED":
            color = "red";
            break;
          case "INACTIVE":
            color = "gray";
            break;
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => onView(record.id)}
          />

          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record.id)}
          />

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
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
      dataSource={stores}
      pagination={{
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50],
    showQuickJumper: true,
}}
locale={{
    emptyText: "No Stores Found",
}}
    />
  );
};

export default StoreTable;