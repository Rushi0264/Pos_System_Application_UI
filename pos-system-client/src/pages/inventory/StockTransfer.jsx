import { useEffect, useState } from "react";
import { Form, Select, InputNumber, Button, message, Card } from "antd";

import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/comman/BackButton";

import storeService from "../../services/storeService";
import branchService from "../../services/branchService";
import productService from "../../services/productService";
import stockMovementService from "../../services/stockMovementService";

const { Option } = Select;

const StockTransfer = () => {
  const [form] = Form.useForm();

  const [stores, setStores] = useState([]);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [availableStock, setAvailableStock] = useState(null);

  const [loading, setLoading] = useState(false);
  const [checkingStock, setCheckingStock] = useState(false);

const loadStores = async () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("pos_user"));

    let data;
    if (user.role === "ROLE_SUPER_ADMIN") {
      data = await storeService.getAllStores();
    } else {
      const myStore = await storeService.getMyStore();
      data = myStore ? [myStore] : [];
    }

    setStores(data || []);
  } catch (error) {
    message.error("Failed to load stores");
  }
};

useEffect(() => {
  const init = async () => {
    const user = JSON.parse(sessionStorage.getItem("pos_user"));
    let data;

    if (user.role === "ROLE_SUPER_ADMIN") {
      data = await storeService.getAllStores();
    } else {
      const myStore = await storeService.getMyStore();
      data = myStore ? [myStore] : [];
    }

    setStores(data || []);

    if (user.role !== "ROLE_SUPER_ADMIN" && data.length === 1) {
      form.setFieldsValue({ storeId: data[0].id });
      handleStoreChange(data[0].id);
    }
  };

  init();
}, []);

  const loadBranchesForStore = async (storeId) => {
    try {
      const data = await branchService.getBranchesByStore(storeId);
      setBranches(data || []);
    } catch (error) {
      message.error("Failed to load branches");
    }
  };

  const loadProductsForStore = async (storeId) => {
    try {
      const data = await productService.getProductsByStore(storeId);
      setProducts(data || []);
    } catch (error) {
      message.error("Failed to load products");
    }
  };

useEffect(() => {
    loadStores();
  }, []);

  const handleStoreChange = (storeId) => {
    setSelectedStoreId(storeId);
    setAvailableStock(null);
    form.setFieldsValue({ branchId: undefined, productId: undefined });
    loadBranchesForStore(storeId);
    loadProductsForStore(storeId);
  };

  const handleCheckStock = async () => {
    const storeId = form.getFieldValue("storeId");
    const productId = form.getFieldValue("productId");

    if (!storeId || !productId) {
      message.warning("Select Store and Product");
      return;
    }

    try {
      setCheckingStock(true);
      const stock = await stockMovementService.getStoreStock(
        storeId,
        productId
      );
      setAvailableStock(stock);
    } catch (error) {
      message.error("An error occurred while checking stock.");
    } finally {
      setCheckingStock(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await stockMovementService.transferStockToBranch({
        storeId: values.storeId,
        branchId: values.branchId,
        productId: values.productId,
        quantity: values.quantity,
      });

      message.success("The stock was transferred to the branch.");

      form.resetFields();
      setBranches([]);
      setSelectedStoreId(null);
      setAvailableStock(null);
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Stock transfer failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <BackButton />

      <div style={{ margin: 15, padding: 10, maxWidth: 600 }}>
        <h1 className="text-3xl font-bold" style={{ marginBottom: 20 }}>
          Transfer Stock to Branch
        </h1>

        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Store"
              name="storeId"
              rules={[{ required: true, message: "Select Store" }]}
            >
              <Select
                placeholder="Select Store"
                onChange={handleStoreChange}
              >
                {stores.map((store) => (
                  <Option key={store.id} value={store.id}>
                    {store.name || store.brand}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Branch"
              name="branchId"
              rules={[{ required: true, message: "Select Branch" }]}
            >
              <Select
                placeholder="Select Branch"
                disabled={!selectedStoreId}
              >
                {branches.map((branch) => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Product"
              name="productId"
              rules={[{ required: true, message: "Select Product" }]}
            >
              <Select placeholder="Select Product" disabled={!selectedStoreId}>
                {products.map((product) => (
                  <Option key={product.id} value={product.id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Insert Quantity" },
                {
                  type: "number",
                  min: 1,
                  message: "Need more than a quantity of 1.",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                placeholder="Enter quantity"
              />
            </Form.Item>

            <Button
              onClick={handleCheckStock}
              loading={checkingStock}
              style={{ marginBottom: 16 }}
            >
              Check Available Store Stock
            </Button>

            {availableStock !== null && (
              <p style={{ marginBottom: 16 }}>
                Available stock in store: <b>{availableStock}</b>
              </p>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Transfer Stock
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StockTransfer;