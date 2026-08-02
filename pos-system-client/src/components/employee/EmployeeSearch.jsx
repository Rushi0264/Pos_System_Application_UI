import { Input } from "antd";

const EmployeeSearch = ({
  search,
  setSearch,
}) => {
  return (
    <Input.Search
      placeholder="Search Employee"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      style={{ marginBottom: 20 }}
      allowClear
    />
  );
};

export default EmployeeSearch;