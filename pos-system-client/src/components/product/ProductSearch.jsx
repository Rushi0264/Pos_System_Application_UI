import { Col, Input, Row, Select } from "antd";

const { Search } = Input;

const ProductSearch = ({
  search,
  setSearch,
  category,
  setCategory,
  categories = [],
}) => {
  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>
      <Col xs={24} md={12}>
        <Search
          placeholder="Search by Name, SKU or Brand..."
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>

      <Col xs={24} md={12}>
        <Select
          style={{ width: "100%" }}
          placeholder="Filter by Category"
          value={category}
          onChange={setCategory}
          allowClear
        >
          <Select.Option value="ALL">
            All Categories
          </Select.Option>

          {categories.map((item) => (
            <Select.Option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

export default ProductSearch;