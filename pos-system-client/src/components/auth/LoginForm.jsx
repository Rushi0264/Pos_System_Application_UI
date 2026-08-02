import { motion } from "framer-motion";
import {
  Form,
  Input,
  Button,
  Typography,
  Checkbox,
  Divider,
} from "antd";
import {
  ShoppingBag,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";


const { Title, Text } = Typography;

const inputClassName =
  "!h-[52px] !rounded-xl !border !border-gray-200 !bg-gray-50 !px-4 " +
  "hover:!border-green-300 focus-within:!border-green-400 " +
  "focus-within:!bg-white focus-within:!shadow-[0_0_0_4px_rgba(34,197,94,0.12)]";

export default function LoginForm({ onFinish, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-[440px]"
    >
      
      <div className="rounded-2xl border border-white/60 bg-white/90 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:rounded-[32px] sm:p-12 lg:p-14">

        {/* Logo */}

        <div className="mb-6 flex justify-center sm:mb-8"
        style={{ marginTop: 15, marginBottom:5 }}>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl">

            <ShoppingBag
              size={28}
              className="text-white"
            />

          </div>

        </div>

        {/* Heading */}

        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Welcome Back 
        </Title>

        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: 14,
          }}
        >
Securely sign in to manage your business.
        </Text>

        {/* Form */}

        <Form
          layout="vertical"
          onFinish={onFinish}
          size="large"
          style={{ padding: 25 }}
        >
          <Form.Item
            label="Email Address"
            name="email"
            style={{ marginBottom: 5 }}
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input
              prefix={
                <Mail
                  size={17}
                  className="mr-2 text-gray-400"
                />
              }
              placeholder="admin@example.com"
              className={inputClassName}
              variant="borderless"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            style={{ marginBottom: 15 }}
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              prefix={
                <Lock
                  size={17}
                  className="mr-2 text-gray-400"
                />
              }
              placeholder="Enter password"
              className={inputClassName}
              variant="borderless"
            />
          </Form.Item>

          {/* Remember */}

          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm"
          style={{ marginBottom: 15 }}>

            <Checkbox>
              Remember Me
            </Checkbox>

            <button
              type="button"
              className="text-sm font-medium text-green-600 transition hover:text-green-700"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}

          <Button
            htmlType="submit"
            loading={loading}
            type="primary"
            block
            className="!h-[52px] !rounded-xl !border-0 !bg-gradient-to-r !from-green-500 !to-emerald-600 !text-base !font-semibold !shadow-lg !shadow-green-200 hover:!from-green-600 hover:!to-emerald-700"
          >
            <div className="flex items-center justify-center gap-2">

              Login

              <ArrowRight size={18} />

            </div>

          </Button>

          

<div
  style={{
    marginTop: 20,
    textAlign: "center",
  }}
  className="flex items-center justify-between text-sm"
>
  <Link
    to="/"
    className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-emerald-600 transition-colors"
  >
     Back to Home
  </Link>

  <span>
    Don't have an account?{" "}
    <Link to="/register-store" className="font-semibold text-emerald-600">
      Register
    </Link>
  </span>
</div>

          <Divider style={{ margin: "20px 0" }} />

          {/* Footer */}

          <div className="flex items-center justify-center gap-2">

            <ShieldCheck
              size={16}
              className="text-green-600"
            />

            <Text
              type="secondary"
              style={{ fontSize: 13 }}
            >
              Enterprise Grade Security
            </Text>

          </div>

        </Form>

      </div>
    </motion.div>
  );
}
