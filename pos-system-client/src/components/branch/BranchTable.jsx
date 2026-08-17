import { useState, useEffect } from "react";
import { Button, Space, Table, Dropdown } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const user = JSON.parse(sessionStorage.getItem("pos_user")) || {};
const canManage = user.role !== "ROLE_SUPER_ADMIN";

const BranchTable = ({
  branches,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: isMobile ? "14%" : 80,
    },
    {
      title: "Branch",
      dataIndex: "name",
      width: isMobile ? "40%" : undefined,
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      responsive: ["md"],
    },
    {
      title: "Store ID",
      dataIndex: "storeId",
      responsive: ["md"],
    },
    {
      title: "Action",
      fixed: isMobile ? false : "right",
      width: isMobile ? (canManage ? "34%" : "20%") : 150,
      render: (_, record) => {
        if (isMobile) {
          const menuItems = canManage
            ? [
                {
                  key: "edit",
                  label: "Edit",
                  icon: <EditOutlined />,
                  onClick: () => onEdit(record.id),
                },
                {
                  key: "delete",
                  label: "Delete",
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => onDelete(record.id),
                },
              ]
            : [];

          return (
            <Space size={2}>
              <Button
                size="small"
                icon={<EyeOutlined style={{ fontSize: 12 }} />}
                onClick={() => onView(record.id)}
              />
              {canManage && (
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <Button size="small" icon={<MoreOutlined style={{ fontSize: 12 }} />} />
                </Dropdown>
              )}
            </Space>
          );
        }

        return (
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
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={branches}
        loading={loading}
        tableLayout="fixed"
        size={isMobile ? "small" : "middle"}
        pagination={{
          pageSize: 10,
          showSizeChanger: !isMobile,
          showQuickJumper: !isMobile,
        }}
      />
    </div>
  );
};

export default BranchTable;