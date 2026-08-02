import { Button, Space, Table } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const user = JSON.parse(localStorage.getItem("pos_user")) || {};
const canManage = user.role !== "ROLE_SUPER_ADMIN";

const BranchTable = ({
  branches,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "Branch",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Store ID",
      dataIndex: "storeId",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onView(record.id)}
          />

          {canManage && (
            <Button onClick={() => onEdit(record.id)}>
              Edit
            </Button>
          )}

          {canManage && (
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={branches}
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
  );
};

export default BranchTable;