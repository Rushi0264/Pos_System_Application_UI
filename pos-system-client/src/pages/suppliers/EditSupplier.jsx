import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import SupplierForm from "../../components/supplier/SupplierForm";
import supplierService from "../../services/supplierService";
import BackButton from "../../components/comman/BackButton";

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = async () => {
    try {
      const data = await supplierService.getSupplierById(id);
      setSupplier(data);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load supplier."
      );
    }
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true);

      await supplierService.updateSupplier(id, values);

      message.success("Supplier updated successfully");

      navigate("/suppliers");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to update supplier."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!supplier) return null;

  return (
    <MainLayout>
        <BackButton/>
      <SupplierForm
        initialValues={supplier}
        onSubmit={handleUpdate}
        loading={loading}
        submitText="Update Supplier"
      />
    </MainLayout>
  );
};

export default EditSupplier;