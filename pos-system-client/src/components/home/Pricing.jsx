import { motion } from "framer-motion";
import "./Pricing.css";
import { Button } from "antd";

function Pricing() {
  return (
    <motion.section
      className="pricing"
      id="pricing"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
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

    </motion.section>
  );
}

export default Pricing;