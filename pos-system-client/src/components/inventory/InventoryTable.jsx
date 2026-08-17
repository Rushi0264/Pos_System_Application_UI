import {
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import ContactStoreAdminButton from "./ContactStoreAdminButton";

export default function InventoryTable({
  data = [],
  loading = false,
  onEdit,
  onDelete,
}) {

  const currentUser = JSON.parse(sessionStorage.getItem("pos_user"));
  const isBranchManager = currentUser?.role === "ROLE_BRANCH_MANAGER";

  const columns = [

    {
      title: "Product",
      dataIndex: ["product", "name"],
      key: "product",
      render: (_, record) => (
        <span className="font-medium">
          {record.product?.name || "-"}
        </span>
      ),
    },


    {
      title: "Branch",
      dataIndex: ["branch", "name"],
      key: "branch",
      render: (_, record) => (
        <span>
          {record.branch?.name || "-"}
        </span>
      ),
    },


    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => {

        let stockTag;

        if (quantity === 0) {
          stockTag = <Tag color="red">Out Of Stock</Tag>;
        } else if (quantity <= 5) {
          stockTag = <Tag color="orange">Low Stock ({quantity})</Tag>;
        } else {
          stockTag = <Tag color="green">{quantity}</Tag>;
        }

        return (
          <Space orientation="vertical" size={4}>
  {stockTag}

  {isBranchManager && quantity <= 5 && (
    <ContactStoreAdminButton
      storeId={record.branch?.storeId}
      productName={record.product?.name}
    />
  )}
</Space>
        );

      },
    },


    {
      title: "Last Updated",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      render: (date) =>
        date
          ? new Date(date).toLocaleString()
          : "-",
    },


    {
      title: "Actions",
      key: "actions",

      render: (_, record) => (

        <Space>


          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() =>
              onEdit(record)
            }
          >
            Edit
          </Button>



          <Popconfirm

            title="Delete this inventory?"

            description="Are you sure you want to delete this stock?"

            onConfirm={() =>
              onDelete(record.id)
            }

            okText="Yes"

            cancelText="No"

          >

            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>


          </Popconfirm>


        </Space>

      ),
    },

  ];



  return (

    <Table
    style={{margin:10}}

      rowKey="id"

      columns={columns}

      dataSource={data}

      loading={loading}

      pagination={{
        pageSize:10
      }}

    />

  );

}