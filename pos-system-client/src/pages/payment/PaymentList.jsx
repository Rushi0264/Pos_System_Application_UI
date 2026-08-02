import { useEffect, useState } from "react";
import { Card, message } from "antd";

import MainLayout from "../../layouts/MainLayout";
import paymentService from "../../services/paymentService";
import PaymentTable from "../../components/payments/PaymentTable";
import PaymentDetailsModal from "../../components/payments/PaymentDetailsModal";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const data = await paymentService.getAllPayments();

      setPayments(data);
    } catch (error) {
      message.error("Unable to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await paymentService.deletePayment(id);

      message.success("Payment deleted");

      fetchPayments();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const handleView = (record) => {
    setSelectedPayment(record);
    setModalOpen(true);
  };

  return (
    <MainLayout>
      <Card title="Payment Management">
        <PaymentTable
          payments={payments}
          loading={loading}
          onView={handleView}
          onDelete={handleDelete}
        />
      </Card>

      <PaymentDetailsModal
        open={modalOpen}
        payment={selectedPayment}
        onClose={() => setModalOpen(false)}
      />
    </MainLayout>
  );
};

export default PaymentList;