import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Select,
  Space,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const PurchaseForm = ({
  onSubmit,
  loading = false,
  submitText = "Create Purchase",
  suppliers = [],
  //branches = [],
  products = [],
  stores = [],
  onStoreChange,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const items = values.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      purchasePrice: item.purchasePrice,
      totalPrice: item.quantity * item.purchasePrice,
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    onSubmit({
      storeId: values.storeId,
      supplierId: values.supplierId,
      //branchId: values.branchId,
      paymentType: values.paymentType,
      invoiceNumber: values.invoiceNumber,
      remarks: values.remarks,
      totalAmount,
      items,
    });
  };

  return (
    <Card title={submitText}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Store"
              name="storeId"
              rules={[{ required: true, message: "Please select store" }]}
            >
              <Select
                placeholder="Select Store"
                onChange={(storeId) => {
                  form.setFieldsValue({ branchId: undefined, items: undefined });
                  onStoreChange?.(storeId);
                }}
              >
                {stores.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name || s.brand}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

<Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Supplier"
              name="supplierId"
              rules={[{ required: true, message: "Please select supplier" }]}
            >
              <Select placeholder="Select Supplier">
                {suppliers.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          

          <Col xs={24} sm={12} md={8}> 
            <Form.Item
              label="Payment Type"
              name="paymentType"
              rules={[{ required: true, message: "Please select payment type" }]}
            >
              <Select placeholder="Select Payment Type">
                <Select.Option value="CASH">Cash</Select.Option>
                <Select.Option value="UPI">UPI</Select.Option>
                <Select.Option value="CARD">Card</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}> 
            <Form.Item
              label="Invoice Number"
              name="invoiceNumber"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}> 
            <Form.Item
              label="Remarks"
              name="remarks"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.List
          name="items"
          rules={[
            {
              validator: async (_, items) => {
                if (!items || items.length === 0) {
                  return Promise.reject(new Error("Add at least one item"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={16} key={key} align="middle">
                 <Col xs={24} sm={12} md={8}> 
                    <Form.Item
                      {...restField}
                      label="Product"
                      name={[name, "productId"]}
                      rules={[{ required: true, message: "Select product" }]}
                    >
                      <Select placeholder="Select Product">
                        {products.map((p) => (
                          <Select.Option key={p.id} value={p.id}>
                            {p.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={12} sm={6} md={6}>
                    <Form.Item
                      {...restField}
                      label="Quantity"
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Enter quantity" }]}
                    >
                      <InputNumber min={1} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col xs={12} sm={6} md={6}> 
                    <Form.Item
                      {...restField}
                      label="Purchase Price"
                      name={[name, "purchasePrice"]}
                      rules={[{ required: true, message: "Enter price" }]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={4} style={{ textAlign: "center", marginBottom: 8 }}>
  <MinusCircleOutlined onClick={() => remove(name)} style={{ fontSize: 18, color: "#ff4d4f" }} />
</Col>
                </Row>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Item
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form>
    </Card>
  );
};

export default PurchaseForm;