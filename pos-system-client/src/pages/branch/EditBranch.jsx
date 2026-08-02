import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BranchForm from "./BranchForm";
import branchService from "../../services/branchService";
import BackButton from "../../components/comman/BackButton";

const EditBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBranch = async () => {
      try {
        setLoading(true);
        const data = await branchService.getBranchById(id);
        setBranch(data);
      } catch (error) {
        message.error("Failed to load branch details");
        navigate("/branches");
      } finally {
        setLoading(false);
      }
    };

    loadBranch();
  }, [id, navigate]);

  const handleUpdate = async (values) => {
    try {
      await branchService.updateBranch(id, values);
      message.success("Branch updated successfully");
      navigate("/branches");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to update branch"
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <BackButton />
      <BranchForm
        submitText="Update Branch"
        initialValues={branch}
        onSubmit={handleUpdate}
      />
    </MainLayout>
  );
};

export default EditBranch;