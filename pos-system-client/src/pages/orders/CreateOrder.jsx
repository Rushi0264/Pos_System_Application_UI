import { useEffect, useState } from "react";

import {
  Card,
  Form,
  Button,
  Select,
  message,
  Divider,
  Modal,
  Input
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { createOrder } from "../../services/orderService";

import branchService from "../../services/branchService";

import { getAllCustomers, createCustomer } from "../../services/customerService";

import productService from "../../services/productService";

import inventoryService from "../../services/inventoryService"; 

import OrderItemTable from "../../components/orders/OrderItemTable";

import BackButton from "../../components/comman/BackButton";

import MainLayout from "../../layouts/MainLayout";


const { Option } = Select;


const CreateOrder = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [customerForm] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  const [storeId, setStoreId] = useState(null);
  const [branchId, setBranchId] = useState(null);

  // नवीन state — branch निवडायला हवी का ते ठरवण्यासाठी
  const [needsBranchSelection, setNeedsBranchSelection] = useState(false);
  const [branches, setBranches] = useState([]);

  // नवीन state — inline customer create साठी
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerCreating, setCustomerCreating] = useState(false);


  const getLoggedInUser = () => {

    const user = JSON.parse(
      localStorage.getItem("pos_user")
    );

    if (!user) {
      message.error("User not logged in");
      return null;
    }

    return user;

  };


  useEffect(() => {
    loadUserData();
  }, []);


  const loadUserData = async () => {

    try {

      const user = getLoggedInUser();

      if (!user) return;

      const userBranchId =
        user.branch?.id ||
        user.branchId;

    
      if (userBranchId) {

        setBranchId(userBranchId);

        const branch = await branchService.getBranchById(userBranchId);

        const currentStoreId =
          branch.store?.id ||
          branch.storeId;

        if (!currentStoreId) {
          message.error("Store not found");
          return;
        }

       setStoreId(currentStoreId);
loadData(currentStoreId, userBranchId);  

return;

      }

           setNeedsBranchSelection(true);

      const allBranches = await branchService.getAllBranches();

      setBranches(allBranches);

    }
    catch (error) {
      console.log(error);
      message.error("Failed to load user data");
    }

  };



  const handleBranchSelect = async (selectedBranchId) => {

    try {

      setBranchId(selectedBranchId);

      const branch = await branchService.getBranchById(selectedBranchId);

      const currentStoreId =
        branch.store?.id ||
        branch.storeId;

      if (!currentStoreId) {
        message.error("Store not found for selected branch");
        return;
      }

      setStoreId(currentStoreId);

      setItems([]);

      loadData(currentStoreId, selectedBranchId);

    }
    catch (error) {
      console.log(error);
      message.error("Failed to load branch data");
    }

  };


  const loadData = async (currentStoreId, currentBranchId) => {

  try {

    const [customerResponse, inventoryResponse] = await Promise.all([
      getAllCustomers(),
      inventoryService.getInventoryByBranch(currentBranchId)
    ]);

    setCustomers(customerResponse);

    const branchProducts = (inventoryResponse || [])
      .filter(inv => inv.quantity > 0)
      .map(inv => ({
        id: inv.product.id,
        name: inv.product.name,
        sellingPrice: inv.product.sellingPrice,
        availableQty: inv.quantity
      }));

    setProducts(branchProducts);

  }
  catch (error) {
    console.log(error);
    message.error("Failed to load products");
  }

};


  // नवीन customer inline बनवण्यासाठी
  const handleCreateCustomer = async (values) => {

    try {

      setCustomerCreating(true);

      const newCustomer = await createCustomer(values);

      setCustomers(prev => [...prev, newCustomer]);

      form.setFieldsValue({ customerId: newCustomer.id });

      message.success("Customer created successfully");

      setCustomerModalOpen(false);

      customerForm.resetFields();

    }
    catch (error) {
      console.log(error);
      message.error(
        error.response?.data?.message ||
        "Failed to create customer"
      );
    }
    finally {
      setCustomerCreating(false);
    }

  };


  const handleSubmit = async (values) => {

    if (!branchId) {
      message.error("Please select a branch");
      return;
    }

    if (items.length === 0) {
      message.error("Please add products");
      return;
    }

    const payload = {
      customerId: values.customerId,
      paymentType: values.paymentType,
      branchId: branchId,  
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    try {

      setLoading(true);

      await createOrder(payload);

      message.success("Order created successfully");

      navigate("/orders");

    }
catch (error) {
  console.log(error);
  message.error(
    typeof error === "string"
      ? error
      : error.response?.data?.message || "Order creation failed"
  );
}
    finally {
      setLoading(false);
    }

  };


  return (
    <MainLayout>
      <Card title="Create Order">

        <BackButton />

      
        {needsBranchSelection && (
          <Form.Item label="Branch" required style={{ marginBottom: 20 }}>
            <Select
              placeholder="Select Branch"
              onChange={handleBranchSelect}
              value={branchId}
            >
              {branches.map(branch => (
                <Option key={branch.id} value={branch.id}>
                  {branch.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >

          <Form.Item label="Customer" name="customerId">
            <Select
              allowClear
              showSearch
              placeholder="Search customer by name or phone"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.searchtext ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    style={{ width: "100%", textAlign: "left" }}
                    onClick={() => setCustomerModalOpen(true)}
                  >
                    Add New Customer
                  </Button>
                </>
              )}
            >
              {customers.map(customer => (
                <Option
                  key={customer.id}
                  value={customer.id}
                  searchtext={`${customer.fullName} ${customer.phone || ""}`}
                >
                  {customer.id} - {customer.fullName}
                  {customer.phone ? ` (${customer.phone})` : ""}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Payment Type"
            name="paymentType"
            rules={[{ required: true, message: "Select payment type" }]}
          >
            <Select>
              <Option value="CASH">CASH</Option>
              <Option value="CARD">CARD</Option>
              <Option value="UPI">UPI</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Select
            showSearch
            placeholder={
              branchId ? "Select Product" : "Select a branch first"
            }
            disabled={!branchId}
            style={{ width: "100%", marginBottom: 20 }}
            onSelect={(productId) => {

              const product = products.find(p => p.id === productId);

              if (!product) return;

              setItems(prev => [
                ...prev,
                {
                  productId: product.id,
                  quantity: 1,
                  sellingPrice: product.sellingPrice,
                  price: product.sellingPrice
                }
              ]);

            }}
          >
            {products.map(product => (
  <Option key={product.id} value={product.id}>
    {product.name} {" - ₹"} {product.sellingPrice}
    {" "}
    <span style={{ color: product.availableQty > 0 ? "green" : "red" }}>
      ({product.availableQty > 0 ? `Stock: ${product.availableQty}` : "Out of stock"})
    </span>
  </Option>
))}
          </Select>

          <OrderItemTable
            items={items}
            products={products}
            onQuantityChange={(index, qty) => {

              const updated = [...items];

              updated[index].quantity = qty;
              updated[index].price = updated[index].sellingPrice * qty;

              setItems(updated);

            }}
            onRemove={(index) => {
              setItems(items.filter((_, i) => i !== index));
            }}
          />

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ marginTop: 20 }}
          >
            Create Order
          </Button>

        </Form>

      </Card>

      <Modal
        title="Add New Customer"
        open={customerModalOpen}
        onCancel={() => {
          setCustomerModalOpen(false);
          customerForm.resetFields();
        }}
        onOk={() => customerForm.submit()}
        confirmLoading={customerCreating}
        okText="Create"
      >
        <Form
          layout="vertical"
          form={customerForm}
          onFinish={handleCreateCustomer}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input placeholder="Customer full name" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Phone number" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter customer email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input.TextArea placeholder="Customer address" rows={2} />
          </Form.Item>
        </Form>
      </Modal>

    </MainLayout>
  );

};

export default CreateOrder;