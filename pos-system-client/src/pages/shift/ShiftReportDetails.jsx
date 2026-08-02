import { useEffect, useState } from "react";
import { Card, Descriptions, Table, Tag, Spin, message, Row, Col } from "antd";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import shiftReportService from "../../services/shiftReportService";
import BackButton from "../../components/comman/BackButton";

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ShiftReportDetails = () => {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await shiftReportService.getShiftReportById(id);
      setReport(data);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load shift report."
      );
    } finally {
      setLoading(false);
    }
  };

  const paymentColumns = [
    { title: "Payment Type", dataIndex: "type" },
    { title: "Amount", dataIndex: "totalAmount", render: (v) => `₹${v}` },
    { title: "Transactions", dataIndex: "transactionCount" },
    { title: "Percentage", dataIndex: "percentage", render: (v) => `${v?.toFixed(1)}%` },
  ];

  const productColumns = [
    { title: "Product", dataIndex: "name" },
    { title: "Selling Price", dataIndex: "sellingPrice", render: (v) => `₹${v}` },
  ];

  const orderColumns = [
    { title: "Order ID", dataIndex: "id" },
    { title: "Amount", dataIndex: "totalAmount", render: (v) => `₹${v}` },
    { title: "Status", dataIndex: "status", render: (s) => <Tag>{s}</Tag> },
  ];

  const refundColumns = [
    { title: "Refund ID", dataIndex: "id" },
    { title: "Order ID", dataIndex: ["order", "id"] },
    { title: "Reason", dataIndex: "reason" },
    { title: "Amount", dataIndex: "amount", render: (v) => `₹${v}` },
  ];

  if (loading) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  if (!report) {
    return (
      <MainLayout>
        <Card>No Shift Report Found</Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
        <BackButton/>
      <Card title="Shift Report Summary" style={{ marginBottom: 20 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Cashier">
            {report.cashier?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Branch">
            {report.branch?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Shift Start">
            {formatDateTime(report.shiftStart)}
          </Descriptions.Item>
          <Descriptions.Item label="Shift End">
            {report.shiftEnd ? formatDateTime(report.shiftEnd) : "Active"}
          </Descriptions.Item>
          <Descriptions.Item label="Total Sale">
            ₹{report.totalSale}
          </Descriptions.Item>
          <Descriptions.Item label="Total Refunds">
            ₹{report.totalRefunds}
          </Descriptions.Item>
          <Descriptions.Item label="Net Sale">
            ₹{report.netSale}
          </Descriptions.Item>
          <Descriptions.Item label="Total Orders">
            {report.totalOrders}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Payment Breakdown" size="small" style={{ marginBottom: 16 }}>
            <Table
              rowKey="type"
              columns={paymentColumns}
              dataSource={report.paymentSummaries}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Top Selling Products" size="small" style={{ marginBottom: 16 }}>
            <Table
              rowKey="id"
              columns={productColumns}
              dataSource={report.topSellingProducts}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Recent Orders" size="small">
            <Table
              rowKey="id"
              columns={orderColumns}
              dataSource={report.recentOrders}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Refunds" size="small">
            <Table
              rowKey="id"
              columns={refundColumns}
              dataSource={report.refunds}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default ShiftReportDetails;