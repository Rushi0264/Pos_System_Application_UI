import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Avatar, message, Button } from "antd";
import StatCard from "../../ui/StatCard";
import userService from "../../../services/userService";
import { getTodayOrders } from "../../../services/orderService";
import shiftReportService from "../../../services/shiftReportService";

import {
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaUndo,
  FaCashRegister,
} from "react-icons/fa";

const CashierDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    todaySales: 0,
    orders: 0,
    customers: 0,
    refunds: 0,
  });
  const [loading, setLoading] = useState(true);

  const [shiftActive, setShiftActive] = useState(false);
  const [shiftLoading, setShiftLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("pos_user")) || {};
  const branchName = user?.branchName || "";
  const storeBrand = user?.storeBrand || "";

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const user = await userService.getProfile();
        const branchId = user?.branch?.id || user?.branchId;
        const cashierId = user?.id;

        if (!branchId) {
          message.error("Branch not found for this user");
          return;
        }

        const allTodayOrders = await getTodayOrders(branchId);

        const myTodayOrders = (allTodayOrders || []).filter(
          (order) => order.cashierId === cashierId && order.status !== "RETURNED"
        );

        const refundedOrders = (allTodayOrders || []).filter(
          (order) => order.cashierId === cashierId && order.status === "RETURNED"
        );

        const totalSales = myTodayOrders.reduce(
          (sum, order) => sum + (order.totalAmount || 0),
          0
        );

        const uniqueCustomers = new Set(
          myTodayOrders.map((order) => order.customerId).filter(Boolean)
        );

        setStats((prev) => ({
          ...prev,
          todaySales: totalSales,
          orders: myTodayOrders.length,
          customers: uniqueCustomers.size,
          refunds: refundedOrders.length,
        }));
      } catch (error) {
        message.error("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    const checkActiveShift = async () => {
      try {
        await shiftReportService.getCurrentShiftProgress();
        setShiftActive(true);
      } catch (error) {
        setShiftActive(false);
      }
    };

    loadDashboard();
    checkActiveShift();
  }, []);

  const handleStartShift = async () => {
    try {
      setShiftLoading(true);
      await shiftReportService.startShift();
      message.success("Shift started");
      setShiftActive(true);
    } catch (error) {
      message.error("Unable to start shift");
    } finally {
      setShiftLoading(false);
    }
  };

  const handleEndShift = async () => {
    try {
      setShiftLoading(true);
      await shiftReportService.endShift();
      message.success("Shift ended");
      setShiftActive(false);
    } catch (error) {
      message.error("Unable to end shift");
    } finally {
      setShiftLoading(false);
    }
  };

  return (
    <div>
      <Card
        variant={false}
        style={{
          borderRadius: 20,
          marginBottom: 24,
          background: "linear-gradient(135deg,#0d9488,#059669)",
          boxShadow: "0 15px 35px rgba(13,148,136,.25)",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
              {user?.fullName || "Cashier"}
            </h1>
            <p style={{ color: "#E5E7EB", fontSize: 15, margin: 0, marginBottom: 16 }}>
              Your shift summary and today's transactions.
            </p>

            <Button
              danger={shiftActive}
              type={shiftActive ? "primary" : "default"}
              loading={shiftLoading}
              onClick={shiftActive ? handleEndShift : handleStartShift}
              style={
                shiftActive
                  ? {}
                  : { background: "#fff", color: "#059669", fontWeight: 600 }
              }
            >
              {shiftActive ? "End Shift" : "Start Shift"}
            </Button>
          </Col>

          <Col>
            <div style={{ textAlign: "center" }}>
              <Avatar size={70} style={{ background: "rgba(255,255,255,.15)", fontSize: 32 }}>
                <FaCashRegister />
              </Avatar>
              {/*{storeBrand && (
                <div
                  style={{
                    marginTop: 8,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    background: "rgba(255,255,255,.15)",
                    padding: "4px 12px",
                    borderRadius: 12,
                  }}
                >
                  {storeBrand}
                </div>
              )}*/}
              <div
                style={{
                  marginTop: 6,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  background: "rgba(255,255,255,.15)",
                  padding: "4px 12px",
                  borderRadius: 12,
                }}
              >
                {branchName || "—"}
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={6}>
          <div onClick={() => navigate("/today-orders")} style={{ cursor: "pointer" }}>
            <StatCard
              title="Today's Sales"
              value={loading ? "..." : `₹${stats.todaySales.toLocaleString("en-IN")}`}
              icon={<FaDollarSign />}
              color="#0d9488"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div onClick={() => navigate("/orders")} style={{ cursor: "pointer" }}>
            <StatCard
              title="Orders"
              value={loading ? "..." : stats.orders}
              icon={<FaShoppingCart />}
              color="#10b981"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div onClick={() => navigate("/customers")} style={{ cursor: "pointer" }}>
            <StatCard
              title="Customers"
              value={loading ? "..." : stats.customers}
              icon={<FaUsers />}
              color="#f59e0b"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div onClick={() => navigate("/refunds")} style={{ cursor: "pointer" }}>
            <StatCard
              title="Refunds"
              value={loading ? "..." : stats.refunds}
              icon={<FaUndo />}
              color="#ef4444"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CashierDashboard;