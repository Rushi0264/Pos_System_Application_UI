import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import RefundForm from "../../components/refund/RefundForm";

import refundService from "../../services/refundService";
import { getAllOrders } from "../../services/orderService";
import BackButton from "../../components/comman/BackButton";

const CreateRefund = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();

      setOrders(data);
    } catch (error) {
      message.error("Unable to load orders");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await refundService.createRefund(values);

      message.success("Refund created successfully");

      navigate("/refunds");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create refund"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
        <BackButton/>
      <RefundForm
        submitText="Create Refund"
        onSubmit={handleSubmit}
        loading={loading}
        orders={orders}
      />
    </MainLayout>
  );
};

export default CreateRefund;