import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Avatar, message } from "antd";
import StatCard from "../../ui/StatCard";
import productService from "../../../services/productService";
import employeeService from "../../../services/employeeService";
import branchService from "../../../services/branchService";
import storeService from "../../../services/storeService";
import { getAllOrders } from "../../../services/orderService";

import SalesChart from "../../charts/SalesChart";
import OrderChart from "../../charts/OrderChart";
import RecentOrdersTable from "../../tables/RecentOrdersTable";
import LowStockTable from "../../tables/LowStockTable";
import ActivityTimeline from "../ActivityTimeline";

import {
  FaStore,
  FaBoxes,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

const user = JSON.parse(sessionStorage.getItem("pos_user")) || {};

const StoreAdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    revenue: 0,
    products: 0,
    employees: 0,
    branches: 0,
  });
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [products, employees, branches, orders, myStore] = await Promise.all([
          productService.getAllProducts(),
          employeeService.getAllEmployees(),
          branchService.getAllBranches(),
          getAllOrders(),
          storeService.getMyStore(),
        ]);

        const totalRevenue = (orders || []).reduce(
          (sum, order) => sum + (order.totalAmount || 0),
          0
        );

        setStats({
          revenue: totalRevenue,
          products: (products || []).length,
          employees: (employees || []).filter(
            (e) => e.role !== "ROLE_SUPER_ADMIN"
          ).length,
          branches: (branches || []).length,
        });

        setStoreName(myStore?.name || myStore?.brand || "");
      } catch (error) {
        message.error("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

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
              {user?.fullName || "User"}
            </h1>
            <p style={{ color: "#E5E7EB", fontSize: 15, margin: 0 }}>
              Overview of your store's performance and operations.
            </p>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Avatar size={70} style={{ background: "rgba(255,255,255,.15)", fontSize: 32 }}>
              <FaStore />
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
            title="Revenue"
            value={loading ? "..." : `₹${stats.revenue.toLocaleString("en-IN")}`}
            icon={<FaDollarSign />}
            color="#0d9488"
            onClick={() => navigate("/payments")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Products"
            value={loading ? "..." : stats.products}
            icon={<FaBoxes />}
            color="#8b5cf6"
            onClick={() => navigate("/products")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Employees"
            value={loading ? "..." : stats.employees}
            icon={<FaUsers />}
            color="#f59e0b"
            onClick={() => navigate("/employees")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Branches"
            value={loading ? "..." : stats.branches}
            icon={<FaStore />}
            color="#10b981"
            onClick={() => navigate("/branches")}
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            variant={false}
            title="Sales Analytics"
            style={{ borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
          >
            <SalesChart />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            variant={false}
            title="Payment Methods"
            style={{ borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
          >
            <OrderChart />
          </Card>
        </Col>
      </Row>

      {/* Tables */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={14}>
          <Card variant={false} title="Recent Orders" style={{ borderRadius: 20 }}>
            <RecentOrdersTable />
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card variant={false} title="Low Stock Products" style={{ borderRadius: 20 }}>
            <LowStockTable />
          </Card>
        </Col>
      </Row>

      {/* Timeline */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <ActivityTimeline />
        </Col>
      </Row>
    </div>
  );
};

export default StoreAdminDashboard;