import { motion } from "framer-motion";
import {
  ShoppingCartOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import "./Features.css";

const features = [
  {
    icon: <ShoppingCartOutlined />,
    title: "Fast Billing",
    desc: "Lightning fast checkout with barcode support.",
  },
  {
    icon: <DatabaseOutlined />,
    title: "Inventory",
    desc: "Track stock across multiple stores in real time.",
  },
  {
    icon: <BarChartOutlined />,
    title: "Analytics",
    desc: "Powerful reports with sales insights.",
  },
  {
    icon: <TeamOutlined />,
    title: "Staff Management",
    desc: "Manage employees and role permissions.",
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: "Secure Access",
    desc: "JWT authentication with role-based security.",
  },
  {
    icon: <ShopOutlined />,
    title: "Multi Store",
    desc: "Manage unlimited stores and branches.",
  },
];

function Features() {
  return (
    <motion.section
      className="features"
      id="features"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
    >
      <h2>Everything You Need</h2>

      <p>
        Enterprise-grade tools to manage your entire retail business.
      </p>

      <div className="feature-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default Features;