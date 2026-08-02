import { Button, Card, Col, Form, Input, Row } from "antd";

const CategoryForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitText = "Save Category",
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
              label="Category Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Category name is required",
                },
              ]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Store ID"
              name="storeId"
              rules={[
                {
                  required: true,
                  message: "Store ID is required",
                },
              ]}
            >
              <Input type="number" placeholder="Enter store id" />
            </Form.Item>
          </Col>
        </Row>

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

export default CategoryForm;