import { Button, Image, Space, Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const ProductTable = ({
  products,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 90,
      render: (image) =>
        image ? (
          <Image
            src={image}
            width={55}
            height={55}
            style={{
              objectFit: "cover",
              borderRadius: 6,
            }}
            preview
          />
        ) : (
          <Tag color="default">No Image</Tag>
        ),
    },

    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },

    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand || "-",
    },

    {
      title: "Category",
      render: (_, record) => record.category?.name || "-",
    },

    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
      align: "right",
      render: (value) => `₹ ${value?.toFixed(2)}`,
    },

    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      align: "right",
      render: (value) => (
        <span
          style={{
            color: "#1677ff",
            fontWeight: 600,
          }}
        >
          ₹ {value?.toFixed(2)}
        </span>
      ),
    },

    {
  title: "In Store",
  dataIndex: "storeStock",
  key: "storeStock",
  align: "center",
  render: (stock) => (
    <Tag color={stock > 0 ? "blue" : "default"}>
      {stock ?? 0}
    </Tag>
  ),
},

{
  title: "In Branches",
  dataIndex: "branchStock",
  key: "branchStock",
  align: "center",
  render: (stock, record) => {

    const breakdown = record.branchBreakdown || [];

    const tag = (
      <Tag color={stock > 0 ? "green" : "red"}>
        {stock ?? 0}
      </Tag>
    );

    if (breakdown.length === 0) {
      return tag;
    }

    return (
      <Tooltip
        title={
          <div>
            {breakdown.map((b) => (
              <div key={b.branchId}>
                {b.branchName}: {b.quantity}
              </div>
            ))}
          </div>
        }
      >
        {tag}
      </Tooltip>
    );
  },
},

    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 170,
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
            onClick={() => onDelete(record)}
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
      dataSource={products}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50],
        showQuickJumper: true,
      }}
      locale={{
        emptyText: "No Products Found",
      }}
      scroll={{
        x: 1100,
      }}
    />
  );
};

export default ProductTable;