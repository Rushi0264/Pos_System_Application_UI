import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Spin, Empty } from "antd";
import dashboardService from "../../services/dashboardService";

const currentMonthShort = new Date().toLocaleString("en-US", {
  month: "short",
});

const formatINR = (value) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: "8px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, color: "#111827" }}>
          {label}
        </p>
        <p style={{ margin: 0, color: "#0d9488" }}>
          ₹{Number(payload[0].value).toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getMonthlySales();
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: 330,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  const hasData = data.some((d) => d.totalSales > 0);

  if (!hasData) {
    return (
      <div
        style={{
          height: 330,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Empty description="No sales data available" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#0d9488" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="currentMonthColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.95} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.5} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="#eeeeee" vertical={false} />

        <XAxis dataKey="month" tick={{ fontSize: 13 }} />

        <YAxis
          tickFormatter={formatINR}
          tick={{ fontSize: 12 }}
          width={60}
        />

        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />

        <Bar dataKey="totalSales" radius={[6, 6, 0, 0]} barSize={32}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={
                entry.month === currentMonthShort
                  ? "url(#currentMonthColor)"
                  : "url(#salesColor)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;