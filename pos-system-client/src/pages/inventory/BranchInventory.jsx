import { useEffect, useState } from "react";
import { Card, Table, message, Tag } from "antd";

import inventoryService from "../../services/inventoryService";
import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/comman/BackButton";

const BranchInventory = () => {

  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);

  const getLoggedInUser = () => {
    const user = JSON.parse(sessionStorage.getItem("pos_user"));
    if (!user) {
      message.error("User not logged in");
      return null;
    }
    return user;
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const user = getLoggedInUser();
      if (!user) return;

      const branchId = user.branch?.id || user.branchId;

      if (!branchId) {
        message.error("Branch not found for this user");
        return;
      }

    
      const data = await inventoryService.getInventoryByBranch(branchId);

      setInventory(data || []);

    }
    catch (error) {
      console.log(error);
      message.error("Failed to load branch inventory");
    }
    finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Product",
      key: "product",
      render: (_, record) => record.product?.name || "-",
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) =>
        record.product?.sellingPrice
          ? `₹${record.product.sellingPrice}`
          : "-",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty) => (
        <Tag color={qty > 5 ? "green" : qty > 0 ? "orange" : "red"}>
          {qty > 0 ? qty : "Out of stock"}
        </Tag>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      render: (val) => (val ? new Date(val).toLocaleString() : "-"),
    },
  ];

  return (
    <MainLayout>
      <Card title="Branch Inventory">
        <BackButton />

        <Table
          style={{ marginTop: 20 }}
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={inventory}
          scroll={{ x: 500 }}
        />
      </Card>
    </MainLayout>
  );
};

export default BranchInventory;