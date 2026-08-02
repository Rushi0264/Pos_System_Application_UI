import { useEffect, useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import shiftReportService from "../../services/shiftReportService";
import ShiftReportTable from "../../components/shift/ShiftReportTable";
import BackButton from "../../components/comman/BackButton";

const ShiftReportList = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("pos_user")) || {};

let data;

if (user.role === "ROLE_STORE_ADMIN" || user.role === "ROLE_ACCOUNTANT" || user.role === "ROLE_SUPER_ADMIN") {
  if (!user.storeId) {
    setReports([]);
    return;
  }
  data = await shiftReportService.getShiftReportsByStore(user.storeId);
} else {
  if (!user.branchId) {
    setReports([]);
    return;
  }
  data = await shiftReportService.getShiftReportsByBranch(user.branchId);
}

      setReports(data);
    } catch (error) {
      message.error("Unable to load shift reports");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
        <BackButton/>
      <Card title="Shift Reports">
        <ShiftReportTable
          reports={reports}
          loading={loading}
          onView={(id) => navigate(`/shift-reports/${id}`)}
        />
      </Card>
    </MainLayout>
  );
};

export default ShiftReportList;