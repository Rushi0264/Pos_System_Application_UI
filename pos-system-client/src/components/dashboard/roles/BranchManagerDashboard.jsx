import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Avatar, Skeleton, Alert } from "antd";
import StatCard from "../../ui/StatCard";
import { getDashboardStats } from "../../../api/dashboardApi";

import {
  FaShoppingCart,
  FaBoxes,
  FaUsers,
  FaDollarSign,
  FaCodeBranch,
} from "react-icons/fa";

export default function BranchManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem("pos_user")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        if (isMounted) {
          setStats(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load dashboard stats");
          console.error(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const branchName = user?.branchName || "";
  const storeBrand = user?.storeBrand || "";

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
              {user?.fullName || "Manager"}
            </h1>
            <p style={{ color: "#E5E7EB", fontSize: 15, margin: 0 }}>
              Monitor today's activity for {branchName || "your branch"}.
            </p>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Avatar size={70} style={{ background: "rgba(255,255,255,.15)", fontSize: 32 }}>
              <FaCodeBranch />
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
          </Col>
        </Row>
      </Card>

      {error && (
        <Alert
          type="error"
          message={error}
          style={{ marginBottom: 20, borderRadius: 12 }}
          showIcon
        />
      )}

      {loading ? (
        <Row gutter={[20, 20]}>
          {[1, 2, 3, 4].map((i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <Card style={{ borderRadius: 16 }}>
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Today's Sales"
              value={`₹${(stats?.todaySales ?? 0).toLocaleString("en-IN")}`}
              icon={<FaDollarSign />}
              color="#0d9488"
              growth={stats?.salesGrowth ? `+${stats.salesGrowth}%` : undefined}
              onClick={() => navigate("/orders")}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Today's Orders"
              value={stats?.orders ?? 0}
              icon={<FaShoppingCart />}
              color="#10b981"
              growth={stats?.ordersGrowth ? `+${stats.ordersGrowth}%` : undefined}
              onClick={() => navigate("/orders?filter=today")} 
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Stock"
              value={stats?.stock ?? 0}
              icon={<FaBoxes />}
              color="#8b5cf6"
              growth={stats?.stockGrowth ? `+${stats.stockGrowth}%` : undefined}
              onClick={() => navigate("/inventory")}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Today's Customers"
              value={stats?.customers ?? 0}
              icon={<FaUsers />}
              color="#f59e0b"
              growth={stats?.customersGrowth ? `+${stats.customersGrowth}%` : undefined}
              onClick={() => navigate("/customers?filter=today")}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}