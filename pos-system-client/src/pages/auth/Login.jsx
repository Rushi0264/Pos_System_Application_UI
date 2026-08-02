import { useState } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginService } from "../../services/authService";
import { loginSuccess } from "../../redux/authSlice";
import { storage } from "../../utils/storage";

import FloatingBackground from "../../components/auth/FloatingBackground";
import LoginLeft from "../../components/auth/LoginLeft";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await loginService(values);

      storage.setToken(response.jwt);
      storage.setUser(response.user);

      dispatch(loginSuccess(response));

      message.success(response.message);

      switch (response.user.role) {
        case "ROLE_SUPER_ADMIN":
        case "ROLE_STORE_ADMIN":
        case "ROLE_STORE_MANAGER":
        case "ROLE_BRANCH_MANAGER":
        case "ROLE_BRANCH_CASHIER":
          navigate("/dashboard");
          break;

        default:
          navigate("/dashboard");
      }
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Login failed";

      if (backendMessage.toLowerCase().includes("no store found")) {
        message.error(backendMessage);
        //navigate("/register-store");
      } else {
        message.error(backendMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">

      {/* Animated Background */}
      <FloatingBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center justify-center gap-10 p-6 sm:p-10 lg:gap-16 lg:p-16 xl:gap-20 xl:p-20">

        {/* Left Side */}
        <div className="hidden w-full max-w-[620px] items-center lg:flex">
          <LoginLeft />
        </div>

        {/* Right Side */}
        <div className="flex w-full max-w-[440px] items-center justify-center">
          <LoginForm
            onFinish={onFinish}
            loading={loading}
          />
        </div>

      </div>

    </div>
  );
};

export default Login;