import { useEffect, useMemo, useState } from "react";
import { Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import MainLayout from "../../layouts/MainLayout";
import StoreTable from "../../components/store/StoreTable";
import storeService from "../../services/storeService";


import StoreSearch from "../../components/store/StoreSearch";
import DeleteStoreModal from "../../components/store/DeleteStoreModal";

const StoreList = () => {
  const navigate = useNavigate();

const [stores, setStores] = useState([]);
const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

const [deleteOpen, setDeleteOpen] = useState(false);
const [selectedId, setSelectedId] = useState(null);

const filteredStores = useMemo(() => {
  return stores.filter((store) => {
    const keyword = search.toLowerCase();

    const matchKeyword =
      store.brand?.toLowerCase().includes(keyword) ||
      store.storeType?.toLowerCase().includes(keyword) ||
      store.contact?.email?.toLowerCase().includes(keyword) ||
      store.contact?.phone?.includes(keyword);

    const matchStatus =
      status === "ALL" || store.status === status;

    return matchKeyword && matchStatus;
  });
}, [stores, search, status]);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const response = await storeService.getAllStores();

      setStores(response);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to load stores."
      );
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  void fetchStores();
}, []);

  const handleView = (id) => {
    navigate(`/stores/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/stores/edit/${id}`);
  };

const handleDelete = (id) => {
  setSelectedId(id);
  setDeleteOpen(true);
};

const confirmDelete = async () => {
  try {
    setLoading(true);

    await storeService.deleteStore(selectedId);

    message.success("Store deleted successfully.");

    await fetchStores();
  } catch (error) {
    message.error(
      error.response?.data?.message || "Delete failed."
    );
  } finally {
    setLoading(false);
    setDeleteOpen(false);
    setSelectedId(null);
  }
};

  return (
    <MainLayout>
      <Card
        title="Store Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/stores/create")}
          >
            Add Store
          </Button>
        }
      >
        <StoreSearch
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
/>
        <StoreTable
          stores={filteredStores}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
<DeleteStoreModal
  open={deleteOpen}
  loading={loading}
  onOk={confirmDelete}
  onCancel={() => setDeleteOpen(false)}
/>
      </Card>
    </MainLayout>
  );
};

export default StoreList;