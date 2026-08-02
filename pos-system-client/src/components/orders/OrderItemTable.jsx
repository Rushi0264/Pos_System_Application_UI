import { Button, InputNumber, Select, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const OrderItemTable = ({
  items,
  products,
  onProductChange,
  onQuantityChange,
  onRemove,
}) => {
  const columns = [
    {
      title: "Product",
      dataIndex: "productId",
      render: (value, record, index) => (
        <Select
          style={{ width: "100%" }}
          placeholder="Select Product"
          value={value}
          onChange={(productId) =>
            onProductChange(index, productId)
          }
          showSearch
          optionFilterProp="label"
          options={products.map((product) => ({
            value: product.id,
            label: product.name,
          }))}
        />
      ),
    },

    {
      title: "Price",
      render: (_, record) => {
        const product = products.find(
          (p) => p.id === record.productId
        );

        return product
          ? `₹${product.sellingPrice}`
          : "-";
      },
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (value, record, index) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(qty) =>
            onQuantityChange(index, qty)
          }
        />
      ),
    },

    {
      title: "Total",
      render: (_, record) => {
        const product = products.find(
          (p) => p.id === record.productId
        );

        if (!product) return "₹0";

        return `₹${
          product.sellingPrice * record.quantity
        }`;
      },
    },

    {
      title: "Action",
      render: (_, record, index) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onRemove(index)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered
      rowKey={(_, index) => index}
      columns={columns}
      dataSource={items}
      pagination={false}
    />
  );
};

export default OrderItemTable;