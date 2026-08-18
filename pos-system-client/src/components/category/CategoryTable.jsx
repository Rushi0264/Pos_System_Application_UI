import { Button, Space, Table } from "antd";
import {

} from "@ant-design/icons";

const CategoryTable = ({
  categories,
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
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Store ID",
      dataIndex: "storeId",
    },
{
  title: "Action",
  width: 220,
  render: (_, record) => (
    <Space>
      <Button
        type="primary"
        size="small"
        onClick={() => onView(record.id)}
      >
        View
      </Button>

      <Button
        size="small"
        onClick={() => onEdit(record.id)}
      >
        Edit
      </Button>

      <Button
        danger
        size="small"
        onClick={() => onDelete(record.id)}
      >
        Delete
      </Button>
    </Space>
  ),
}
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={categories}
      columns={columns}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
      scroll={{ x: 500 }}
    />
  );
};

export default CategoryTable;