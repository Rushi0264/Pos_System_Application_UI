import { Dropdown, Button } from "antd";
import {
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        dispatch(logout());
        navigate("/login");
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Button
        type="text"
        icon={<DownOutlined />}
        style={{
          border: "none",
          boxShadow: "none",
        }}
      />
    </Dropdown>
  );
};

export default UserMenu;