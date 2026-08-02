import { useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Popconfirm, Space, Table, Tag, message } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import employeeService from "../../services/employeeService";
//import storeService from "../../services/storeService";
import EmployeeSearch from "../../components/employee/EmployeeSearch";
import EmployeeTable from "../../components/employee/EmployeeTable";
import userService from "../../services/userService";
import DeleteEmployeeModal from "../../components/employee/DeleteEmployeeModal";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  //const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

useEffect(() => {

  const loadCurrentUser = async () => {

    try {

      const user = await userService.getProfile();

      if (user?.role === "ROLE_SUPER_ADMIN") {
        
        fetchAllEmployees();
      } else if (user?.storeId) {
        setStoreId(user.storeId);
      }

    } catch(error){

      message.error("Unable to load user");

    }

  };

  loadCurrentUser();

}, []);

useEffect(() => {
  if (storeId) {
    fetchEmployees();
  }
}, [storeId]);

const fetchEmployees = async () => {
  try {
    setLoading(true);

    const data = await employeeService.getEmployeesByStore(storeId);

    setEmployees(data);
  } catch (error) {
    message.error("Unable to load employees");
  } finally {
    setLoading(false);
  }
};

const fetchAllEmployees = async () => {
  try {
    setLoading(true);

    const data = await employeeService.getAllEmployees();

  
    const filteredData = data.filter(
      (user) => user.role !== "ROLE_SUPER_ADMIN"
    );

    setEmployees(filteredData);
  } catch (error) {
    message.error("Unable to load employees");
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    try {
      await employeeService.deleteEmployee(id);

      message.success("Employee deleted");

      fetchEmployees();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      employee.fullName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/employees/${record.id}`)}
          />

          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/employees/edit/${record.id}`)}
          />

          <Popconfirm
            title="Delete Employee?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <Card
        title="Employee Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/employees/create")}
          >
            Add Employee
          </Button>
        }
      >
        <EmployeeSearch
    search={search}
    setSearch={setSearch}
/>

        <EmployeeTable
    employees={filteredEmployees}
    loading={loading}
    onView={(id)=>navigate(`/employees/${id}`)}
    onEdit={(id)=>navigate(`/employees/edit/${id}`)}
    onDelete={handleDelete}
/>
      </Card>
    </MainLayout>
  );
};

export default EmployeeList;