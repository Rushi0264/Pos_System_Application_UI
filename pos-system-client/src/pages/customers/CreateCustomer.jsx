import { useState } from "react";
import { Card, Form, message } from "antd";
import { useNavigate } from "react-router-dom";

import CustomerForm from "../../components/customers/CustomerForm";

import { createCustomer } from "../../services/customerService";
import BackButton from "../../components/comman/BackButton";
import MainLayout from "../../layouts/MainLayout";

const CreateCustomer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await createCustomer(values);

      message.success("Customer created successfully");

      form.resetFields();

      navigate("/customers");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create customer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <BackButton/>
    <Card title="Create Customer">
      <CustomerForm
        form={form}
        loading={loading}
        onFinish={handleSubmit}
        submitText="Create Customer"
      />
    </Card>
    </MainLayout>
  );
};

export default CreateCustomer;