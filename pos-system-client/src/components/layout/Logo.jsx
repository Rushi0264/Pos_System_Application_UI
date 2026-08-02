import { Typography } from "antd";

const { Title } = Typography;

const NexoraIcon = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="20" y1="0" x2="500" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#5eead4" />
        <stop offset="0.32" stopColor="#14b8a6" />
        <stop offset="0.68" stopColor="#0d9488" />
        <stop offset="1" stopColor="#053b32" />
      </linearGradient>
      <linearGradient id="glassTop" x1="0" y1="0" x2="0" y2="230" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.30" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="iconGrad" x1="150" y1="130" x2="370" y2="400" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#99f6e4" />
      </linearGradient>
      <radialGradient id="glow" cx="0.7" cy="0.14" r="0.55">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sparkGrad" x1="374" y1="96" x2="428" y2="150" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fef08a" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
    </defs>

    <rect width="512" height="512" rx="130" fill="url(#bgGrad)" />
    <rect width="512" height="512" rx="130" fill="url(#glow)" />
    <circle cx="460" cy="470" r="150" fill="#000000" opacity="0.10" />
    <circle cx="50" cy="30" r="115" fill="#ffffff" opacity="0.08" />
    <path d="M40 130C40 80.3 80.3 40 130 40H382C431.7 40 472 80.3 472 130V230H40V130Z" fill="url(#glassTop)" />
    <rect x="22" y="22" width="468" height="468" rx="112" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="4" />

    <path d="M158 372V140H206L322 314V140H360V372H312L196 198V372H158Z" fill="url(#iconGrad)" />

    <path d="M400 88l16 36 36 16-36 16-16 36-16-36-36-16 36-16z" fill="url(#sparkGrad)" />
  </svg>
);

const Logo = ({ collapsed }) => {
  return (
    <div
      style={{
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: 14,
        paddingLeft: collapsed ? 0 : 20,
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          width: collapsed ? 40 : 46,
          height: collapsed ? 40 : 46,
          animation: "nexoraFloat 3s ease-in-out infinite",
          flexShrink: 0,
        }}
      >
        <NexoraIcon size={collapsed ? 40 : 46} />
      </div>
      {!collapsed && (
        <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>
          Nexora<span style={{ color: "#5eead4" }}>POS</span>
        </span>
      )}
    </div>
  );
};

export default Logo;