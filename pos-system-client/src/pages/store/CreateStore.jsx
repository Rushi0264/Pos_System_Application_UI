import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import StoreForm from "./StoreForm";
import storeService from "../../services/storeService";
import BackButton from "../../components/comman/BackButton";

const CreateStore = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateStore = async (values) => {
    try {
      setLoading(true);

      await storeService.createStore(values);

      message.success("Store created successfully");

      navigate("/stores");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create store"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <BackButton/>
      <StoreForm
        submitText="Create Store"
        onSubmit={handleCreateStore}
        loading={loading}
      />
    </MainLayout>
  );
};

export default CreateStore;