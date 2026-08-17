import { useEffect, useState } from "react";
import { Card, Select, Table, Tag, message, Row, Col } from "antd";

import MainLayout from "../../layouts/MainLayout";
import paymentSummaryService from "../../services/paymentSummaryService";
import branchService from "../../services/branchService";
import storeService from "../../services/storeService";
import BackButton from "../../components/comman/BackButton";

const PaymentSummaryReport = () => {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState(null);

  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState(null);

  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(sessionStorage.getItem("pos_user") || "null");
  const isSingleStoreUser =
    currentUser?.role === "ROLE_STORE_ADMIN" ||
    currentUser?.role === "ROLE_INVENTORY_MANAGER" ||
    currentUser?.role === "ROLE_ACCOUNTANT";

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    if (storeId) {
      loadBranchesByStore(storeId);
    }
  }, [storeId]);

  useEffect(() => {
    if (branchId) {
      fetchSummary();
    }
  }, [branchId]);

  const loadStores = async () => {
    try {
      let data;

      if (isSingleStoreUser) {
        const myStore = await storeService.getMyStore();
        data = myStore ? [myStore] : [];
      } else {
        data = await storeService.getAllStores();
      }

      setStores(data);

      if (data.length > 0) {
        setStoreId(data[0].id);
      }
    } catch (error) {
      message.error("Unable to load stores");
    }
  };

  const loadBranchesByStore = async (selectedStoreId) => {
    try {
      const data = await branchService.getBranchesByStore(selectedStoreId);

      setBranches(data);

      if (data.length > 0) {
        setBranchId(data[0].id);
      } else {
        setBranchId(null);
        setSummary([]);
      }
    } catch (error) {
      message.error("Unable to load branches");
    }
  };

  const fetchSummary = async () => {
    try {
      setLoading(true);

      const data = await paymentSummaryService.getSummaryByBranch(branchId);

      setSummary(data);
    } catch (error) {
      message.error("Unable to load payment summary");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Payment Type",
      dataIndex: "type",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (amount) => `₹${Number(amount).toLocaleString("en-IN")}`,
    },
    {
      title: "Transaction Count",
      dataIndex: "transactionCount",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      render: (p) => `${Number(p).toFixed(2)}%`,
    },
  ];

  return (
    <MainLayout>
      <BackButton />
      <Card
        title="Payment Summary Report"
        extra={
          <Row gutter={12}>
            {!isSingleStoreUser && (
              <Col>
                <Select
                  placeholder="Select Store"
                  value={storeId}
                  onChange={(value) => {
                    setStoreId(value);
                    setBranchId(null);
                    setSummary([]);
                  }}
                  style={{ width: 200 }}
                >
                  {stores.map((s) => (
                    <Select.Option key={s.id} value={s.id}>
                      {s.name || s.brand}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            )}

            <Col>
              <Select
                placeholder="Select Branch"
                value={branchId}
                onChange={(value) => setBranchId(value)}
                style={{ width: 200 }}
                disabled={!branches.length}
              >
                {branches.map((b) => (
                  <Select.Option key={b.id} value={b.id}>
                    {b.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        }
      >
        <Table
          rowKey="type"
          loading={loading}
          columns={columns}
          dataSource={summary}
          pagination={false}
        />
      </Card>
    </MainLayout>
  );
};

export default PaymentSummaryReport;