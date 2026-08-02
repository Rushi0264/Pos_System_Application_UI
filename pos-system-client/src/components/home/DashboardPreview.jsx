import "./DashboardPreview.css";
import { Button } from "antd";

function DashboardPreview() {
  return (
    <section
    className="dashboard-preview"
    data-aos="fade-up"
>

      <div className="preview-content">

        <span className="preview-tag">
          Enterprise Dashboard
        </span>

        <h2>
          Manage Your Entire Retail Business
          <br />
          From One Dashboard
        </h2>

        <p>
          Monitor stores, branches, inventory, billing,
          customers, employees, reports and sales in
          real time from one centralized platform.
        </p>

        <Button type="primary" size="large">
          Explore Dashboard
        </Button>

      </div>

      <div className="preview-image">

        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200"
          alt="Dashboard"
        />

      </div>

    </section>
  );
}

export default DashboardPreview;