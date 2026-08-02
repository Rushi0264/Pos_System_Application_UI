import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import EmployeeForm from "./EmployeeForm";

import employeeService from "../../services/employeeService";
import storeService from "../../services/storeService";
import BackButton from "../../components/comman/BackButton";
import branchService from "../../services/branchService";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [stores, setStores] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStores();
    loadEmployee();
  }, []);

  const loadStores = async () => {
    try {
      const data = await storeService.getAllStores();
      setStores(data);
    } catch (error) {
      message.error("Unable to load stores");
    }
  };

  const loadBranches = async (storeId) => {
    try {
      const data = await branchService.getBranchesByStore(storeId);
      setBranches(data);
    } catch (error) {
      message.error("Unable to load branches");
    }
  };

  const loadEmployee = async () => {
    try {
      const data = await employeeService.getEmployeeById(id);

      setEmployee({
        ...data,
        storeId: data.store?.id,
        branchId: data.branch?.id,
      });

      if (data.store?.id) {
        loadBranches(data.store.id);
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Unable to load employee."
      );
    }
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true);

      await employeeService.updateEmployee(id, values);

      message.success("Employee updated successfully");

      navigate("/employees");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Failed to update employee."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!employee) return null;

  return (
    <MainLayout>
      <BackButton/>
      <EmployeeForm
        initialValues={employee}
        stores={stores}
        branches={branches}
        onSubmit={handleUpdate}
        loading={loading}
        submitText="Update Employee"
      />
    </MainLayout>
  );
};

export default EditEmployee;