import { useEffect, useState } from "react";
import { Card, Tabs, Form, Input, Button, message, Avatar, Row, Col } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, ShopOutlined, BellOutlined } from "@ant-design/icons";

import MainLayout from "../../layouts/MainLayout";
import settingsService from "../../services/settingsService";

const Settings = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [storeForm] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const [storeId, setStoreId] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("pos_user")) || {};
  const role = user.role;

  useEffect(() => {
    loadProfile();
    if (role === "ROLE_STORE_ADMIN") {
      loadStore();
    }
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getProfile();

      setUserId(data.id);

      profileForm.setFieldsValue({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      });
    } catch (error) {
      message.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const loadStore = async () => {
    try {
      const store = await settingsService.getMyStore();
      setStoreId(store.id);
      storeForm.setFieldsValue({
        storeName: store.storeName,
        gstin: store.gstin,
        taxRate: store.taxRate,
      });
    } catch (error) {
      message.error("Unable to load store details");
    }
  };

  const handleProfileUpdate = async (values) => {
    try {
      setSaving(true);
      await settingsService.updateProfile(userId, values);
      message.success("Profile updated successfully");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      setSaving(true);
      await settingsService.updateProfile(userId, {
        password: values.newPassword,
      });
      message.success("Password changed successfully");
      passwordForm.resetFields();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleStoreSettingsSave = async (values) => {
    try {
      setSaving(true);
      await settingsService.updateStoreSettings(storeId, values);
      message.success("Store settings updated");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to update store settings"
      );
    } finally {
      setSaving(false);
    }
  };

  const tabItems = [
    {
      key: "profile",
      label: "Profile",
      children: (
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleProfileUpdate}
          style={{ maxWidth: 480 }}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input prefix={<UserOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              size="large"
              disabled={role !== "ROLE_SUPER_ADMIN"}
            />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input
              prefix={<PhoneOutlined />}
              size="large"
              maxLength={10}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                profileForm.setFieldValue("phone", onlyDigits);
              }}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save Changes
          </Button>
        </Form>
      ),
    },
    {
      key: "password",
      label: "Change Password",
      children: (
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
          style={{ maxWidth: 480 }}
        >
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm password" }]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Update Password
          </Button>
        </Form>
      ),
    },
  ];

  // Role-specific tab: Store Admin only gets store-level settings
  if (role === "ROLE_STORE_ADMIN") {
    tabItems.push({
      key: "store",
      label: "Store Settings",
      children: (
        <Form
          form={storeForm}
          layout="vertical"
          onFinish={handleStoreSettingsSave}
          style={{ maxWidth: 480 }}
        >
          <Form.Item label="Store Name" name="storeName">
            <Input prefix={<ShopOutlined />} size="large" />
          </Form.Item>

          <Form.Item label="GSTIN" name="gstin">
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Default Tax Rate (%)" name="taxRate">
            <Input type="number" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save Store Settings
          </Button>
        </Form>
      ),
    });
  }

  // Role-specific tab: Cashier / Branch Manager get simple preferences
  if (role === "ROLE_BRANCH_CASHIER" || role === "ROLE_BRANCH_MANAGER") {
    tabItems.push({
      key: "preferences",
      label: "Preferences",
      children: (
        <Form layout="vertical" style={{ maxWidth: 480 }}>
          <Form.Item label="Receipt Print Size" name="printSize">
            <Input placeholder="Thermal / A4" prefix={<BellOutlined />} size="large" />
          </Form.Item>

          <Button type="primary" size="large">
            Save Preferences
          </Button>
        </Form>
      ),
    });
  }

  return (
    <MainLayout>
      <Card
        loading={loading}
        bordered={false}
        style={{ borderRadius: 20, marginBottom: 24 }}
      >
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar size={64} style={{ background: "#0d9488", fontSize: 28 }}>
              <UserOutlined />
            </Avatar>
          </Col>
          <Col>
            <h2 style={{ margin: 0 }}>Account Settings</h2>
            <p style={{ margin: 0, color: "#6b7280" }}>
              Manage your profile and security preferences
            </p>
          </Col>
        </Row>
      </Card>

      <Card bordered={false} style={{ borderRadius: 20 }}>
        <Tabs items={tabItems} />
      </Card>
    </MainLayout>
  );
};

export default Settings;