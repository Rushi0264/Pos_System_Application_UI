import { Form, Input, Button, Card, Row, Col, Select } from "antd";

const SupplierForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitText = "Save Supplier",
  stores = [],
  isSuperAdmin = false,
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
        {/* ===== Store selection — only needed when user manages multiple stores ===== */}
        {isSuperAdmin && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Store"
                name="storeId"
                rules={[
                  { required: true, message: "Please select a store" },
                ]}
              >
                <Select
                  placeholder="Select store"
                  options={stores.map((s) => ({
                    label: s.name,
                    value: s.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Supplier Name"
              name="name"
              rules={[
                { required: true, message: "Please enter supplier name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Contact Person"
              name="contactPerson"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter phone number" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="GST Number"
              name="gstNumber"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
            >
              <Input />
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

export default SupplierForm;