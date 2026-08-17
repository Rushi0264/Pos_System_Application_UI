import { Layout, Button, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { storage } from "../utils/storage";
import supportService from "../services/supportService";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [storeStatus, setStoreStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [sending, setSending] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    const user = storage.getUser();
    const status = user?.storeStatus;
    setStoreStatus(status);

    if (status === "BLOCKED") {
      setStatusMessage(
        "Your store account has been blocked. Please contact support to resolve this."
      );
    } else if (status === "PENDING") {
      setStatusMessage(
        "Your store account is pending approval. Please contact support for more details."
      );
    }
  }, []);

  const isRestricted = storeStatus === "BLOCKED" || storeStatus === "PENDING";

  const handleContactSupport = async () => {
    if (sending) return;
    setSending(true);
    try {
      await supportService.contactSupport({
        subject: `Store Access ${storeStatus} Request`,
        message: statusMessage,
      });

      message.success(
        "Support request sent successfully. Please login again once your account is approved."
      );

   
      setTimeout(() => {
  sessionStorage.clear();     
  navigate("/login");
}, 1500);

    } catch (error) {
      message.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to send support request."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Sidebar collapsed={collapsed} />

      <Layout
        style={{
          background: "#f5f7fb",
          marginLeft: collapsed ? 80 : 260,
          transition: "margin-left 0.2s",
        }}
      >
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <div style={{ position: "relative" }}>
          {isRestricted && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 2000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(15,23,42,0.35)",
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "40px 48px",
                  textAlign: "center",
                  boxShadow: "0 25px 60px rgba(0,0,0,.25)",
                  maxWidth: 420,
                }}
              >
                <LockOutlined style={{ fontSize: 40, color: "#ef4444" }} />
                <h2 style={{ marginTop: 16 }}>Store Access Restricted</h2>
                <p style={{ color: "#64748b" }}>{statusMessage}</p>
                <Button
                  type="primary"
                  danger
                  loading={sending}
                  style={{ marginTop: 12 }}
                  onClick={handleContactSupport}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          )}

          <Content
            style={{
              margin: "24px",
              padding: "24px",
              background: "#f5f7fb",
              minHeight: "calc(100vh - 88px)",
              overflow: "auto",
              filter: isRestricted ? "blur(6px)" : "none",
              pointerEvents: isRestricted ? "none" : "auto",
              userSelect: isRestricted ? "none" : "auto",
            }}
          >
            {children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;