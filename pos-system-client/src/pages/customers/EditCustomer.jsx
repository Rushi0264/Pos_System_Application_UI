import { useEffect, useState } from "react";
import { Card, Form, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

import CustomerForm from "../../components/customers/CustomerForm";
import {
  getAllCustomers,
  updateCustomer,
} from "../../services/customerService";
import BackButton from "../../components/comman/BackButton";

const EditCustomer = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const customers = await getAllCustomers();

      const customer = customers.find(
        (item) => item.id === Number(id)
      );

      if (!customer) {
        message.error("Customer not found");
        navigate("/customers");
        return;
      }

      form.setFieldsValue({
        name: customer.fullName,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
      });
    } catch (error) {
      message.error("Failed to load customer");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await updateCustomer(id, values);

      message.success("Customer updated successfully");

      navigate("/customers");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Failed to update customer"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <Spin size="large" />;
  }

  return (
    <MainLayout>
      <BackButton/>
    <Card title="Edit Customer">
      <CustomerForm
        form={form}
        loading={loading}
        onFinish={handleSubmit}
        submitText="Update Customer"
      />
    </Card>
    </MainLayout>
  );
};

export default EditCustomer;