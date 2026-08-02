import { Row, Col, Card, Button, Avatar, Table, Tag, message, Popconfirm } from "antd";
import { motion } from "framer-motion";
import {
  FaStore,
  FaCheckCircle,
  FaClock,
  FaCodeBranch,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import dashboardService from "../../../services/dashboardService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("pos_user")) || {};

const STATUS_COLORS = {
  ACTIVE: "#10b981",
  BLOCKED: "#ef4444",
  PENDING: "#f59e0b",
  UNKNOWN: "#94a3b8",
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

// ---------- Animated Stat Card ----------
const GlowStatCard = ({ title, value, icon, gradient, onClick, index }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="show"
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onClick={onClick}
    style={{
      cursor: "pointer",
      borderRadius: 20,
      padding: "22px 24px",
      background: "#fff",
      boxShadow: "0 8px 24px rgba(15,23,42,.06)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -30,
        right: -30,
        width: 110,
        height: 110,
        borderRadius: "50%",
        background: gradient,
        opacity: 0.12,
      }}
    />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ color: "#64748b", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
          {title}
        </p>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.2 }}
          style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", margin: 0 }}
        >
          {value}
        </motion.h2>
      </div>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 20,
          boxShadow: "0 8px 16px rgba(0,0,0,.12)",
        }}
      >
        {icon}
      </div>
    </div>
  </motion.div>
);

// ---------- Custom Tooltip for Bar Chart ----------
const GrowthTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: 10,
        fontSize: 13,
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 2 }}>{label}</div>
      <div style={{ color: "#5eead4" }}>{payload[0].value} new store(s)</div>
    </div>
  );
};

// ---------- Custom Tooltip for Pie Chart ----------
const StatusTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: 10,
        fontSize: 13,
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      }}
    >
      <div style={{ fontWeight: 700 }}>{d.type}</div>
      <div style={{ color: "#5eead4" }}>
        {d.count} store(s) · {d.percentage}%
      </div>
    </div>
  );
};

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStores: 0,
    activeStores: 0,
    pendingStores: 0,
    totalBranches: 0,
  });

  const [recentStores, setRecentStores] = useState([]);
  const [storeGrowth, setStoreGrowth] = useState([]);
  const [storeStatus, setStoreStatus] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsData, recentData, growthData, statusData] = await Promise.all([
        dashboardService.getSuperAdminDashboard(),
        dashboardService.getRecentStores(),
        dashboardService.getStoreGrowth(),
        dashboardService.getStoreStatusBreakdown(),
      ]);

      setStats(statsData);
      setRecentStores(recentData);
      setStoreGrowth(growthData);
      setStoreStatus(statusData);
    } catch (error) {
      console.log(error);
    }
  };

  //  Approve / Reject handler
