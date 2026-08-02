import { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Space, Table, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  deleteCustomer,
  getAllCustomers,
  searchCustomers,
} from "../../services/customerService";
import MainLayout from "../../layouts/MainLayout";

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTodayFilter = searchParams.get("filter") === "today";

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const data = await getAllCustomers();

      console.log("Customers API:", data);

      let filtered = data;

      if (isTodayFilter) {
        const todayStr = new Date().toDateString();

        filtered = data.filter((c) => {
          if (!c.createdAt) return false;
          return new Date(c.createdAt).toDateString() === todayStr;
        });
      }

      setCustomers([...filtered]); // create a new array reference
    } catch (error) {
      console.error(error);
      message.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [isTodayFilter]);

  useEffect(() => {
    console.log("Customers State:", customers);
  }, [customers]);

  const handleSearch = async (value) => {
    try {
      setKeyword(value);

      if (!value.trim()) {
        loadCustomers();
        return;
      }

      setLoading(true);
      const data = await searchCustomers(value);
      setCustomers(data);
    } catch (error) {
      message.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      message.success("Customer deleted successfully");
      loadCustomers();
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Delete failed";

      message.error(backendMessage);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() =>
              navigate(`/customers/edit/${record.id}`)
            }
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Customer?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="p-6" style={{ margin: 15 }}>

        {isTodayFilter && (
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#f6ffed",
              border: "1px solid #b7eb8f",
              borderRadius: 8,
              padding: "8px 16px",
            }}
          >
            <span style={{ fontWeight: 500 }}>
              Showing today's new customers
            </span>
            <Button
              size="small"
              onClick={() => navigate("/customers")}
            >
              Show All Customers
            </Button>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >

          <Input.Search
            placeholder="Search customer..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onSearch={handleSearch}
            allowClear
            style={{ width: 350 }}
          />

          <Button
            type="primary"
            onClick={() => navigate("/customers/create")}
          >
            Add Customer
          </Button>
        </div>


        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={customers}
        />
      </div>
    </MainLayout>
  );
};

export default CustomerList;