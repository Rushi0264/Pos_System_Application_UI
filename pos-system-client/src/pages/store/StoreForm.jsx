//import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  
} from "antd";


const { TextArea } = Input;

const StoreForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitText = "Save Store",
}) => {
  const [form] = Form.useForm();




  return (
    <Card title={submitText}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Brand is required",
                },
              ]}
            >
              <Input placeholder="Reliance Fresh" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Store Type"
              name="storeType"
              rules={[
                {
                  required: true,
                  message: "Store Type is required",
                },
              ]}
            >
              <Input placeholder="Super Market" />
            </Form.Item>
          </Col>

        

          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select status",
                },
              ]}
            >
              <Select>
  <Select.Option value="ACTIVE">Active</Select.Option>
  <Select.Option value="PENDING">Pending</Select.Option>
  <Select.Option value="BLOCKED">Blocked</Select.Option>
</Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>

        <Card
          title="Store Contact"
          size="small"
          style={{ marginBottom: 20 }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Address"
                name={["contact", "address"]}
                rules={[
                  {
                    required: true,
                    message: "Address is required",
                  },
                ]}
              >
                <Input placeholder="Store Address" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Phone"
                name={["contact", "phone"]}
                rules={[
                  {
                    required: true,
                    message: "Phone is required",
                  },
                ]}
              >
                <Input placeholder="9876543210" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Email"
                name={["contact", "email"]}
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    type: "email",
                    message: "Invalid Email",
                  },
                ]}
              >
                <Input placeholder="store@example.com" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {submitText}
        </Button>
      </Form>
    </Card>
  );
};

export default StoreForm;