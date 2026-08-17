import { Layout, Menu } from "antd";

import {
  DashboardOutlined,
  ShopOutlined,
  ApartmentOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  DatabaseOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RollbackOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  TruckOutlined,
  ShoppingFilled,
  CreditCardOutlined,
  ContactsOutlined,
  ClockCircleOutlined,
  SwapOutlined, 
} from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logo from "./Logo";
import { logout } from "../../redux/authSlice";


const { Sider } = Layout;


const Sidebar = ({ collapsed , isMobile  }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const user =
    JSON.parse(sessionStorage.getItem("pos_user")) || {};


  const role = user.role;



  const menuItems = {


ROLE_SUPER_ADMIN: [
      {
        key: "/dashboard",
        icon:<DashboardOutlined/>,
        label:"Dashboard"
      },
      {
        key:"/stores",
        icon:<ShopOutlined/>,
        label:"Stores"
      },
      {
        key:"/branches",
        icon:<ApartmentOutlined/>,
        label:"Branches"
      },
      {
        key:"/users",
        icon:<UserOutlined/>,
        label:"Users"
      },
      {
        key:"/settings",
        icon:<SettingOutlined/>,
        label:"Settings"
      }
    ],



    ROLE_STORE_ADMIN:[
      {
        key:"/dashboard",
        icon:<DashboardOutlined/>,
        label:"Dashboard"
      },
      {
        key:"/branches",
        icon:<ApartmentOutlined/>,
        label:"Branches"
      },
      {
        key:"/employees",
        icon:<TeamOutlined/>,
        label:"Employees"
      },
      {
        key:"/categories",
        icon:<AppstoreOutlined/>,
        label:"Categories"
      },
      {
        key:"/products",
        icon:<ShoppingOutlined/>,
        label:"Products"
      },
      {
        key:"/suppliers",
        icon:<TruckOutlined/>,
        label:"Suppliers"
      },
      {
        key:"/purchases",
        icon:<ShoppingFilled/>,
        label:"Purchases"
      },
      {
        key:"/inventory",
        icon:<DatabaseOutlined/>,
        label:"Inventory"
      },
            {
        key:"/inventory/transfer",
        icon:<SwapOutlined/>,
        label:"Stock Transfer"
      },
      {
        key:"/customers",
        icon:<ContactsOutlined/>,
        label:"Customers"
      },
      {
        key:"/orders",
        icon:<ShoppingCartOutlined/>,
        label:"Orders"
      },
      {
        key:"/payments",
        icon:<CreditCardOutlined/>,
        label:"Payments"
      },
      {
        key:"/refunds",
        icon:<RollbackOutlined/>,
        label:"Refunds"
      },
      {
        key:"/reports",
        icon:<BarChartOutlined/>,
        label:"Reports"
      },
      {
  key: "/settings",
  icon: <SettingOutlined />,
  label: "Settings"
},
    ],



    ROLE_BRANCH_MANAGER:[
      {
        key:"/dashboard",
        icon:<DashboardOutlined/>,
        label:"Dashboard"
      },
      {
        key:"/inventory",
        icon:<DatabaseOutlined/>,
        label:"Inventory"
      },
      {
        key:"/products",
        icon:<ShoppingOutlined/>,
        label:"Products"
      },
      /*{
        key:"/purchases",
        icon:<ShoppingFilled/>,
        label:"Purchases"
      },*/
      {
    key:"/shift-reports",
    icon:<ClockCircleOutlined/>,
    label:"Shift Reports"
  },
      {
        key:"/customers",
        icon:<UserOutlined/>,
        label:"Customers"
      },
      {
        key:"/orders",
        icon:<ShoppingCartOutlined/>,
        label:"Orders"
      },
      {
        key:"/payments",
        icon:<CreditCardOutlined/>,
        label:"Payments"
      },
      {
        key:"/refunds",
        icon:<RollbackOutlined/>,
        label:"Refunds"
      }
    ,
    {
  key: "/settings",
  icon: <SettingOutlined />,
  label: "Settings"
},
    ],



    ROLE_BRANCH_CASHIER:[
      {
        key:"/dashboard",
        icon:<DashboardOutlined/>,
        label:"Dashboard"
      },
        {
    key:"/shift/dashboard",          
    icon:<ClockCircleOutlined/>,      
    label:"My Shift"                  
  },
      {
        key:"/orders",
        icon:<ShoppingCartOutlined/>,
        label:"Orders"
      },
        {
    key:"/inventory/branch",    
    icon:<DatabaseOutlined/>,          
    label:"Branch Inventory"              
  },
      {
        key:"/customers",
        icon:<UserOutlined/>,
        label:"Customers"
      },
      {
        key:"/payments",
        icon:<CreditCardOutlined/>,
        label:"Payments"
      },
      {
        key:"/refunds",
        icon:<RollbackOutlined/>,
        label:"Refunds"
      },
      {
  key: "/settings",
  icon: <SettingOutlined />,
  label: "Settings"
},
    ], 

        ROLE_INVENTORY_MANAGER:[

      {
        key:"/dashboard",
        icon:<DashboardOutlined/>,
        label:"Dashboard"
      },

      {
        key:"/products",
        icon:<ShoppingOutlined/>,
        label:"Products"
      },

      {
        key:"/inventory",
        icon:<DatabaseOutlined/>,
        label:"Inventory"
      },
      {
        key:"/inventory/transfer",
        icon:<SwapOutlined/>,
        label:"Stock Transfer"
      },
      {
        key:"/purchases",
        icon:<ShoppingFilled/>,
        label:"Purchases"
      },

      {
        key:"/suppliers",
        icon:<TruckOutlined/>,
        label:"Suppliers"
      },

      {
        key:"/reports",
        icon:<BarChartOutlined/>,
        label:"Reports"
      },
      {
  key: "/settings",
  icon: <SettingOutlined />,
  label: "Settings"
},

    ],



    ROLE_ACCOUNTANT:[

  {
    key:"/dashboard",
    icon:<DashboardOutlined/>,
    label:"Dashboard"
  },

  {
    key:"/payments",
    icon:<CreditCardOutlined/>,
    label:"Payments"
  },

  {
    key:"/payments/summary",
    icon:<BarChartOutlined/>,
    label:"Payment Summary"
  },

  {
    key:"/purchases",
    icon:<ShoppingFilled/>,
    label:"Purchases"
  },

  {
    key:"/orders",
    icon:<ShoppingCartOutlined/>,
    label:"Orders"
  },

  {
    key:"/refunds",
    icon:<RollbackOutlined/>,
    label:"Refunds"
  },
{
  key:"/shift-reports",
  icon:<ClockCircleOutlined/>,
  label:"Shift Reports"
},
  {
    key:"/reports",
    icon:<BarChartOutlined/>,
    label:"Reports"
  },
  {
  key: "/settings",
  icon: <SettingOutlined />,
  label: "Settings"
},

]

  };



  const items = [
    ...(menuItems[role] || []),
    {
      key:"/logout",
      icon:<LogoutOutlined/>,
      label:"Logout"
    }
  ];




  return (

    <Sider
      width={260}
collapsedWidth={isMobile ? 0 : 80}
  breakpoint="lg"
      collapsible
      collapsed={collapsed}
      trigger={null}

      style={{
        background:"#0f172a",
        boxShadow:"4px 0 18px rgba(0,0,0,.15)",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        overflow: "hidden",
        zIndex: isMobile ? 1001 : 100,
        display: "flex",
        flexDirection: "column",
      }}
    >

      <div style={{ flexShrink: 0 }}>
        <Logo collapsed={collapsed}/>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}
        className="sidebar-menu-scroll"
      >
        <Menu

          theme="dark"

          mode="inline"

          selectedKeys={[
            location.pathname
          ]}

          items={items}


          onClick={({key})=>{


            if(key==="/logout"){

              dispatch(logout());

              sessionStorage.clear();

              navigate("/login");

              return;
            }


            navigate(key);

          }}


          style={{
            background:"#0f172a",
            borderRight:0,
            marginTop:10,
            fontSize:15
          }}

        />
      </div>

    </Sider>

  );
};


export default Sidebar;