import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import BackButton from "../comman/BackButton";

const { TextArea } = Input;

const ProductForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitText = "Save Product",
  categories = [],
  stores = [],
  handleImageUpload,
  imageUrl,
  isStoreAdmin = false,
  currentStoreId = null,
}) => {

  const [form] = Form.useForm();

  const effectiveInitialValues = isStoreAdmin
    ? { ...initialValues, storeId: currentStoreId }
    : initialValues;

  const handleFinish = (values) => {

    const productData = {
        ...values,
        ...(isStoreAdmin ? { storeId: currentStoreId } : {}),
        image:imageUrl
    };

    onSubmit(productData);
  };

  return (
    <Card title={submitText}>

      <Form
        form={form}
        layout="vertical"
        initialValues={effectiveInitialValues}
        onFinish={handleFinish}
      >

        <Row gutter={16}>

          <Col xs={24} md={12}>
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required:true, message:"Product name is required" },
                { min:3, message:"Minimum 3 characters required" }
              ]}
            >
              <Input placeholder="Enter product name"/>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="SKU"
              name="sku"
              rules={[{ required:true, message:"SKU is required" }]}
            >
              <Input placeholder="SKU-1001"/>
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>

          <Col xs={24} md={12}>
            <Form.Item label="Brand" name="brand">
              <Input placeholder="Brand Name"/>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required:true, message:"Please select category" }]}
            >
              <Select
                placeholder="Select Category"
                showSearch
                optionFilterProp="children"
              >
                {categories.map(category=>(
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>

          {!isStoreAdmin && (
            <Col xs={24} md={12}>
              <Form.Item
                label="Store"
                name="storeId"
                rules={[{ required:true, message:"Please select store" }]}
              >
                <Select
                  placeholder="Select Store"
                  showSearch
                  optionFilterProp="children"
                >
                  {stores.map(store=>(
                    <Select.Option key={store.id} value={store.id}>
                      {store.brand}
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

          <Col xs={24} md={12}>
            <Form.Item label="Product Image">
              <Upload
                beforeUpload={(file)=>{
                  handleImageUpload({ file, onSuccess:()=>{} });
                  return false;
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>

              {imageUrl &&
                <img
                  src={imageUrl ? `http://localhost:8080${imageUrl}` : ""}
                  alt="product"
                  width={120}
                  style={{ marginTop:10, borderRadius:8 }}
                />
              }
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>

          <Col xs={24} md={6}>
            <Form.Item
              label="MRP"
              name="mrp"
              rules={[{ required:true, message:"MRP is required" }]}
            >
              <InputNumber style={{ width:"100%" }} min={0} precision={2} placeholder="0.00" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Selling Price"
              name="sellingPrice"
              rules={[{ required:true, message:"Selling price is required" }]}
            >
              <InputNumber style={{ width:"100%" }} min={0} precision={2} placeholder="0.00" />
            </Form.Item>
          </Col>

        </Row>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ max:500, message:"Maximum 500 characters allowed" }]}
        >
          <TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
          {submitText}
        </Button>

      </Form>

    </Card>
  );
};

export default ProductForm;