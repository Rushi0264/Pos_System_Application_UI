import { Input, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const UserSearch = ({ search, setSearch }) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
      <Col xs={24} sm={12} md={10} lg={8}>
        <Input
          size="large"
          allowClear
          placeholder="Search by name, email or phone..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default UserSearch;