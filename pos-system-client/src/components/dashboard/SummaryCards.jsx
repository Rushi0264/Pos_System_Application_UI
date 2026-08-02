import { Row, Col } from "antd";
import ProgressCard from "./ProgressCard";

const SummaryCards = ({ stats }) => {
  return (
    <Row gutter={[20,20]}>

      <Col xs={24} md={8}>
        <ProgressCard
          title="Monthly Revenue"
          value={`₹${stats?.totalRevenue ?? 0}`}
          percent={78}
          color="#0d9488"
        />
      </Col>


      <Col xs={24} md={8}>
        <ProgressCard
          title="Inventory Health"
          value={`${stats?.totalProducts ?? 0} Items`}
          percent={92}
          color="#52c41a"
        />
      </Col>


      <Col xs={24} md={8}>
        <ProgressCard
          title="Customer Growth"
          value={`${stats?.totalCustomers ?? 0} Customers`}
          percent={65}
          color="#fa8c16"
        />
      </Col>


    </Row>
  );
};

export default SummaryCards;