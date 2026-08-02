import { useEffect, useState } from "react";
import { Button, Card, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import refundService from "../../services/refundService";
import RefundTable from "../../components/refund/RefundTable";

const RefundList = () => {
  const navigate = useNavigate();

  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("pos_user") || "null");
  const isAccountant = currentUser?.role === "ROLE_ACCOUNTANT";

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    try {
      setLoading(true);

      const data = await refundService.getAllRefunds();

      setRefunds(data);
    } catch (error) {
      message.error("Unable to load refunds");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await refundService.updateRefundStatus(id, newStatus);
      message.success(`Refund marked as ${newStatus}`);
      fetchRefunds();
    } catch (error) {
      message.error(
        error.response?.data?.message ||
        "Failed to update refund status"
      );
    }
  };

  return (
    <MainLayout>
      <Card
        title="Refund Management"
        extra={
          !isAccountant && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/refunds/create")}
            >
              Add Refund
            </Button>
          )
        }
      >
        <RefundTable
          refunds={refunds}
          loading={loading}
          onView={(id) => navigate(`/refunds/${id}`)}
          onStatus={handleStatusChange}
        />
      </Card>
    </MainLayout>
  );
};

export default RefundList;