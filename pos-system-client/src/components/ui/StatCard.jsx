import { useState } from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

// Helper: darken a hex color slightly for gradient depth
const shadeColor = (hex, percent) => {
  try {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.min(255, Math.max(0, Math.floor(r * (1 + percent))));
    g = Math.min(255, Math.max(0, Math.floor(g * (1 + percent))));
    b = Math.min(255, Math.max(0, Math.floor(b * (1 + percent))));

    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return hex;
  }
};

const StatCard = ({
  title,
  value,
  icon,
  color = "#1677ff",
  growth,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      variant={false}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        boxShadow: hovered
          ? "0 18px 40px rgba(0,0,0,0.12)"
          : "0 10px 30px rgba(0,0,0,0.08)",
        transition: "all .3s ease",
        cursor: onClick ? "pointer" : "default",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        overflow: "hidden",
        position: "relative",
      }}
      bodyStyle={{
        padding: 24,
      }}
    >
      {/* subtle background accent */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}22, transparent)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <Text
            style={{
              color: "#6b7280",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: 0.2,
            }}
          >
            {title}
          </Text>

          <Title
            level={2}
            style={{
              margin: "12px 0 6px",
              color: "#111827",
              fontWeight: 700,
            }}
          >
            {value}
          </Title>

          {growth && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: "#dcfce7",
                color: "#16a34a",
                fontWeight: 600,
                fontSize: 12,
                padding: "3px 10px",
                borderRadius: 999,
              }}
            >
              ▲ {growth} this month
            </span>
          )}
        </div>

        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: "18px",
            background: `linear-gradient(135deg, ${color}, ${shadeColor(
              color,
              -0.25
            )})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: 28,
            boxShadow: `0 10px 20px ${color}55`,
            transition: "transform .3s ease",
            transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1)",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;