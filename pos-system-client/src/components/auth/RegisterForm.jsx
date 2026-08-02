import { motion } from "framer-motion";
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
} from "antd";

import {
  ShoppingBag,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";


const { Title, Text } = Typography;


const inputClassName =
  "!h-[40px] !rounded-xl !border !border-gray-200 !bg-gray-50 !px-4 " +
  "hover:!border-green-300 focus-within:!border-green-400 " +
  "focus-within:!bg-white focus-within:!shadow-[0_0_0_4px_rgba(34,197,94,0.12)]";

const itemClassName = "!mb-4";


export default function RegisterForm({
  onFinish,
  loading
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        x: 60
      }}

      animate={{
        opacity: 1,
        x: 0
      }}

      transition={{
        duration: 0.8
      }}

      className="w-full max-w-[440px]"
    >


      <div className="rounded-2xl border border-white/60 bg-white/90 p-6 backdrop-blur-2xl sm:rounded-[24px] sm:px-10 sm:py-8" style={{padding:15}}>


        {/* Logo */}

        <div
          className="mb-3 flex justify-center"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl" >

            <ShoppingBag
              size={20}
              className="text-white"
            />

          </div>

        </div>


        <Title
          level={4}
          style={{
            textAlign: "center",
            marginBottom: 2
          }}
        >

          Create Account 

        </Title>


        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: 12
          }}
        >

          Create your Super Admin account.

        </Text>



        <Form
          layout="vertical"
          onFinish={onFinish}
          size="middle"
          style={{ marginTop: 14 }}
        >


          <Form.Item
            label="Full Name"
            name="fullName"
            className={itemClassName}
            rules={[
              {
                required: true,
                message: "Please enter your name"
              }
            ]}
          >

            <Input
              prefix={<User size={16} className="mr-2 text-gray-400" />}
              placeholder="John Doe"
              className={inputClassName}
              variant="borderless"
            />

          </Form.Item>



          <Form.Item
            label="Email Address"
            name="email"
            className={itemClassName}
            rules={[
              {
                required: true,
                message: "Please enter email"
              },
              {
                type: "email",
                message: "Enter valid email"
              }
            ]}
          >

            <Input
              prefix={<Mail size={16} className="mr-2 text-gray-400" />}
              placeholder="admin@example.com"
              className={inputClassName}
              variant="borderless"
            />

          </Form.Item>



          <Form.Item
            label="Phone"
            name="phone"
            className={itemClassName}
            rules={[
              {
                required: true,
                message: "Please enter phone number"
              }
            ]}
          >

            <Input
              prefix={<Phone size={16} className="mr-2 text-gray-400" />}
              placeholder="9876543210"
              className={inputClassName}
              variant="borderless"
            />

          </Form.Item>



          <Form.Item
            label="Password"
            name="password"
            className={itemClassName}
            rules={[
              {
                required: true,
                message: "Please enter password"
              }
            ]}
          >

            <Input.Password
              prefix={<Lock size={16} className="mr-2 text-gray-400" />}
              placeholder="Enter password"
              className={inputClassName}
              variant="borderless"
            />

          </Form.Item>



          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            className={itemClassName}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Confirm password"
              },

              ({ getFieldValue }) => ({

                validator(_, value) {

                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Passwords do not match")
                  );

                }

              })

            ]}
          >

            <Input.Password
              prefix={<Lock size={16} className="mr-2 text-gray-400" />}
              placeholder="Confirm password"
              className={inputClassName}
              variant="borderless"
            />

          </Form.Item>



          <Button
            htmlType="submit"
            loading={loading}
            type="primary"
            block

            className="!h-[42px] !rounded-xl !border-0 !bg-gradient-to-r !from-green-500 !to-emerald-600 !text-base !font-semibold !mt-1"
          >

            <div className="flex items-center justify-center gap-2">

              Create Account

              <ArrowRight size={18} />

            </div>

          </Button>



          <div
            style={{
              marginTop: 12,
              textAlign: "center",
              fontSize: 13
            }}
          >

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-green-600 font-medium"
            >
              Login
            </Link>

          </div>



          <Divider
            style={{
              margin: "12px 0"
            }}
          />



          <div className="flex items-center justify-center gap-2">

            <ShieldCheck
              size={15}
              className="text-green-600"
            />

            <Text
              type="secondary"
              style={{ fontSize: 12 }}
            >
              Enterprise Grade Security
            </Text>


          </div>



        </Form>


      </div>


    </motion.div>

  );
}