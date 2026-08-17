import { useState, useEffect } from "react";
import { Table, Button, Space, Tag, Dropdown } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const StoreTable = ({
  stores,
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

  const allColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: isMobile ? "12%" : 60,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: isMobile ? "38%" : 140,
      ellipsis: true,
    },
    {
      title: "Store Type",
      dataIndex: "storeType",
      key: "storeType",
      width: 120,
      responsive: ["md"],
    },
    {
      title: "Phone",
      render: (_, record) => record.contact?.phone,
      width: 130,
      responsive: ["md"],
    },
    {
      title: "Email",
      render: (_, record) => record.contact?.email,
      width: 190,
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      width: isMobile ? "25%" : 100,
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

        return (
          <Tag color={color} style={isMobile ? { fontSize: 11, padding: "0 4px", marginRight: 0 } : {}}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      fixed: isMobile ? false : "right",
      width: isMobile ? "25%" : 130,
      render: (_, record) => {
        if (isMobile) {
          const menuItems = [
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
          ];

          return (
            <Space size={2}>
              <Button
                type="primary"
                size="small"
                icon={<EyeOutlined style={{ fontSize: 12 }} />}
                onClick={() => onView(record.id)}
              />
              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <Button size="small" icon={<MoreOutlined style={{ fontSize: 12 }} />} />
              </Dropdown>
            </Space>
          );
        }

        return (
          <Space size={8}>
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
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Table
        rowKey="id"
        loading={loading}
        columns={allColumns}
        dataSource={stores}
        tableLayout="fixed"
        scroll={isMobile ? undefined : { x: 890 }}
        size={isMobile ? "small" : "middle"}
        pagination={{
          pageSize: 10,
          showSizeChanger: !isMobile,
          pageSizeOptions: [10, 20, 50],
          showQuickJumper: !isMobile,
        }}
        locale={{
          emptyText: "No Stores Found",
        }}
      />
    </div>
  );
};

export default StoreTable;