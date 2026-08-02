import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import "./Home.css";

import Features from "../../components/home/Features";
import DashboardMockup from "../../components/home/DashboardMockup";
import Testimonials from "../../components/home/Testimonials";
import Pricing from "../../components/home/Pricing";
import CTA from "../../components/home/CTA";
import Footer from "../../components/home/Footer";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span>🛍️</span>
          NexoraPOS
        </div>

        <div className="menu">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="buttons">
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>

          <Button
            type="primary"
            onClick={() => navigate("/register-store")}
          >
            Get Started Free
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>

        <p className="tag">All-in-One Retail POS Platform</p>

        <h1>
          Run Your Store
          <br />
          Smarter, Not
          <br />
          Harder
        </h1>

        <p className="subtitle">
          NexoraPOS brings your billing, inventory, branches,
          staff, and sales reports together in one powerful,
          beautifully simple dashboard.
        </p>

        <div className="hero-buttons">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/register-store")}
          >
            Start Your Store Today
          </Button>
        </div>
      </motion.section>

      {/* Statistics */}
      <section
        className="stats"
        data-aos="fade-up"
      >
        <div className="card">
          <h2>5000+</h2>
          <p>Stores Powered</p>
        </div>

        <div className="card">
          <h2>₹100M+</h2>
          <p>Sales Processed Monthly</p>
        </div>

        <div className="card">
          <h2>99.9%</h2>
          <p>Uptime You Can Rely On</p>
        </div>
      </section>

      <Features />

      <DashboardMockup />

      <Testimonials />

      <Pricing />

      <CTA />

      <Footer />
    </div>
  );
}

export default Home;