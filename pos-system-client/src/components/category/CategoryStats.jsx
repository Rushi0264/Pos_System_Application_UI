import { Card, Col, Row, Statistic } from "antd";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const CategoryStats = ({ categories }) => {
  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>
      <Col xs={24} md={12}>
        <Card>
          <Statistic
            title="Total Categories"
            value={categories.length}
            prefix={<AppstoreOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card>
          <Statistic
            title="Available Categories"
            value={categories.length}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CategoryStats;