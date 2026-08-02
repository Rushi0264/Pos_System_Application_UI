import "./CTA.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section
    className="cta"
    data-aos="zoom-in"
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

    </section>
  );
}

export default CTA;