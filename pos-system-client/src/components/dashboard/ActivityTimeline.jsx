import { useEffect, useState } from "react";
import { Timeline, Tag, Spin, Empty } from "antd";
import { ShoppingCartOutlined, RollbackOutlined } from "@ant-design/icons";
import dashboardService from "../../services/dashboardService";

const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const ActivityTimeline = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getRecentActivity();
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin />;

  if (!data.length) return <Empty description="No recent activity" />;

  return (
    <Timeline
      items={data.map((item) => ({
        color: item.type === "REFUND" ? "red" : "green",
        icon:
          item.type === "REFUND" ? (
            <RollbackOutlined style={{ fontSize: 16 }} />
          ) : (
            <ShoppingCartOutlined style={{ fontSize: 16 }} />
          ),
        content: (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{item.title}</strong>
              <span style={{ color: "#999", fontSize: 12 }}>
                {timeAgo(item.timestamp)}
              </span>
            </div>

            <div style={{ color: "#666", fontSize: 13 }}>
              {item.description}
            </div>

            <div style={{ marginTop: 4 }}>
              <Tag color={item.type === "REFUND" ? "red" : "blue"}>
                ₹{item.amount}
              </Tag>
              {item.actor && (
                <span style={{ fontSize: 12, color: "#999" }}>
                  by {item.actor}
                </span>
              )}
            </div>
          </div>
        ),
      }))}
    />
  );
};

export default ActivityTimeline;