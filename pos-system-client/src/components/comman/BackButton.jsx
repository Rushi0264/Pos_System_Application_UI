import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      onClick={handleBack}
      style={{ marginBottom: 16 }}
    >
      Back
    </Button>
  );
};

export default BackButton;