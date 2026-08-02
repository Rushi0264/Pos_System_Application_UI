import { Form, Input, Button, Card, Row, Col, Select } from "antd";

const EmployeeForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitText = "Save Employee",
  stores = [],
  branches = [],
  loadBranches,
  isStoreAdmin = false,
  currentStoreId = null,
}) => {
  const [form] = Form.useForm();

  const effectiveInitialValues = isStoreAdmin
    ? { ...initialValues, storeId: currentStoreId }
    : initialValues;

  return (
    <Card title={submitText}>
      <Form
        form={form}
        layout="vertical"
        initialValues={effectiveInitialValues}
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please enter full name",
                },
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
                {
                  required: true,
                  message: "Please enter email",
                },
                {
                  type: "email",
                  message: "Invalid email",
                },
              ]}
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
                {
                  required: true,
                  message: "Please enter phone number",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please select role",
                },
              ]}
            >
              <Select placeholder="Select Role">
                <Select.Option value="ROLE_STORE_ADMIN">
                  Store Admin
                </Select.Option>

                <Select.Option value="ROLE_BRANCH_MANAGER">
                  Branch Manager
                </Select.Option>

                <Select.Option value="ROLE_CASHIER">
                  Cashier
                </Select.Option>

                <Select.Option value="ROLE_INVENTORY_MANAGER">
                  Inventory Manager
                </Select.Option>

                <Select.Option value="ROLE_STAFF">
                  Staff
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          {!isStoreAdmin && (
            <Col span={12}>
              <Form.Item
                label="Store"
                name="storeId"
                rules={[
                  {
                    required: true,
                    message: "Please select a store",
                  },
                ]}
              >
                <Select
                  placeholder="Select Store"
                  onChange={(value)=>{
                    loadBranches(value);
                  }}
                >
                  {stores.map((store)=>(
                    <Select.Option
                      key={store.id}
                      value={store.id}
                    >
                      {store.brand || store.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {isStoreAdmin && (
            <Form.Item name="storeId" hidden initialValue={currentStoreId}>
              <Input type="hidden" />
            </Form.Item>
          )}
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Branch"
              name="branchId"
            >
              <Select
                placeholder="Select Branch"
                allowClear
              >
                {branches.map((branch) => (
                  <Select.Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Select.Option>
                ))}
              </Select>
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

export default EmployeeForm;