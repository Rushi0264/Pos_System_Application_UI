import { Modal, Descriptions, Tag } from "antd";

const statusColor = {
  SUCCESS: "green",
  PENDING: "orange",
  FAILED: "red",
  REFUNDED: "purple",
};

const PaymentDetailsModal = ({ open, payment, onClose }) => {
  if (!payment) return null;

  return (
    <Modal
      title="Payment Details"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="Payment ID">
          {payment.id}
        </Descriptions.Item>
        <Descriptions.Item label="Order ID">
          {payment.orderId}
        </Descriptions.Item>
        <Descriptions.Item label="Customer Name">
          {payment.customerName || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Customer Phone">
          {payment.customerPhone || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Customer Email">
          {payment.customerEmail || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          ₹{payment.amount}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Type">
          <Tag color="blue">{payment.paymentType}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusColor[payment.status]}>{payment.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {payment.createdAt}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default PaymentDetailsModal;