import { Button, Col, Form, Input, Row } from "antd";

const CustomerForm = ({
  form,
  onFinish,
  loading = false,
  submitText = "Save",
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Customer Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please enter customer name",
              },
            ]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Invalid email",
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
        </Col>

          <Col span={12}>
    <Form.Item
      label="Address"
      name="address"
      rules={[
        {
          required: true,
          message: "Please enter address",
        },
      ]}
    >
      <Input placeholder="Enter address" />
    </Form.Item>
  </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;