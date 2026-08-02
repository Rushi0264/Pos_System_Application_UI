import { useEffect, useState } from "react";
import { Card, Descriptions, Spin, Tag, message } from "antd";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import employeeService from "../../services/employeeService";
import BackButton from "../../components/comman/BackButton";

const EmployeeDetails = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const data = await employeeService.getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Unable to load employee."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  if (!employee) {
    return (
      <MainLayout>
        <Card>No Employee Found</Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <BackButton/>
      <Card title="Employee Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">
            {employee.id}
          </Descriptions.Item>

          <Descriptions.Item label="Full Name">
            {employee.fullName}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {employee.email}
          </Descriptions.Item>

          <Descriptions.Item label="Phone">
            {employee.phone}
          </Descriptions.Item>

          <Descriptions.Item label="Role">
            <Tag color="blue">
              {employee.role}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Store">
  {employee.storeBrand ?? "Not Assigned"}
</Descriptions.Item>

<Descriptions.Item label="Branch">
  {employee.branchName ?? "Not Assigned"}
</Descriptions.Item>

          <Descriptions.Item label="Created At">
            {employee.createdAt}
          </Descriptions.Item>

          <Descriptions.Item label="Updated At">
            {employee.updatedAt}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </MainLayout>
  );
};

export default EmployeeDetails;