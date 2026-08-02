import { Table, Space, Button, Tag, Tooltip } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const getRoleColor = (role) => {
  switch (role) {
    case "ROLE_ADMIN":
      return "red";

    case "ROLE_STORE_ADMIN":
      return "blue";

    case "ROLE_STORE_MANAGER":
      return "green";

    case "ROLE_BRANCH_MANAGER":
      return "orange";

    case "ROLE_BRANCH_CASHIER":
      return "purple";

    default:
      return "default";
  }
};

const UserTable = ({
  users,
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
      width: 70,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {role.replace("ROLE_", "").replaceAll("_", " ")}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 170,
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => onView(record.id)}
            />
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(record.id)}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={users}
      loading={loading}
      pagination={{
        pageSize: 10,
      }}
      scroll={{ x: 900 }}
    />
  );
};

export default UserTable;