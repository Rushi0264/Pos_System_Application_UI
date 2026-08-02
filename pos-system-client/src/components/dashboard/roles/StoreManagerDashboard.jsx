import { Row, Col } from "antd";
import StatCard from "../../ui/StatCard";

import {
  FaBoxes,
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

const StoreManagerDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Store Manager Dashboard
      </h1>

      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col span={6}>
          <StatCard
            title="Sales"
            value="₹95,000"
            icon={<FaDollarSign />}
            growth="+10%"
          />
        </Col>

        <Col span={6}>
          <StatCard
            title="Orders"
            value="310"
            icon={<FaShoppingCart />}
          />
        </Col>

        <Col span={6}>
          <StatCard
            title="Inventory"
            value="740"
            icon={<FaBoxes />}
          />
        </Col>

        <Col span={6}>
          <StatCard
            title="Employees"
            value="18"
            icon={<FaUsers />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default StoreManagerDashboard;