import { Form, Input, InputNumber, Button, Card, Row, Col, Select } from "antd";

const RefundForm = ({
  onSubmit,
  loading = false,
  submitText = "Create Refund",
  orders = [],
}) => {
  const [form] = Form.useForm();

  return (
    <Card title={submitText}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Order"
              name="orderId"
              rules={[{ required: true, message: "Please select order" }]}
            >
              <Select placeholder="Select Order">
                {orders.map((o) => (
                  <Select.Option key={o.id} value={o.id}>
                    Order #{o.id} — ₹{o.totalAmount}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Refund Amount"
              name="amount"
              rules={[{ required: true, message: "Please enter amount" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Reason"
              name="reason"
              rules={[{ required: true, message: "Please enter reason" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form>
    </Card>
  );
};

export default RefundForm;