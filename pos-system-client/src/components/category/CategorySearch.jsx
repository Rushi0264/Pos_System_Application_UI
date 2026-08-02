import { Input } from "antd";

const { Search } = Input;

const CategorySearch = ({
  search,
  setSearch,
}) => {
  return (
    <Search
      placeholder="Search Category..."
      allowClear
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: 20 }}
    />
  );
};

export default CategorySearch;