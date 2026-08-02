import { Layout, Button, Avatar, Space } from "antd";
import NotificationMenu from "../dashboard/NotificationMenu";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { storage } from "../../utils/storage";
import SearchBar from "../dashboard/SearchBar";
import UserMenu from "./UserMenu";

const { Header } = Layout;

const Navbar = ({ collapsed, setCollapsed }) => {
  const user = storage.getUser();

  // Name
  const userName =
    user?.fullName ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.name ||
    "User";

  // Role
  const userRole = user?.role
    ? user.role
        .replace("ROLE_", "")
        .split("_")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(" ")
    : "";

  return (
    <Header
      style={{
        background: "#ffffff",
        height: 70,
        padding: "0 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      {/* Left Side */}
      <Space size={20}>
        <Button
          type="text"
          size="large"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
        />

        <SearchBar />
      </Space>

      {/* Right Side */}
      <Space size={24}>
        <NotificationMenu />

        {/* Logged In User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Avatar
            size={42}
            style={{
              background: "#16a34a",
              fontWeight: 700,
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </Avatar>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.2,
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: "#1f2937",
                fontSize: 15,
              }}
            >
              {userName}
            </span>

            <span
              style={{
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              {userRole}
            </span>
          </div>
        </div>

        
      </Space>
    </Header>
  );
};

export default Navbar;