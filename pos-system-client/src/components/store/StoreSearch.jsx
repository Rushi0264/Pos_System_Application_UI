import { Row, Col, Input, Select } from "antd";

const { Search } = Input;

const StoreSearch = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>
      <Col xs={24} md={12}>
        <Search
          placeholder="Search Brand / Email / Phone / Store Type"
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>

      <Col xs={24} md={12}>
        <Select
          style={{ width: "100%" }}
          value={status}
          onChange={setStatus}
        >
          <Select.Option value="ALL">
            All Status
          </Select.Option>

          <Select.Option value="ACTIVE">
            ACTIVE
          </Select.Option>

          <Select.Option value="PENDING">
            PENDING
          </Select.Option>

          <Select.Option value="INACTIVE">
            INACTIVE
          </Select.Option>

          <Select.Option value="SUSPENDED">
            SUSPENDED
          </Select.Option>
        </Select>
      </Col>
    </Row>
  );
};

export default StoreSearch;