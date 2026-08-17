import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Avatar } from "antd";
import StatCard from "../../ui/StatCard";
import { FaBoxes, FaExclamationTriangle, FaTimesCircle, FaTruck } from "react-icons/fa";
import {
  getInventoryManagerStats,
  getRecentStockActivity,
} from "../../../api/dashboardApi";
import storeService from "../../../services/storeService";


const InventoryDashboard = () => {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");

  const user = JSON.parse(sessionStorage.getItem("pos_user")) || {};
  const [stats, setStats] = useState({
    totalStock: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    incomingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  const [activity, setActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchActivity();
    fetchStoreName();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getInventoryManagerStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivity = async () => {
    try {
      const data = await getRecentStockActivity();
      setActivity(data);
    } catch (error) {
      console.error(error);
    } finally {
      setActivityLoading(false);
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

  return (
    <div>
      <Card
        variant={false}
        style={{
          borderRadius: 20,
          marginBottom: 24,
          background: "linear-gradient(135deg,#10b981,#059669)",
          boxShadow: "0 15px 35px rgba(16,185,129,.25)",
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
     {user?.fullName || "Inventory Manager"}
</h1>
            <p style={{ color: "#E5E7EB", fontSize: 15, margin: 0 }}>
              Monitor stock levels and inventory activity at a glance.
            </p>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Avatar
              size={70}
              style={{ background: "rgba(255,255,255,.15)", fontSize: 32 }}
            >
              <FaBoxes />
              
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
            title="Total Stock"
            value={loading ? "..." : stats.totalStock}
            icon={<FaBoxes />}
            color="#10b981"
            onClick={() => navigate("/inventory")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Low Stock Items"
            value={loading ? "..." : stats.lowStockCount}
            icon={<FaExclamationTriangle />}
            color="#f59e0b"
            onClick={() => navigate("/inventory?filter=low")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Out of Stock"
            value={loading ? "..." : stats.outOfStockCount}
            icon={<FaTimesCircle />}
            color="#ef4444"
            onClick={() => navigate("/inventory?filter=out")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Incoming Orders"
            value={loading ? "..." : stats.incomingOrders}
            icon={<FaTruck />}
            color="#6366f1"
            onClick={() => navigate("/purchases")}
          />
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card
            variant={false}
            title="Recent Stock Activity"
            style={{
              borderRadius: 20,
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            {activityLoading ? (
              <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
                Loading...
              </p>
            ) : activity.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
                No recent stock activity found.
              </p>
            ) : (
              <div>
                {activity.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
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
                        {item.productName}
                      </p>
                      <p
                        style={{
                          margin: "2px 0 0",
                          fontSize: "13px",
                          color: "#6b7280",
                        }}
                      >
                        {item.branchName}
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
                        Qty: {item.quantity}
                      </p>
                      <p
                        style={{
                          margin: "2px 0 0",
                          fontSize: "12px",
                          color: "#9ca3af",
                        }}
                      >
                        {item.lastUpdate
                          ? new Date(item.lastUpdate).toLocaleString()
                          : "-"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InventoryDashboard;
