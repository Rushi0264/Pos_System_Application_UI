import { useEffect, useState } from "react";
import { Card, Descriptions, Spin, message } from "antd";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import refundService from "../../services/refundService";
import BackButton from "../../components/comman/BackButton";

const RefundDetails = () => {
  const { id } = useParams();

  const [refund, setRefund] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRefund();
  }, []);

  const loadRefund = async () => {
    try {
      const data = await refundService.getRefundById(id);
      setRefund(data);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load refund."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  if (!refund) {
    return (
      <MainLayout>
        <Card>No Refund Found</Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
        <BackButton/>
      <Card title="Refund Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Refund ID">{refund.id}</Descriptions.Item>
          <Descriptions.Item label="Order ID">
            {refund.order?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Reason">{refund.reason}</Descriptions.Item>
          <Descriptions.Item label="Amount">₹{refund.amount}</Descriptions.Item>
          <Descriptions.Item label="Cashier">
            {refund.cashierName}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {refund.createdAt}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </MainLayout>
  );
};

export default RefundDetails;