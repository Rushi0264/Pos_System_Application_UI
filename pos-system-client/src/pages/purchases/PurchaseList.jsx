import { useEffect, useState } from "react";
import { Button, Card, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import purchaseService from "../../services/purchaseService";
import PurchaseTable from "../../components/purchase/PurchaseTable";

const PurchaseList = () => {
  const navigate = useNavigate();

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(sessionStorage.getItem("pos_user") || "null");
  const isAccountant = currentUser?.role === "ROLE_ACCOUNTANT";

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);

      const data = await purchaseService.getAllPurchases();

      setPurchases(data);
    } catch (error) {
      message.error("Unable to load purchases");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await purchaseService.deletePurchase(id);

      message.success("Purchase deleted");

      fetchPurchases();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  return (
    <MainLayout>
      <Card
        title="Purchase Management"
        extra={
          !isAccountant && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/purchases/create")}
            >
              Add Purchase
            </Button>
          )
        }
      >
        <PurchaseTable
          purchases={purchases}
          loading={loading}
          onView={(id) => navigate(`/purchases/${id}`)}
          onDelete={handleDelete}
        />
      </Card>
    </MainLayout>
  );
};

export default PurchaseList;