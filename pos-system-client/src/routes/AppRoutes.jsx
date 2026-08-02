import { Routes, Route, Navigate } from "react-router-dom";


import Login from "../pages/auth/Login";
//register store
import RegisterStore from "../pages/auth/RegisterStore";
import Dashboard from "../pages/dashboard/Dashboard";

// Stores
import StoreList from "../pages/store/StoreList";
import CreateStore from "../pages/store/CreateStore";
import EditStore from "../pages/store/EditStore";
import StoreDetails from "../pages/store/StoreDetails";

// Branches
import BranchList from "../pages/branch/BranchList";
import CreateBranch from "../pages/branch/CreateBranch";
import EditBranch from "../pages/branch/EditBranch";
import BranchDetails from "../pages/branch/BranchDetails";

// Categories
import CategoryList from "../pages/category/CategoryList";
import CreateCategory from "../pages/category/CreateCategory";
import EditCategory from "../pages/category/EditCategory";
import CategoryDetails from "../pages/category/CategoryDetails";

// Products
import ProductList from "../pages/product/ProductList";
import AddProduct from "../pages/product/AddProduct";
import EditProduct from "../pages/product/EditProduct";
import ProductDetails from "../pages/product/ProductDetails";

// Users
import UserList from "../pages/user/UserList";
import CreateUser from "../pages/user/CreateUser";
import EditUser from "../pages/user/EditUser";
import UserDetails from "../pages/user/UserDetails";

// Employees
import EmployeeList from "../pages/employee/EmployeeList";
import CreateEmployee from "../pages/employee/CreateEmployee";
import EditEmployee from "../pages/employee/EditEmployee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";

import Inventory from "../pages/inventory/Inventory";

import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/auth/Register";
import RoleProtectedRoute from "./RoleProtectedRoute";

import CustomerList from "../pages/customers/CustomerList";
import CreateCustomer from "../pages/customers/CreateCustomer";
import EditCustomer from "../pages/customers/EditCustomer";


// Orders
import OrderList from "../pages/orders/OrderList";
import CreateOrder from "../pages/orders/CreateOrder";
import OrderDetails from "../pages/orders/OrderDetails";
//import GlobalBackground from "./components/comman/GlobalBackground";
import TodayOrders from "../pages/orders/TodayOrders";

// Suppliers
import SupplierList from "../pages/suppliers/SupplierList";
import CreateSupplier from "../pages/suppliers/CreateSupplier";
import EditSupplier from "../pages/suppliers/EditSupplier";
import SupplierDetails from "../pages/suppliers/SupplierDetails";

// Purchases
import PurchaseList from "../pages/purchases/PurchaseList";
import CreatePurchase from "../pages/purchases/CreatePurchase";
import PurchaseDetails from "../pages/purchases/PurchaseDetails";

// Payments
import PaymentList from "../pages/payment/PaymentList";
import PaymentSummaryReport from "../pages/payment/PaymentSummaryReport";

// Refunds
import RefundList from "../pages/refunds/RefundList";
import CreateRefund from "../pages/refunds/CreateRefund";
import RefundDetails from "../pages/refunds/RefundDetails";

// Shift Reports
import ShiftDashboard from "../pages/shift/ShiftDashboard";
import ShiftReportList from "../pages/shift/ShiftReportList";
import ShiftReportDetails from "../pages/shift/ShiftReportDetails";

import StockTransfer from "../pages/inventory/StockTransfer";
// Reports
import Reports from "../pages/reports/Reports";
import BranchInventory from "../pages/inventory/BranchInventory";

//Home
import Home from "../pages/home/Home" 

// Settings
import Settings from "../pages/settings/Settings";

const Unauthorized = () => (
  <div className="flex items-center justify-center h-screen text-3xl font-bold text-red-500">
    Unauthorized Access
  </div>
);

function AppRoutes() {
  return (
    <Routes>

    
      {/* Home */}
<Route path="/" element={<Home />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      
      <Route path="/register-store" element={<RegisterStore />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ===================== STORES ===================== */}

      <Route
        path="/stores"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={["ROLE_SUPER_ADMIN"]}
            >
              <StoreList />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/stores/create"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={["ROLE_SUPER_ADMIN"]}
            >
              <CreateStore />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/stores/edit/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={["ROLE_SUPER_ADMIN"]}
            >
              <EditStore />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/stores/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={["ROLE_SUPER_ADMIN"]}
            >
              <StoreDetails />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ===================== BRANCHES ===================== */}

<Route
  path="/branches"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
        ]}
      >
        <BranchList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/branches/create"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
        ]}
      >
        <CreateBranch />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/branches/edit/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
        ]}
      >
        <EditBranch />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/branches/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
        ]}
      >
        <BranchDetails />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

      {/* ===================== CATEGORIES ===================== */}

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
              ]}
            >
              <CategoryList />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories/create"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
              ]}
            >
              <CreateCategory />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories/edit/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
              ]}
            >
              <EditCategory />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
              ]}
            >
              <CategoryDetails />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ===================== PRODUCTS ===================== */}

      <Route
  path="/products"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
  "ROLE_SUPER_ADMIN",
  "ROLE_STORE_ADMIN",
  "ROLE_BRANCH_MANAGER",
  "ROLE_BRANCH_CASHIER",
  "ROLE_INVENTORY_MANAGER",
]}
      >
        <ProductList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

      <Route
        path="/products/add"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_INVENTORY_MANAGER",
]}
            >
              <AddProduct />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_INVENTORY_MANAGER",
]}
            >
              <EditProduct />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
                "ROLE_INVENTORY_MANAGER",  
          "ROLE_BRANCH_MANAGER",       
          "ROLE_BRANCH_CASHIER"
              ]}
            >
              <ProductDetails />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ===================== EMPLOYEES ===================== */}

      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
              ]}
            >
              <EmployeeList />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/create"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
              ]}
            >
              <CreateEmployee />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/edit/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
              ]}
            >
              <EditEmployee />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "ROLE_SUPER_ADMIN",
                "ROLE_STORE_ADMIN",
              ]}
            >
              <EmployeeDetails />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ===================== USERS ===================== */}

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={["ROLE_SUPER_ADMIN"]}
            >
              <UserList />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/create"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={["ROLE_SUPER_ADMIN"]}
            >
              <CreateUser />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/edit/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={["ROLE_SUPER_ADMIN"]}
            >
              <EditUser />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/:id"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={["ROLE_SUPER_ADMIN"]}
            >
              <UserDetails />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ===================== INVENTORY ===================== */}

