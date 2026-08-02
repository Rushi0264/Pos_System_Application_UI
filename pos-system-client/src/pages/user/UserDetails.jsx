import { useEffect, useState } from "react";
import { Card, Descriptions, Spin, message } from "antd";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import userService from "../../services/userService";
import BackButton from "../../components/comman/BackButton";

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      setLoading(true);

      const data = await userService.getUserById(id);

      setUser(data);
    } catch (error) {
      message.error("Unable to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <BackButton/>
      <Card title="User Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Full Name">
            {user.fullName}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {user.email}
          </Descriptions.Item>

          <Descriptions.Item label="Phone">
            {user.phone}
          </Descriptions.Item>

          <Descriptions.Item label="Role">
            {user.role}
          </Descriptions.Item>

          <Descriptions.Item label="Store ID">
            {user.storeId}
          </Descriptions.Item>

          <Descriptions.Item label="Branch ID">
            {user.branchId}
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {user.createdAt}
          </Descriptions.Item>

          <Descriptions.Item label="Last Login">
            {user.lastLogin}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </MainLayout>
  );
};

export default UserDetails;