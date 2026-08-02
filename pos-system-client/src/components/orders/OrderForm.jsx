import { Form, Select, Button } from "antd";
import OrderItemTable from "./OrderItemTable";

const { Option } = Select;

const OrderForm = ({
  form,
  customers = [],
  products = [],
  items = [],
  setItems,
  loading,
  onFinish,
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Customer"
        name="customerId"
      >
        <Select
          allowClear
          placeholder="Walk-in Customer"
        >
          {customers.map((customer) => (
            <Option
  key={customer.id}
  value={customer.id}
>
  {customer.id} - {customer.fullName}
</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Payment Type"
        name="paymentType"
        rules={[
          {
            required: true,
            message: "Select payment type",
          },
        ]}
      >
        <Select placeholder="Select Payment">
          <Option value="CASH">Cash</Option>
          <Option value="CARD">Card</Option>
          <Option value="UPI">UPI</Option>
        </Select>
      </Form.Item>

      <OrderItemTable
        products={products}
        items={items}
        setItems={setItems}
      />

      <Form.Item style={{ marginTop: 20 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
        >
          Create Order
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;