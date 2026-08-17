import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import SupplierForm from "../../components/supplier/SupplierForm";
import supplierService from "../../services/supplierService";
import storeService from "../../services/storeService";
import BackButton from "../../components/comman/BackButton";

const CreateSupplier = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);

  const currentUser = JSON.parse(sessionStorage.getItem("pos_user") || "null");
  const isSingleStoreUser =
    currentUser?.role === "ROLE_STORE_ADMIN" ||
    currentUser?.role === "ROLE_INVENTORY_MANAGER";

  useEffect(() => {
    if (!isSingleStoreUser) {
      fetchStores();
    }
  }, []);

  const fetchStores = async () => {
    try {
      const storeData = await storeService.getAllStores();
      setStores(storeData);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to load stores"
      );
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const finalData = {
        ...values,
        ...(isSingleStoreUser ? { storeId: currentUser?.storeId } : {}),
      };

      await supplierService.createSupplier(finalData);

      message.success("Supplier created successfully");

      navigate("/suppliers");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <BackButton />
      <SupplierForm
        submitText="Create Supplier"
        onSubmit={handleSubmit}
        loading={loading}
        stores={stores}
        isSuperAdmin={!isSingleStoreUser}
      />
    </MainLayout>
  );
};

export default CreateSupplier;