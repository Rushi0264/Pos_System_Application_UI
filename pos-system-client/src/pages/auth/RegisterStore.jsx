import { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { registerStoreService } from "../../services/authService";
import FloatingBackground from "../../components/auth/FloatingBackground";

const titleText = "Register Your Store";

const RegisterStore = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.ownerPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        brand: values.brand,
        storeType: values.storeType,
        description: values.description,
        address: values.address,
        phone: values.storePhone,
        email: values.storeEmail,
        ownerFullName: values.ownerFullName,
        ownerEmail: values.ownerEmail,
        ownerPhone: values.ownerPhone,
        ownerPassword: values.ownerPassword,
      };

      const response = await registerStoreService(payload);

      message.success(
        response.message || "Store registered successfully"
      );

      navigate("/login");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Store registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden max-sm:h-auto max-sm:min-h-screen max-sm:overflow-y-auto max-sm:relative bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <FloatingBackground />

      <div className="flex h-full w-full items-center justify-center px-4 max-sm:h-auto max-sm:py-4 max-sm:px-3">
        <div className="w-full max-w-[1100px] max-sm:max-w-[300px]">

          {/* Header */}
          <div className="mb-4 flex flex-col items-center text-center max-sm:px-2 max-sm:mb-1.5">

            {/* Brand name */}
            <motion.h2
              className="text-sm font-bold tracking-[0.2em] text-emerald-700 max-sm:text-xs"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              NexoraPOS
            </motion.h2>

            {/* Title - letter by letter reveal (fast) */}
            <motion.h1
              className="mt-1 flex flex-wrap justify-center bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl max-sm:!text-xl"
              style={{ backgroundSize: "200% auto" }}
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {titleText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: i * 0.015,
                    ease: "easeOut",
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Glowing animated underline */}
            <motion.div
              className="mt-2 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 max-sm:mt-1"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 90, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-3 text-xs text-gray-500 sm:text-sm max-sm:mt-1 max-sm:text-[11px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              Join NexoraPOS — your store goes live once approved.
            </motion.p>
          </div>

          {/* Form Card */}
          <motion.div
            className="rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-xl backdrop-blur-sm sm:p-5 max-sm:mx-6 max-sm:rounded-2xl max-sm:!p-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.4, ease: "easeOut" }}
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              size="middle"
              className="max-sm:[&_.ant-input]:!h-7 max-sm:[&_.ant-input]:!text-xs max-sm:[&_.ant-input-affix-wrapper]:!h-7 max-sm:[&_.ant-input-affix-wrapper]:!py-0 max-sm:[&_.ant-form-item-label]:!pb-0.5 max-sm:[&_.ant-form-item-label>label]:!text-[11px] max-sm:[&_.ant-form-item-label>label]:!h-auto"
            >
              <Row gutter={24}>

                {/* ---------- LEFT: Store Details ---------- */}
                <Col xs={24} md={12} className="max-sm:!px-0 max-sm:mt-3">
                  <div className="rounded-xl p-3" style={{margin:20}}>
                    <h3 className="mb-3 text-sm font-semibold text-emerald-700 max-sm:mt-3 max-sm:mb-1.5 max-sm:text-[11px]">
                      Store Details
                    </h3>

                    <Form.Item
                      label="Store / Brand Name"
                      name="brand"
                      rules={[{ required: true, message: "Brand name is required" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input placeholder="e.g. CityCare Pharmacy" />
                    </Form.Item>

                    <Form.Item
                      label="Store Type"
                      name="storeType"
                      rules={[{ required: true, message: "Store type is required" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input placeholder="e.g. Pharmacy, Retail, Electronics" />
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[{ required: true, message: "Description is required" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input placeholder="Brief description about your store" />
                    </Form.Item>

                    <Form.Item
                      label="Store Address"
                      name="address"
                      rules={[{ required: true, message: "Address is required" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input
                        prefix={<EnvironmentOutlined className="text-gray-400" />}
                        placeholder="Shop No, Street, City"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Store Contact Phone"
                      name="storePhone"
                      rules={[{ required: true, message: "Store phone is required" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        placeholder="Store contact number"
                      />
                    </Form.Item>

                    {/*<Form.Item
                      label="Store Contact Email"
                      name="storeEmail"
                      rules={[
                        { required: true, message: "Store email is required" },
                        { type: "email", message: "Invalid email" },
                      ]}
                      className="!mb-3"
                    >
                      <Input
                        prefix={<MailOutlined className="text-gray-400" />}
                        placeholder="Store contact email"
                      />
                    </Form.Item>*/}

                  </div>
                </Col>

                {/* ---------- RIGHT: Store Admin ---------- */}
                <Col xs={24} md={12} className="max-sm:!px-0">
                  <div className="rounded-xl p-3" style={{margin:20}}>
                    <h3 className="mb-3 text-sm font-semibold text-teal-700 max-sm:mb-1.5 max-sm:text-[11px]">
                      Store Admin
                    </h3>

                    <Form.Item
                      label="Full Name"
                      name="ownerFullName"
                      rules={[{ required: true, message: "Full name is required" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Your full name"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Phone"
                      name="ownerPhone"
                      rules={[{ required: true, message: "Phone is required" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        placeholder="Your phone number"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="ownerEmail"
                      rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Invalid email" },
                      ]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input
                        prefix={<MailOutlined className="text-gray-400" />}
                        placeholder="Your login email"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="ownerPassword"
                      rules={[{ required: true, message: "Password is required" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Create a password"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Confirm Password"
                      name="confirmPassword"
                      rules={[{ required: true, message: "Please confirm password" }]}
                      className="!mb-3 max-sm:!mb-1.5"
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Re-enter password"
                      />
                    </Form.Item>

                  </div>
                </Col>
              </Row>

              <div className="mt-2 flex justify-center max-sm:mt-1">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{padding:15, margin:5}}
                  className="!h-9 !w-full !rounded-lg !bg-gradient-to-r !from-emerald-500 !to-teal-600 !px-8 !text-sm !font-semibold sm:!w-auto max-sm:!h-8 max-sm:!px-4 max-sm:!text-xs"
                >
                  Register Store
                </Button>
              </div>
            </Form>

            <div className="mt-2 flex items-center justify-between text-sm text-gray-500 max-sm:flex-col max-sm:gap-1 max-sm:mt-1.5 max-sm:text-xs" style={{margin:20}}>
              <Link
                to="/"
                className="inline-flex items-center gap-1 font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Back to Home
              </Link>

              <span>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-emerald-600">
                  Sign in
                </Link>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStore;