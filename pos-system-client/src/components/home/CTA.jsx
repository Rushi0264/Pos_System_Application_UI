import { motion } from "framer-motion";
import "./CTA.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <motion.section
      className="cta"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >

      <h2>Ready to Grow Your Business?</h2>

      <p>
        Start managing your stores with our Enterprise POS System today.
      </p>

      <Link to="/register-store">
        <Button type="primary" size="large">
          Start Free Trial
        </Button>
      </Link>

    </motion.section>
  );
}

export default CTA;