<Route
  path="/inventory"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
  "ROLE_SUPER_ADMIN",
  "ROLE_STORE_ADMIN",
  "ROLE_BRANCH_MANAGER",
  "ROLE_INVENTORY_MANAGER",
]}
      >
        <Inventory />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/inventory/branch"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_BRANCH_CASHIER",
          "ROLE_BRANCH_MANAGER",
        ]}
      >
        <BranchInventory />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>



<Route
  path="/register"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["ROLE_SUPER_ADMIN"]}>
        <Register />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>



      {/* ===================== CUSTOMERS ===================== */}

<Route
  path="/customers"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_BRANCH_CASHIER",
        ]}
      >
        <CustomerList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/customers/create"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          
          "ROLE_BRANCH_CASHIER",
        ]}
      >
        <CreateCustomer />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/customers/edit/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          
          "ROLE_BRANCH_CASHIER",
        ]}
      >
        <EditCustomer />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>
{/* ===================== ORDERS ===================== */}

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          
          "ROLE_BRANCH_MANAGER",
          "ROLE_BRANCH_CASHIER",
          "ROLE_ACCOUNTANT",
        ]}
      >
        <OrderList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>


<Route
  path="/orders/create"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_BRANCH_CASHIER",
        ]}
      >
        <CreateOrder />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>


<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          
          "ROLE_BRANCH_MANAGER",
          "ROLE_BRANCH_CASHIER",
          "ROLE_EMPLOYEE",
          "ROLE_ACCOUNTANT",
        ]}
      >
        <OrderDetails />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/today-orders"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_BRANCH_CASHIER",
          "ROLE_EMPLOYEE",
        ]}
      >
        <TodayOrders />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

{/* ===================== SUPPLIERS ===================== */}

<Route
  path="/suppliers"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_INVENTORY_MANAGER"
]}
      >
        <SupplierList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/suppliers/create"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_INVENTORY_MANAGER"
]}
      >
        <CreateSupplier />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/suppliers/edit/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_INVENTORY_MANAGER"
]}
      >
        <EditSupplier />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/suppliers/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_INVENTORY_MANAGER"
]}
      >
        <SupplierDetails />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

{/* ===================== PURCHASES ===================== */}

<Route
  path="/purchases"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_INVENTORY_MANAGER",
 "ROLE_ACCOUNTANT",
]}
      >
        <PurchaseList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/purchases/create"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_INVENTORY_MANAGER",
        ]}
      >
        <CreatePurchase />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/purchases/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
  "ROLE_INVENTORY_MANAGER",
 "ROLE_ACCOUNTANT",
]}
      >
        <PurchaseDetails />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

{/* ===================== PAYMENTS ===================== */}

<Route
  path="/payments"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_BRANCH_MANAGER",
 "ROLE_BRANCH_CASHIER",
 "ROLE_ACCOUNTANT",
]}
      >
        <PaymentList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/payments/summary"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_ACCOUNTANT",
        ]}
      >
        <PaymentSummaryReport />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

{/* ===================== REFUNDS ===================== */}

<Route
  path="/refunds"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_BRANCH_CASHIER",
          "ROLE_ACCOUNTANT",
        ]}
      >
        <RefundList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/refunds/create"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_BRANCH_CASHIER",
        ]}
      >
        <CreateRefund />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/refunds/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_BRANCH_CASHIER",
          "ROLE_ACCOUNTANT",
        ]}
      >
        <RefundDetails />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

{/* ===================== SHIFT REPORTS ===================== */}

<Route
  path="/shift/dashboard"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_BRANCH_CASHIER",
        ]}
      >
        <ShiftDashboard />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/shift-reports"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
 "ROLE_SUPER_ADMIN",
 "ROLE_STORE_ADMIN",
 "ROLE_BRANCH_MANAGER",
 "ROLE_INVENTORY_MANAGER",
 "ROLE_ACCOUNTANT",
]}
      >
        <ShiftReportList />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/shift-reports/:id"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_ACCOUNTANT",
        ]}
      >
        <ShiftReportDetails />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

{/* ===================== REPORTS ===================== */}

<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_BRANCH_MANAGER",
          "ROLE_INVENTORY_MANAGER",
          "ROLE_ACCOUNTANT",
        ]}
      >
        <Reports />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/inventory/transfer"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute
        allowedRoles={[
          "ROLE_SUPER_ADMIN",
          "ROLE_STORE_ADMIN",
          "ROLE_INVENTORY_MANAGER",
        ]}
      >
        <StockTransfer />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

{/* ===================== SETTINGS ===================== */}

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

      {/* Unauthorized */}
      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />


      {/* Default */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;