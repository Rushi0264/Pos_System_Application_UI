import { Form, Input, Button, Card, Row, Col, TimePicker, Select } from "antd";
import dayjs from "dayjs";

const workingDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const BranchForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitText = "Save Branch",
}) => {
  const [form] = Form.useForm();

  const formValues = {
    ...initialValues,
    openTime: initialValues.openTime
      ? dayjs(initialValues.openTime, "HH:mm:ss")
      : null,
    closeTime: initialValues.closeTime
      ? dayjs(initialValues.closeTime, "HH:mm:ss")
      : null,
  };

  const handleFinish = (values) => {
    const payload = {
      ...values,
      openTime: values.openTime
        ? values.openTime.format("HH:mm:ss")
        : null,
      closeTime: values.closeTime
        ? values.closeTime.format("HH:mm:ss")
        : null,
    };

    onSubmit(payload);
  };

  return (
    <Card title={submitText}>
      <Form
        form={form}
        layout="vertical"
        initialValues={formValues}
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Branch Name"
              name="name"
              rules={[
                { required: true, message: "Branch name is required" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Store ID"
              name="storeId"
              rules={[
                { required: true, message: "Store ID is required" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Address is required" },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="State" name="state">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Pincode" name="pincode">
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
                { required: true, message: "Phone is required" },
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
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Working Days"
          name="workingDays"
        >
          <Select mode="multiple">
            {workingDays.map((day) => (
              <Select.Option key={day} value={day}>
                {day}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Open Time"
              name="openTime"
            >
              <TimePicker
                style={{ width: "100%" }}
                format="HH:mm:ss"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Close Time"
              name="closeTime"
            >
              <TimePicker
                style={{ width: "100%" }}
                format="HH:mm:ss"
              />
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

export default BranchForm;