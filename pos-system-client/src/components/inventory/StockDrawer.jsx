import { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Select,
  InputNumber,
  Button,
  Space,
  message,
} from "antd";

import productService from "../../services/productService";
import storeService from "../../services/storeService";
import branchService from "../../services/branchService";
import inventoryService from "../../services/inventoryService";

const { Option } = Select;

export default function StockDrawer({
  open,
  onClose,
  onFinish,
  loading,
  inventory,
}) {
  const [form] = Form.useForm();

  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (open) {
      initializeDrawer();
    }
  }, [open, inventory]);

  const initializeDrawer = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("pos_user"));

      let storesData = [];

      if (user.role === "ROLE_SUPER_ADMIN") {

          storesData = await storeService.getAllStores();

      } else {

          const myStore = await storeService.getMyStore();

          storesData = [myStore];

      }

      console.log("STORES DATA:", storesData);

      setStores(storesData);

      if (user.role === "ROLE_STORE_ADMIN"|| user.role === "ROLE_INVENTORY_MANAGER") {

          form.setFieldsValue({
              storeId: storesData[0].id,
          });

          await handleStoreChange(storesData[0].id);

      }

      if (inventory) {
        const storeId = inventory.branch?.store?.id;

        if (storeId) {
          const [productsData, branchesData] = await Promise.all([
            productService.getProductsByStore(storeId),
            branchService.getBranchesByStore(storeId),
          ]);

          setProducts(productsData);
          setBranches(branchesData);

          form.setFieldsValue({
            storeId,
            productId: inventory.productId,
            branchId: inventory.branchId,
            quantity: inventory.quantity,
          });
        }
      } else {
        form.resetFields();
        setProducts([]);
        setBranches([]);
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to load data");
    }
  };

  const handleStoreChange = async (storeId) => {
    try {
      const [productsData, branchesData] = await Promise.all([
        productService.getProductsByStore(storeId),
        branchService.getBranchesByStore(storeId),
      ]);

      setProducts(productsData);
      setBranches(branchesData);

      if (!inventory) {
        form.setFieldsValue({
          productId: null,
          branchId: null,
        });
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to load products or branches");
    }
  };

  const handleSubmit = async (values) => {
    try {
      await onFinish(values);

      form.resetFields();
      setProducts([]);
      setBranches([]);
      onClose();

      window.location.reload();
    } catch (error) {
      console.error(error);
      message.error("Unable to save inventory.");
    }
  };

  return (
    <Drawer
  title={inventory ? "Update Inventory" : "Add Inventory Stock"}
  size="large"
  open={open}
  destroyOnClose
  onClose={() => {
    form.resetFields();
    setProducts([]);
    setBranches([]);
    onClose();
  }}
>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
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
            onChange={handleStoreChange}
          >
            {stores.map((store) => (
              <Option key={store.id} value={store.id}>
                {store.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Product"
          name="productId"
          rules={[
            {
              required: true,
              message: "Please select a product",
            },
          ]}
        >
          <Select
            placeholder="Select Product"
            disabled={!products.length}
          >
            {products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Branch"
          name="branchId"
          rules={[
            {
              required: true,
              message: "Please select a branch",
            },
          ]}
        >
          <Select
            placeholder="Select Branch"
            disabled={!branches.length}
          >
            {branches.map((branch) => (
              <Option key={branch.id} value={branch.id}>
                {branch.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please enter quantity",
            },
          ]}
        >
          <InputNumber
            min={1}
            className="w-full"
          />
        </Form.Item>

        <Space className="w-full justify-end">
          <Button
            onClick={() => {
              form.resetFields();
              setProducts([]);
              setBranches([]);
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {inventory ? "Update Stock" : "Save Stock"}
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
}