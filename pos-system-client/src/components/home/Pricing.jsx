import "./Pricing.css";
import { Button } from "antd";

function Pricing() {
  return (
    <section
    className="pricing"
    id="pricing"
    data-aos="fade-up"
>

      <h2>Simple Pricing</h2>

      <div className="pricing-cards">

        <div className="price-card">

          <h3>Starter</h3>

          <h1>₹999</h1>

          <p>/month</p>

          <ul>
            <li>1 Store</li>
            <li>Basic Billing</li>
            <li>Inventory</li>
            <li>Email Support</li>
          </ul>

          <Button type="primary" block>
            Choose Plan
          </Button>

        </div>

        <div className="price-card active">

          <h3>Professional</h3>

          <h1>₹2999</h1>

          <p>/month</p>

          <ul>
            <li>Unlimited Stores</li>
            <li>Reports</li>
            <li>Staff Management</li>
            <li>Priority Support</li>
          </ul>

          <Button type="primary" block>
            Get Started
          </Button>

        </div>

      </div>

    </section>
  );
}

export default Pricing;