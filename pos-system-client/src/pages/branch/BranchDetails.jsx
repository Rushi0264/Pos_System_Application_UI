import { useEffect, useState } from "react";
import { Card, Descriptions, Spin } from "antd";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import branchService from "../../services/branchService";
import BackButton from "../../components/comman/BackButton";

const BranchDetails = () => {
  const { id } = useParams();

  const [branch, setBranch] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <div style={{ textAlign: "center", marginTop: 60 }}>
          <Spin size="large" />
        </div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div style={{ marginBottom: 12 }}>
        <BackButton />
      </div>
      <Card
        title="Branch Details"
        style={
          isMobile
            ? { margin: "0 -12px", borderRadius: 0 }
            : {}
        }
        styles={{
          body: isMobile ? { padding: "12px 8px" } : {},
          header: isMobile ? { padding: "0 12px" } : {},
        }}
      >
        <Descriptions
          bordered
          column={1}
          layout={isMobile ? "vertical" : "horizontal"}
          size={isMobile ? "small" : "default"}
        >
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