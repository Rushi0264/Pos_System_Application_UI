import MainLayout from "../../layouts/MainLayout";

import SuperAdminDashboard from "../../components/dashboard/roles/SuperAdminDashboard";
import StoreAdminDashboard from "../../components/dashboard/roles/StoreAdminDashboard";
import StoreManagerDashboard from "../../components/dashboard/roles/StoreManagerDashboard";
import BranchManagerDashboard from "../../components/dashboard/roles/BranchManagerDashboard";
import CashierDashboard from "../../components/dashboard/roles/CashierDashboard";
import InventoryDashboard from "../../components/dashboard/roles/InventoryDashboard";
//import InventoryDashboard from "../../pages/dashboard/InventoryDashboard";
import AccountantDashboard from "../../components/dashboard/roles/AccountantDashboard";

const Dashboard = () => {
  const user =
    JSON.parse(localStorage.getItem("pos_user")) || {};

  const role = user.role;

  const renderDashboard = () => {
    switch (role) {
      case "ROLE_SUPER_ADMIN":
        return <SuperAdminDashboard />;

      case "ROLE_STORE_ADMIN":
        return <StoreAdminDashboard />;

      case "ROLE_STORE_MANAGER":
        return <StoreManagerDashboard />;

      case "ROLE_BRANCH_MANAGER":
        return <BranchManagerDashboard />;

      case "ROLE_BRANCH_CASHIER":
        return <CashierDashboard />;

              case "ROLE_INVENTORY_MANAGER":
        return <InventoryDashboard />;

        case "ROLE_ACCOUNTANT":
  return <AccountantDashboard />;

      default:
        return (
          <div
            style={{
              padding: 40,
              textAlign: "center",
            }}
          >
            <h2>No Dashboard Assigned</h2>
          </div>
        );
    }
  };

  return (
    <MainLayout>
      {renderDashboard()}
    </MainLayout>
  );
};

export default Dashboard;