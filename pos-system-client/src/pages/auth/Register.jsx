import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { signupService } from "../../services/authService";

import FloatingBackground from "../../components/auth/FloatingBackground";
import RegisterLeft from "../../components/auth/RegisterLeft";
import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: "ROLE_SUPER_ADMIN",
      };

      const response = await signupService(payload);

      message.success(response.message || "Super Admin created successfully");

      navigate("/login");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">

      <FloatingBackground />

      <div className="relative z-10 mx-auto flex h-screen max-w-[1400px] items-stretch justify-center gap-16 p-6 sm:p-10 lg:gap-24 lg:p-16 xl:gap-28 xl:p-20">

        <div className="hidden w-full max-w-[620px] items-center lg:flex overflow-y-auto">
          <RegisterLeft />
        </div>

        <div className="flex w-full max-w-[440px] items-center justify-center overflow-y-auto py-4">
          <RegisterForm
            onFinish={onFinish}
            loading={loading}
          />
        </div>

      </div>

    </div>
  );
};

export default Register;