import { useEffect, useState } from "react";
import {
  Badge,
  Dropdown,
  List,
  Typography,
  Tag,
  Button,
  Modal,
  Empty,
  Spin,
  message,
} from "antd";
import { BellOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

import notificationService from "../../services/notificationService";
import storeService from "../../services/storeService";

const NotificationMenu = () => {
  const user = JSON.parse(sessionStorage.getItem("pos_user"));

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [contactLoading, setContactLoading] = useState(false);

  const fetchNotifications = async () => {
  const branchId = user?.branchId || user?.branch?.id;
  const storeId = user?.storeId || user?.store?.id;

  const storeLevelRoles = ["ROLE_STORE_ADMIN", "ROLE_ACCOUNTANT"];
  const isStoreLevel = storeLevelRoles.includes(user.role);

  if (isStoreLevel && !storeId) return;
  if (!isStoreLevel && !branchId) return;

  try {
    setLoading(true);

    let data;
    if (isStoreLevel) {
      data = await notificationService.getNotificationsByStore(storeId);
    } else {
      data = await notificationService.getNotificationsByBranch(branchId);
    }

    setNotifications(data);
  } catch (error) {
    console.error("Unable to load notifications", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      message.error("Unable to update notification");
    }
  };

  const handleContactAdmin = async () => {
    const storeId = user?.storeId || user?.store?.id || user?.branch?.storeId;

    if (!storeId) {
      message.error("Store information not available");
      return;
    }

    try {
      setContactLoading(true);
      setContactModalOpen(true);

      const data = await storeService.getStoreAdminsContact(storeId);
      setAdmins(data);

    } catch (error) {
      message.error("Unable to load admin contact details");
    } finally {
      setContactLoading(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const menu = (
    <div
      style={{
        width: "min(360px, 68vw)",
        maxHeight: 420,
        overflowY: "auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        padding: 10,
      }}
    >
      <Typography.Title level={5} style={{ marginBottom: 8 }}>
        Notifications
      </Typography.Title>

      {loading ? (
        <div style={{ textAlign: "center", padding: 20 }}>
          <Spin size="small" />
        </div>
      ) : notifications.length === 0 ? (
        <Empty description="No notifications" style={{ padding: 20 }} />
      ) : (
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              onClick={() => !item.isRead && handleMarkAsRead(item.id)}
              style={{
                cursor: "pointer",
                background: item.isRead ? "#fff" : "#f6ffed",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 4,
              }}
            >
              <List.Item.Meta
                title={
                  <span>
                    {item.type === "LOW_STOCK" && (
                      <Tag color="red" style={{ marginRight: 6 }}>
                        Low Stock
                      </Tag>
                    )}
                    {item.productName}
                  </span>
                }
                description={
                  <>
                    <Typography.Text type="secondary">
                      {item.message}
                    </Typography.Text>

                    {item.type === "LOW_STOCK" && (
                      <div style={{ marginTop: 6 }}>
                        <Button
                          size="small"
                          type="link"
                          style={{ padding: 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContactAdmin();
                          }}
                        >
                          Contact Store Admin
                        </Button>
                      </div>
                    )}
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );

  return (
    <>
      <Dropdown
        popupRender={() => menu}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Badge count={unreadCount}>
          <BellOutlined
            style={{
              fontSize: 22,
              cursor: "pointer",
            }}
          />
        </Badge>
      </Dropdown>

      <Modal
        title="Store Admin Contact"
        open={contactModalOpen}
        onCancel={() => setContactModalOpen(false)}
        footer={null}
      >
        {contactLoading ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <Spin />
          </div>
        ) : admins.length === 0 ? (
          <Empty description="No store admin found" />
        ) : (
          <List
            dataSource={admins}
            renderItem={(admin) => (
              <List.Item>
                <List.Item.Meta
                  title={admin.fullName}
                  description={
                    <>
                      <div>
                        <PhoneOutlined /> {admin.phone}
                      </div>
                      <div>
                        <MailOutlined /> {admin.email}
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Modal>
    </>
  );
};

export default NotificationMenu;