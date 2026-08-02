import paymentApi from "../api/paymentApi";

const paymentService = {
  getAllPayments: () => paymentApi.getAllPayments(),
  getPaymentByOrderId: (orderId) => paymentApi.getPaymentByOrderId(orderId),
  createPayment: (data) => paymentApi.createPayment(data),
  deletePayment: (id) => paymentApi.deletePayment(id),
};

export default paymentService;