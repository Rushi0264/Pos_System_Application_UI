import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, message } from "antd";

import MainLayout from "../../layouts/MainLayout";
import StoreForm from "./StoreForm";
import storeService from "../../services/storeService";
import BackButton from "../../components/comman/BackButton";

const EditStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStore();
  }, []);

  const loadStore = async () => {
    try {
      setLoading(true);

      const data = await storeService.getStoreById(id);

      setStore(data);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load store."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true);

      await storeService.updateStore(id, values);

      message.success("Store updated successfully.");

      navigate("/stores");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Update failed."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !store) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <BackButton/>
      <StoreForm
        initialValues={store}
        onSubmit={handleUpdate}
        loading={loading}
        submitText="Update Store"
      />
    </MainLayout>
  );
};

export default EditStore;