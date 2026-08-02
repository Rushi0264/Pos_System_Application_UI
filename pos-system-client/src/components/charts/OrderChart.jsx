import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Spin } from "antd";
import dashboardService from "../../services/dashboardService";

const COLORS = ["#0d9488", "#3b82f6", "#f59e0b", "#ef4444"];

const OrderChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getPaymentMethods();
      setData(
        res.map((item) => ({
          name: item.type,
          value: item.percentage,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin />;

  return (
    <ResponsiveContainer width="100%" height={330}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={110}
          paddingAngle={5}
          dataKey="value"
          label={({ value }) => `${value}%`}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip formatter={(value) => `${value}%`} />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OrderChart;