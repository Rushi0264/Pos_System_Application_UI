import { Input } from "antd";

const SupplierSearch = ({ search, setSearch }) => {
  return (
    <Input.Search
      placeholder="Search Supplier"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: 20 }}
      allowClear
    />
  );
};

export default SupplierSearch;