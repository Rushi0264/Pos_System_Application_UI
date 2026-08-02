import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Avatar } from "antd";
import StatCard from "../../ui/StatCard";
import { FaWallet, FaChartLine, FaShoppingBag, FaUndo } from "react-icons/fa";
import storeService from "../../../services/storeService";
import {
  getAccountantStats,
  getPaymentMethods,
  getRecentActivity,
} from "../../../api/dashboardApi";

const AccountantDashboard = () => {
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("pos_user")) || {};
  const [stats, setStats] = useState({
    totalRevenue: 0,
    todayRevenue: 0,
    totalPurchases: 0,
    totalRefunds: 0,
  });
  const [loading, setLoading] = useState(true);
  const [storeName, setStoreName] = useState("");

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchPaymentMethods();
    fetchStoreName();
    //fetchActivity();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getAccountantStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const data = await getPaymentMethods();
      setPaymentMethods(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStoreName = async () => {
    try {
      const myStore = await storeService.getMyStore();
      setStoreName(myStore?.name || myStore?.brand || "");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivity = async () => {
    try {
      const data = await getRecentActivity();
      setActivity(data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (val) =>
    `₹${Number(val || 0).toLocaleString("en-IN")}`;

  return (
    <div>
      <Card
        variant={false}
        style={{
          borderRadius: 20,
          marginBottom: 24,
          background: "linear-gradient(135deg,#6366f1,#4338ca)",
          boxShadow: "0 15px 35px rgba(99,102,241,.25)",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h1
  style={{
    color: "#fff",
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 6,
  }}
>
  {user?.fullName || "Accountant"}
</h1>
            <p style={{ color: "#E5E7EB", fontSize: 15, margin: 0 }}>
              Track revenue, expenses and payments at a glance.
            </p>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Avatar
              size={70}
              style={{ background: "rgba(255,255,255,.15)", fontSize: 32 }}
            >
              <FaWallet />
            </Avatar>
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
              {storeName || "—"}
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Revenue"
            value={loading ? "..." : formatCurrency(stats.totalRevenue)}
            icon={<FaChartLine />}
            color="#10b981"
            onClick={() => navigate("/orders")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Today's Revenue"
            value={loading ? "..." : formatCurrency(stats.todayRevenue)}
            icon={<FaWallet />}
            color="#6366f1"
            onClick={() => navigate("/orders")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Purchases (Expense)"
            value={loading ? "..." : formatCurrency(stats.totalPurchases)}
            icon={<FaShoppingBag />}
            color="#f59e0b"
            onClick={() => navigate("/purchases")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Refunds"
            value={loading ? "..." : formatCurrency(stats.totalRefunds)}
            icon={<FaUndo />}
            color="#ef4444"
            onClick={() => navigate("/refunds")}
          />
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 24 }}>
        {/* Payment Method Breakdown */}
        <Col xs={24} lg={12}>
          <Card
            variant={false}
            title="Payment Method Breakdown"
            style={{
              borderRadius: 20,
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            {paymentMethods.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: "14px" }}>
                No payment data found.
              </p>
            ) : (
              paymentMethods.map((pm, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom:
                      index !== paymentMethods.length - 1
                        ? "1px solid #f1f5f9"
                        : "none",
                  }}
                >
                  <span style={{ color: "#111827", fontWeight: 500 }}>
                    {pm.type}
                  </span>
                  <span style={{ color: "#6b7280" }}>
                    {pm.count} orders ({pm.percentage}%)
                  </span>
                </div>
              ))
            )}
          </Card>
        </Col>

        {/* Recent Activity */}
        {/*<Col xs={24} lg={12}>
          <Card
            bordered={false}
            title="Recent Transactions"
            style={{
              borderRadius: 20,
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            {activity.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: "14px" }}>
                No recent activity found.
              </p>
            ) : (
              activity.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom:
                      index !== activity.length - 1
                        ? "1px solid #f1f5f9"
                        : "none",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 500,
                        color: "#111827",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: "13px",
                        color: "#6b7280",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {formatCurrency(item.amount)}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: "12px",
                        color: "#9ca3af",
                      }}
                    >
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </Card>
        </Col>*/}
      </Row>
    </div>
  );
};

export default AccountantDashboard;