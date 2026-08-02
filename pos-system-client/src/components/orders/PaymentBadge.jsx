import { Tag } from "antd";

const PaymentBadge = ({ paymentType }) => {
  const getColor = () => {
    switch (paymentType) {
      case "CASH":
        return "green";

      case "CARD":
        return "blue";

      case "UPI":
        return "purple";

      case "NET_BANKING":
        return "cyan";

      case "WALLET":
        return "orange";

      default:
        return "default";
    }
  };

  return (
    <Tag color={getColor()}>
      {paymentType || "N/A"}
    </Tag>
  );
};

export default PaymentBadge;