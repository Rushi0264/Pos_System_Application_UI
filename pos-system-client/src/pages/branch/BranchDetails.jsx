import { useEffect, useState } from "react";
import { Card, Descriptions, Spin } from "antd";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import branchService from "../../services/branchService";
import BackButton from "../../components/comman/BackButton";

const BranchDetails = () => {
  const { id } = useParams();

  const [branch, setBranch] = useState(null);

  useEffect(() => {
    loadBranch();
  }, []);

  const loadBranch = async () => {
    const data = await branchService.getBranchById(id);
    setBranch(data);
  };

  if (!branch)
    return (
      <MainLayout>
        <Spin />
      </MainLayout>
    );

  return (
    <MainLayout>
      <BackButton />
      <Card title="Branch Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Branch">
            {branch.name}
          </Descriptions.Item>

          <Descriptions.Item label="Address">
            {branch.address}
          </Descriptions.Item>

          <Descriptions.Item label="City">
            {branch.city || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="State">
            {branch.state || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Pincode">
            {branch.pincode || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Phone">
            {branch.phone}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {branch.email}
          </Descriptions.Item>

          <Descriptions.Item label="Store ID">
            {branch.storeId}
          </Descriptions.Item>

          <Descriptions.Item label="Working Days">
            {branch.workingDays?.length
              ? branch.workingDays.join(", ")
              : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Open Time">
            {branch.openTime || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Close Time">
            {branch.closeTime || "-"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </MainLayout>
  );
};

export default BranchDetails;