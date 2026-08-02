import { useEffect, useState } from "react";

import {
  Card,
  Button,
  message,
} from "antd";

import {
  PlusOutlined,
} from "@ant-design/icons";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import OrderTable from "../../components/orders/OrderTable";

import {
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
} from "../../services/orderService";
import MainLayout from "../../layouts/MainLayout";


const OrderList = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTodayFilter = searchParams.get("filter") === "today";

  const user = JSON.parse(localStorage.getItem("pos_user")) || {};
  const role = user.role;
  const isAccountant = role === "ROLE_ACCOUNTANT";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [isTodayFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getAllOrders();

      let filtered = data;

      if (isTodayFilter) {
        const todayStr = new Date().toDateString();

        filtered = data.filter((o) => {
          if (!o.createdAt) return false;
          return new Date(o.createdAt).toDateString() === todayStr;
        });
      }

      setOrders(filtered);

    } catch (error) {
      console.log(error);
      message.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      message.success("Order deleted successfully");
      loadOrders();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      message.success(`Order marked as ${newStatus}`);
      loadOrders();
    } catch (error) {
      console.log(error);
      message.error(
        error.response?.data?.message ||
        "Failed to update order status"
      );
    }
  };

  return (
    <MainLayout>
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
            Showing today's orders
          </span>
          <Button
            size="small"
            onClick={() => navigate("/orders")}
          >
            Show All Orders
          </Button>
        </div>
      )}

      <Card
        title="Orders"
        extra={
          !isAccountant && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/orders/create")}
            >
              Create Order
            </Button>
          )
        }
      >
        <OrderTable
          orders={orders}
          loading={loading}
          onView={(id) => navigate(`/orders/${id}`)}
          onDelete={handleDelete}
          onStatus={handleStatusChange}
          hideDelete={isAccountant}
        />
      </Card>
    </MainLayout>
  );
};

export default OrderList;