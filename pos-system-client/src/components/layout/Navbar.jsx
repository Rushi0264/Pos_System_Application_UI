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

const Navbar = ({ collapsed, setCollapsed, isMobile }) => {
  const user = storage.getUser();

  const userName =
    user?.fullName ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.name ||
    "User";

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
        padding: isMobile ? "0 12px" : "0 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      <Space size={isMobile ? 8 : 20} style={{ minWidth: 0, flex: 1 }}>
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
          style={{ flexShrink: 0 }}
        />

<div className="navbar-search-wrap" style={{ minWidth: 0 }}>
  <SearchBar isMobile={isMobile} />
</div>
      </Space>

      <Space size={isMobile ? 10 : 24} style={{ flexShrink: 0 }}>
        <NotificationMenu />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Avatar
            size={isMobile ? 36 : 42}
            style={{
              background: "#16a34a",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </Avatar>

          {!isMobile && (
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
          )}
        </div>
      </Space>
    </Header>
  );
};

export default Navbar;