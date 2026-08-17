import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    value: "Products",
    label: "📦 Products",
    path: "/products",
  },
  {
    value: "Stores",
    label: "🏪 Stores",
    path: "/stores",
  },
  {
    value: "Branches",
    label: "🏢 Branches",
    path: "/branches",
  },
  {
    value: "Users",
    label: "👤 Users",
    path: "/users",
  },
  {
    value: "Categories",
    label: "📂 Categories",
    path: "/categories",
  },
  {
    value: "Orders",
    label: "🛒 Orders",
    path: "/orders",
  },
];

const SearchBar = ({ isMobile }) => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);

  const handleSearch = (text) => {
    if (!text) {
      setOptions([]);
      return;
    }

    const result = data
      .filter((item) =>
        item.value.toLowerCase().includes(text.toLowerCase())
      )
      .map((item) => ({
        value: item.value,
        label: item.label,
        path: item.path,
      }));

    setOptions(result);
  };

  return (
    <AutoComplete
      style={{ width: isMobile ? 130 : 320 }}
      options={options}
      onSearch={handleSearch}
      onSelect={(value, option) => navigate(option.path)}
    >
      <Input
        size="large"
        prefix={<SearchOutlined />}
        placeholder={isMobile ? "Search..." : "Search Products, Stores..."}
      />
    </AutoComplete>
  );
};

export default SearchBar;