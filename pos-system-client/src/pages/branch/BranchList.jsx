import { useEffect, useMemo, useState } from "react";
import { Button, Card, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BranchTable from "../../components/branch/BranchTable";
import BranchSearch from "../../components/branch/BranchSearch";
import DeleteBranchModal from "../../components/branch/DeleteBranchModal";

import branchService from "../../services/branchService";

const user = JSON.parse(sessionStorage.getItem("pos_user")) || {};
const canManage = user.role !== "ROLE_SUPER_ADMIN";

const BranchList = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const data = await branchService.getAllBranches();
      setBranches(data);
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Unable to load branches."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) =>
      branch.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [branches, search]);

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await branchService.deleteBranch(selectedId);
      message.success("Branch deleted successfully.");
      fetchBranches();
    } catch (error) {
      console.error(error);
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
        title="Branch Management"
        style={
          isMobile
            ? { margin: "0 -12px", borderRadius: 0 }
            : {}
        }
        styles={{
          body: isMobile ? { padding: "12px 8px" } : {},
          header: isMobile ? { padding: "0 12px" } : {},
        }}
        extra={
          canManage && (
            <Button
              type="primary"
              size={isMobile ? "small" : "middle"}
              icon={<PlusOutlined />}
              onClick={() => navigate("/branches/create")}
            >
              {isMobile ? "Add" : "Add Branch"}
            </Button>
          )
        }
      >
        <BranchSearch
          search={search}
          setSearch={setSearch}
        />

        <BranchTable
          branches={filteredBranches}
          loading={loading}
          onView={(id) => navigate(`/branches/${id}`)}
          onEdit={(id) => navigate(`/branches/edit/${id}`)}
          onDelete={handleDelete}
        />

        <DeleteBranchModal
          open={deleteOpen}
          loading={loading}
          onOk={confirmDelete}
          onCancel={() => setDeleteOpen(false)}
        />
      </Card>
    </MainLayout>
  );
};

export default BranchList;