import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PurchaseForm from "../../components/purchase/PurchaseForm";

import purchaseService from "../../services/purchaseService";
import supplierService from "../../services/supplierService";
import storeService from "../../services/storeService";
import branchService from "../../services/branchService";
import productService from "../../services/productService";
import BackButton from "../../components/comman/BackButton";

const CreatePurchase = () => {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [stores, setStores] = useState([]);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("pos_user") || "null");
  const isSingleStoreUser =
    currentUser?.role === "ROLE_STORE_ADMIN" ||
    currentUser?.role === "ROLE_INVENTORY_MANAGER";

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    try {
      let storeData;

      if (isSingleStoreUser) {
        const myStore = await storeService.getMyStore();
        storeData = myStore ? [myStore] : [];
      } else {
        storeData = await storeService.getAllStores();
      }

      const supplierData = await supplierService.getAllSuppliers();

      setSuppliers(supplierData || []);
      setStores(storeData || []);

      // Single store user साठी store आपोआप निवडून branches/products लोड करा
      if (isSingleStoreUser && storeData.length === 1) {
        await handleStoreChange(storeData[0].id);
      }
    } catch (error) {
      message.error("Unable to load form data");
    }
  };

  const handleStoreChange = async (storeId) => {
    try {
      const [branchData, productData] = await Promise.all([
        branchService.getBranchesByStore(storeId),
        productService.getProductsByStore(storeId),
      ]);

      setBranches(branchData || []);
      setProducts(productData || []);
    } catch (error) {
      message.error("Unable to load branches/products for this store");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await purchaseService.createPurchase(values);

      message.success("Purchase created successfully");

      navigate("/purchases");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create purchase"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <BackButton />
      <PurchaseForm
        submitText="Create Purchase"
        onSubmit={handleSubmit}
        loading={loading}
        suppliers={suppliers}
        stores={stores}
        branches={branches}
        products={products}
        onStoreChange={handleStoreChange}
      />
    </MainLayout>
  );
};

export default CreatePurchase;