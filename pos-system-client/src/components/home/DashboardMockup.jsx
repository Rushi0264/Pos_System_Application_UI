import {
  BarChartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  DatabaseOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import "./DashboardMockup.css";

function DashboardMockup() {
  return (
    <div className="dashboard">

      <aside className="dashboard-sidebar">

        <h2>NexoraPOS</h2>

        <ul>

          <li><ShopOutlined /> Stores</li>

          <li><ShoppingCartOutlined /> Products</li>

          <li><DatabaseOutlined /> Inventory</li>

          <li><UserOutlined /> Employees</li>

          <li><DollarOutlined /> Sales</li>

          <li><BarChartOutlined /> Reports</li>

        </ul>

      </aside>

      <main className="dashboard-content">

        <div className="top-cards">

          <div className="top-card">

            <h3>Today's Sales</h3>

            <h1>₹1,24,500</h1>

          </div>

          <div className="top-card">

            <h3>Orders</h3>

            <h1>845</h1>

          </div>

          <div className="top-card">

            <h3>Customers</h3>

            <h1>512</h1>

          </div>

        </div>

        <div className="chart">

          <h3>Sales Analytics</h3>

          <div className="bars">

            <span style={{height:"60%"}}></span>
            <span style={{height:"90%"}}></span>
            <span style={{height:"45%"}}></span>
            <span style={{height:"100%"}}></span>
            <span style={{height:"70%"}}></span>
            <span style={{height:"82%"}}></span>

          </div>

        </div>

      </main>

    </div>
  );
}

export default DashboardMockup;