import { useEffect, useMemo, useState } from "react";
import { Button, Card, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import supplierService from "../../services/supplierService";
import SupplierSearch from "../../components/supplier/SupplierSearch";
import SupplierTable from "../../components/supplier/SupplierTable";

const SupplierList = () => {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const data = await supplierService.getAllSuppliers();

      setSuppliers(data);
    } catch (error) {
      message.error("Unable to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await supplierService.deleteSupplier(id);

      message.success("Supplier deleted");

      fetchSuppliers();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) =>
      supplier.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [suppliers, search]);

  return (
    <MainLayout>
      <Card
        title="Supplier Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/suppliers/create")}
          >
            Add Supplier
          </Button>
        }
      >
        <SupplierSearch search={search} setSearch={setSearch} />

        <SupplierTable
          suppliers={filteredSuppliers}
          loading={loading}
          onView={(id) => navigate(`/suppliers/${id}`)}
          onEdit={(id) => navigate(`/suppliers/edit/${id}`)}
          onDelete={handleDelete}
        />
      </Card>
    </MainLayout>
  );
};

export default SupplierList;