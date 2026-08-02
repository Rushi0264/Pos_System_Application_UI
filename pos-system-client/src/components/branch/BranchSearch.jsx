import { Input } from "antd";

const { Search } = Input;

const BranchSearch = ({
  search,
  setSearch,
}) => {
  return (
    <Search
      placeholder="Search Branch..."
      value={search}
      allowClear
      style={{ marginBottom: 20 }}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default BranchSearch;