import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import EmployeeForm from "./EmployeeForm";

import employeeService from "../../services/employeeService";
import storeService from "../../services/storeService";
import BackButton from "../../components/comman/BackButton";
import branchService from "../../services/branchService";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("pos_user") || "null");
  const isStoreAdmin = currentUser?.role === "ROLE_STORE_ADMIN";

  useEffect(() => {
    if (isStoreAdmin) {
      // Store already known — just load its branches directly
      loadBranches(currentUser.storeId);
    } else {
      loadStores();
    }
  }, []);

  const loadStores = async () => {
    try {
      const data = await storeService.getAllStores();
      setStores(data);
    } catch (error) {
      console.error(error);
      message.error("Unable to load stores");
    }
  };

  const loadBranches = async (storeId) => {
    try {
      const data = await branchService.getBranchesByStore(storeId);
      setBranches(data);
    } catch (error) {
      console.error(error);
      message.error("Unable to load branches");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const finalData = {
        ...values,
        ...(isStoreAdmin ? { storeId: currentUser?.storeId } : {}),
      };

      await employeeService.createEmployee(finalData);

      message.success("Employee created successfully");

      navigate("/employees");
    } catch (error) {
      console.error(error);

      message.error(
        error.response?.data?.message || "Failed to create employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <BackButton/>
      <EmployeeForm
        submitText="Create Employee"
        onSubmit={handleSubmit}
        stores={stores}
        branches={branches}
        loadBranches={loadBranches}
        isStoreAdmin={isStoreAdmin}
        currentStoreId={currentUser?.storeId}
      />
    </MainLayout>
  );
};

export default CreateEmployee;