const handleModerateStore = async (storeId, status) => {
  try {
    const token = localStorage.getItem("pos_token");

    await axios.put(
      `http://localhost:8080/api/stores/${storeId}/moderate?status=${status}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    message.success(
      status === "ACTIVE"
        ? "Store approved. User notified via email."
        : "Store blocked. User notified via email."
    );

    loadDashboard();
  } catch (err) {
    console.log(err);
    message.error("Failed to update store status.");
  }
};

  const totalStoresInPie = storeStatus.reduce((sum, s) => sum + (s.count || 0), 0);

  const columns = [
    { title: "Brand", dataIndex: "brand" },
    { title: "Type", dataIndex: "storeType" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          style={{
            borderRadius: 20,
            padding: "2px 12px",
            fontWeight: 600,
            border: "none",
            background: `${STATUS_COLORS[status] || "#94a3b8"}20`,
            color: STATUS_COLORS[status] || "#94a3b8",
          }}
        >
          {status}
        </Tag>
      ),
    },
   
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          {record.status !== "ACTIVE" && (
            <Popconfirm
              title="Approve this store?"
              onConfirm={() => handleModerateStore(record.id, "ACTIVE")}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" size="small">
                Approve
              </Button>
            </Popconfirm>
          )}

          {record.status !== "BLOCKED" && (
            <Popconfirm
              title="Block/Reject this store?"
              onConfirm={() => handleModerateStore(record.id, "BLOCKED")}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small">
                Reject
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100%" }}>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          bordered={false}
          style={{
            borderRadius: 24,
            marginBottom: 30,
            background: "linear-gradient(135deg,#0d9488,#059669 60%,#10b981)",
            color: "#fff",
            boxShadow: "0 15px 35px rgba(13,148,136,.25)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: -40,
              right: 80,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "rgba(255,255,255,.08)",
            }}
          />
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: -60,
              right: 220,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,.06)",
            }}
          />

          <Row justify="space-between" align="middle">
            <Col>
              <h1 style={{ color: "#fff", fontSize: 34, fontWeight: 700, marginBottom: 10 }}>
                Good to see you, {user?.fullName || "Admin"} ✨
              </h1>
              <p style={{ color: "#E5E7EB", fontSize: 16, maxWidth: 600 }}>
                Manage every business on the platform — onboard new stores,
                monitor status, and keep everything running smoothly.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/stores")}
                  style={{
                    marginTop: 20,
                    background: "#a6a6a6",
                    color: "#0c211f",
                    border: "none",
                    fontWeight: 700,
                    boxShadow: "0 6px 18px rgba(166, 162, 143, 0.35)",
                  }}
                >
                  Manage Stores
                </Button>
              </motion.div>
            </Col>
            <Col>
              <motion.div
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Avatar size={95} style={{ background: "rgba(255,255,255,.15)", fontSize: 45 }}>
                  <FaStore />
                </Avatar>
              </motion.div>
            </Col>
          </Row>
        </Card>
      </motion.div>

      {/* Platform Level Stats */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <GlowStatCard
            index={0}
            title="Total Stores"
            value={stats.totalStores ?? 0}
            icon={<FaStore />}
            gradient="linear-gradient(135deg,#2563eb,#3b82f6)"
            onClick={() => navigate("/stores")}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <GlowStatCard
            index={1}
            title="Active Stores"
            value={stats.activeStores ?? 0}
            icon={<FaCheckCircle />}
            gradient="linear-gradient(135deg,#10b981,#34d399)"
            onClick={() => navigate("/stores")}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <GlowStatCard
            index={2}
            title="Pending / Blocked"
            value={stats.pendingStores ?? 0}
            icon={<FaClock />}
            gradient="linear-gradient(135deg,#f59e0b,#fbbf24)"
            onClick={() => navigate("/stores")}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <GlowStatCard
            index={3}
            title="Total Branches"
            value={stats.totalBranches ?? 0}
            icon={<FaCodeBranch />}
            gradient="linear-gradient(135deg,#8b5cf6,#a78bfa)"
            onClick={() => navigate("/branches")}
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -3 }}
          >
            <Card
              bordered={false}
              title="Store Growth (New Stores per Month)"
              style={{ borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
            >
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={storeGrowth}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity={1} />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity={0.85} />
                    </linearGradient>
                    <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0d9488" floodOpacity="0.35" />
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(13,148,136,.06)" }} content={<GrowthTooltip />} />
                  <Bar
                    dataKey="totalSales"
                    fill="url(#growthGradient)"
                    radius={[10, 10, 0, 0]}
                    animationDuration={1400}
                    animationEasing="ease-out"
                    maxBarSize={46}
                    style={{ filter: "url(#barGlow)" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ y: -3 }}
          >
            <Card
              bordered={false}
              title="Store Status Breakdown"
              style={{ borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
            >
              <div style={{ position: "relative" }}>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={storeStatus}
                      dataKey="count"
                      nameKey="type"
                      innerRadius={62}
                      outerRadius={98}
                      paddingAngle={storeStatus.length > 1 ? 4 : 0}
                      cornerRadius={storeStatus.length > 1 ? 8 : 0}
                      animationDuration={1200}
                      animationEasing="ease-out"
                      animationBegin={200}
                    >
                      {storeStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={STATUS_COLORS[entry.type] || "#94a3b8"}
                          stroke="#fff"
                          strokeWidth={3}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<StatusTooltip />} />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center label overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  style={{
                    position: "absolute",
                    top: "44%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>
                    {totalStoresInPie}
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>
                    STORES
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Recently Onboarded Stores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card
              bordered={false}
              title="Recently Onboarded Stores"
              style={{ borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,.08)" }}
            >
              <Table
                rowKey="id"
                columns={columns}
                dataSource={recentStores}
                pagination={false}
                rowClassName={() => "dashboard-row-hover"}
              />
            </Card>
          </Col>
        </Row>
      </motion.div>

      <style>{`
        .dashboard-row-hover:hover {
          background: #f0fdfa !important;
          transition: background 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;