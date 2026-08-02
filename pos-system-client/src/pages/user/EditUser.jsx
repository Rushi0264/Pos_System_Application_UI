import { useEffect, useState } from "react";
import { Card, Form, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import UserForm from "../../components/user/UserForm";

import userService from "../../services/userService";
import BackButton from "../../components/comman/BackButton";

const EditUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const roles = [
    "ROLE_STORE_ADMIN",
    "ROLE_STORE_MANAGER",
    "ROLE_BRANCH_MANAGER",
    "ROLE_BRANCH_CASHIER",
  ];

  const stores = [];
  const branches = [];

  const loadUser = async () => {
    try {
      setLoading(true);

      const user = await userService.getUserById(id);

      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        storeId: user.storeId,
        branchId: user.branchId,
      });
    } catch (error) {
      message.error("Unable to load user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleUpdate = async (values) => {
    try {
      setLoading(true);

      await userService.updateUser(id, values);

      message.success("User updated successfully");

      navigate("/users");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Update failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <BackButton/>
      <Card title="Edit User">
        <UserForm
          form={form}
          onFinish={handleUpdate}
          loading={loading}
          roles={roles}
          stores={stores}
          branches={branches}
        />
      </Card>
    </MainLayout>
  );
};

export default EditUser;