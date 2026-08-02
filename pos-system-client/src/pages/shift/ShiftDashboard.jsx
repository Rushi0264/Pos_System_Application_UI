import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Statistic, Table, Tag, message, Empty } from "antd";
import {
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

import MainLayout from "../../layouts/MainLayout";
import shiftReportService from "../../services/shiftReportService";

const ShiftDashboard = () => {
  const [shift, setShift] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadCurrentShift();
  }, []);

  const loadCurrentShift = async () => {
    try {
      setLoading(true);

      const data = await shiftReportService.getCurrentShiftProgress();

      setShift(data);
    } catch (error) {
      // no active shift found — normal case, not an error to show
      setShift(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStartShift = async () => {
    try {
      setActionLoading(true);

      await shiftReportService.startShift();

      message.success("Shift started");

      loadCurrentShift();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to start shift"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleEndShift = async () => {
    try {
      setActionLoading(true);

      await shiftReportService.endShift();

      message.success("Shift ended");

      loadCurrentShift();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to end shift"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const paymentColumns = [
    { title: "Payment Type", dataIndex: "type" },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      render: (v) => `₹${v?.toFixed(2)}`,
    },
    { title: "Transactions", dataIndex: "transactionCount" },
    {
      title: "Percentage",
      dataIndex: "percentage",
      render: (v) => `${v?.toFixed(1)}%`,
    },
  ];

  const recentOrderColumns = [
    { title: "Order ID", dataIndex: "id" },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      render: (v) => `₹${v}`,
    },
    { title: "Status", dataIndex: "status", render: (s) => <Tag>{s}</Tag> },
  ];

  return (
    <MainLayout>
      <Card
        title="My Shift"
        loading={loading}
        extra={
          shift ? (
            <Button
              danger
              icon={<StopOutlined />}
              onClick={handleEndShift}
              loading={actionLoading}
            >
              End Shift
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={handleStartShift}
              loading={actionLoading}
            >
              Start Shift
            </Button>
          )
        }
      >
        {!shift ? (
          <Empty description="No active shift. Click 'Start Shift' to begin." />
        ) : (
          <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Statistic title="Total Sale" prefix="₹" value={shift.totalSale} />
              </Col>
              <Col span={6}>
                <Statistic title="Total Refunds" prefix="₹" value={shift.totalRefunds} />
              </Col>
              <Col span={6}>
                <Statistic title="Net Sale" prefix="₹" value={shift.netSale} />
              </Col>
              <Col span={6}>
                <Statistic title="Total Orders" value={shift.totalOrders} />
              </Col>
            </Row>

            <Card title="Payment Breakdown" size="small" style={{ marginBottom: 16 }}>
              <Table
                rowKey="type"
                columns={paymentColumns}
                dataSource={shift.paymentSummaries}
                pagination={false}
                size="small"
              />
            </Card>

            <Card title="Recent Orders" size="small">
              <Table
                rowKey="id"
                columns={recentOrderColumns}
                dataSource={shift.recentOrders}
                pagination={false}
                size="small"
              />
            </Card>
          </>
        )}
      </Card>
    </MainLayout>
  );
};

export default ShiftDashboard;