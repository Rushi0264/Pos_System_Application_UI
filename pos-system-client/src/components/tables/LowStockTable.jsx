import { useEffect, useState } from "react";
import { Table, Avatar, Progress, Tag, Spin } from "antd";
import dashboardService from "../../services/dashboardService";

const columns = [
  {
    title: "Product",
    dataIndex: "productName",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar style={{ background: "#52c41a" }}>
          {record.productName ? record.productName[0] : "?"}
        </Avatar>

        <div>
          <div style={{ fontWeight: 600 }}>{record.productName}</div>

          <div style={{ fontSize: 12, color: "#999" }}>
            {record.branchName}
          </div>
        </div>
      </div>
    ),
  },

 {
  title: "Stock",
  render: (_, record) => (
    <Tag color={record.status === "Critical" ? "red" : "orange"}>
      {record.quantity} units
    </Tag>
  ),
},

  {
    title: "Remaining",
    dataIndex: "quantity",
  },

  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status === "Critical" ? "red" : "orange"}>{status}</Tag>
    ),
  },
];

const LowStockTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStock();
  }, []);

  const loadStock = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getLowStockProducts();
      setData(res.map((item) => ({ ...item, key: `${item.productId}-${item.branchName}` })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin />;

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="middle"
      scroll={{ x: 400 }}
    />
  );
};

export default LowStockTable;