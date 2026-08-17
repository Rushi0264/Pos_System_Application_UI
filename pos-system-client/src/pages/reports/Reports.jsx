//javascriptreact
import { Card, Row, Col, Typography } from "antd";
import {
  CreditCardOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
  RollbackOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

const { Title, Text } = Typography;

const reportCards = [
  {
    key: "payment-summary",
    title: "Payment Summary",
    description: "Branch-wise payment breakdown by type",
    icon: <CreditCardOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
    path: "/payments/summary",
    roles: [
      "ROLE_SUPER_ADMIN",
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_MANAGER",
      "ROLE_ACCOUNTANT",  
    ],
  },
  {
    key: "shift-reports",
    title: "Shift Reports",
    description: "Cashier shift-wise sales and refund history",
    icon: <ClockCircleOutlined style={{ fontSize: 32, color: "#52c41a" }} />,
    path: "/shift-reports",
    roles: [
      "ROLE_SUPER_ADMIN",
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_MANAGER",
    ],
  },
  {
    key: "stock-report",
    title: "Stock Report",
    description: "Store & branch-wise stock levels and availability",
    icon: <DatabaseOutlined style={{ fontSize: 32, color: "#fa8c16" }} />,
    path: "/inventory",
    roles: [
      "ROLE_SUPER_ADMIN",
      "ROLE_STORE_ADMIN",
      "ROLE_INVENTORY_MANAGER",
    ],
  },
  {
    key: "purchase-report",
    title: "Purchase Report",
    description: "Supplier-wise purchase history and invoices",
    icon: <ShoppingOutlined style={{ fontSize: 32, color: "#722ed1" }} />,
    path: "/purchases",
    roles: [
      "ROLE_SUPER_ADMIN",
      "ROLE_STORE_ADMIN",
      "ROLE_INVENTORY_MANAGER",
      "ROLE_ACCOUNTANT",   
    ],
  },
  {
    key: "refund-report",
    title: "Refund Report",
    description: "Track all refunds and returned orders",
    icon: <RollbackOutlined style={{ fontSize: 32, color: "#f5222d" }} />,
    path: "/refunds",
    roles: [
      "ROLE_SUPER_ADMIN",
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_MANAGER",
      "ROLE_ACCOUNTANT",   
    ],
  },
];

const Reports = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("pos_user")) || {};
  const role = user.role;

  const visibleCards = reportCards.filter((card) =>
    card.roles.includes(role)
  );

  return (
    <MainLayout>
      <Title level={3}>Reports</Title>
      <Text type="secondary">
        Select a report to view detailed insights
      </Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {visibleCards.map((card) => (
          <Col span={8} key={card.key}>
            <Card
              hoverable
              onClick={() => navigate(card.path)}
              style={{ textAlign: "center" }}
            >
              {card.icon}
              <Title level={4} style={{ marginTop: 12 }}>
                {card.title}
              </Title>
              <Text type="secondary">{card.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      {visibleCards.length === 0 && (
        <Text type="secondary">No reports available for your role.</Text>
      )}
    </MainLayout>
  );
};

export default Reports;