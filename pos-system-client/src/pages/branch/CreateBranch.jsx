import { message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BranchForm from "./BranchForm";
import branchService from "../../services/branchService";
import BackButton from "../../components/comman/BackButton";

const CreateBranch = () => {
  const navigate = useNavigate();

  const handleCreate = async (values) => {
    try {
      await branchService.createBranch(values);

      message.success("Branch created successfully");

      navigate("/branches");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create branch"
      );
    }
  };

  return (
    <MainLayout>
      <BackButton />
      <BranchForm submitText="Create Branch" onSubmit={handleCreate} />
    </MainLayout>
  );
};

export default CreateBranch;