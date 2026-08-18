import { useEffect, useState, useMemo } from "react";
import {
  Input,
  Select,
  Button,
  Space,
} from "antd";
import {
  Search,
  Download,
  Plus,
  Filter,
} from "lucide-react";

import storeService from "../../services/storeService";
import branchService from "../../services/branchService";

const { Option } = Select;

export default function InventoryFilters({
  onAdd,
  onFilterChange,
  onExport,
  inventory = [],
  isAdmin = false,
}) {
  const [stores, setStores] = useState([]);
  const [branches, setBranches] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [status, setStatus] = useState(null);

  const categories = useMemo(() => {
    const map = new Map();

    inventory.forEach((item) => {
      const cat = item.product?.category;
      if (cat && !map.has(cat.id)) {
        map.set(cat.id, cat);
      }
    });

    return Array.from(map.values());
  }, [inventory]);

  useEffect(() => {
    if (isAdmin) {
      loadDropdownData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  useEffect(() => {
    onFilterChange({ search, categoryId, storeId, branchId, status });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categoryId, storeId, branchId, status]);

const loadDropdownData = async () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("pos_user"));

    let storeData;
    if (user.role === "ROLE_SUPER_ADMIN") {
      storeData = await storeService.getAllStores();
    } else {
      const myStore = await storeService.getMyStore();
      storeData = myStore ? [myStore] : [];
    }

    if (user.role !== "ROLE_SUPER_ADMIN" && storeData.length === 1) {
  handleStoreChange(storeData[0].id);
}

    setStores(storeData || []);
  } catch (error) {
    console.error(error);
  }
  
};

  const handleStoreChange = async (value) => {
    setStoreId(value);
    setBranchId(null);

    if (!value) {
      setBranches([]);
      return;
    }

    try {
      const data = await branchService.getBranchesByStore(value);
      setBranches(data || []);
    } catch (error) {
      console.error(error);
      setBranches([]);
    }
  };

const selectStyle = {
  width: "100%",
  maxWidth: 170,
  borderRadius: 10,
};

  return (
    <div
  style={{
    borderRadius: 20,
    background: "#fff",
    border: "1px solid #eef0f4",
    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.05)",
    padding: "18px clamp(12px, 3vw, 22px)",
    margin: "0 clamp(-8px, -2vw, 20px)",
  }}
>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #4338ca)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Filter size={15} color="#fff" />
        </div>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>
          Filters
        </span>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <Space wrap size="middle" className="w-full lg:w-auto">
          <Input
            allowClear
            placeholder="Search Product..."
            prefix={<Search size={16} color="#9ca3af" />}
              style={{
    width: "100%",
    maxWidth: 250,
    borderRadius: 10,
    height: 40,
  }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            placeholder="Category"
            style={selectStyle}
            allowClear
            value={categoryId}
            onChange={(value) => setCategoryId(value)}
          >
            {categories.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>

          {isAdmin && (
            <>
              <Select
                placeholder="Store"
                style={selectStyle}
                allowClear
                value={storeId}
                onChange={handleStoreChange}
              >
                {stores.map((s) => (
                  <Option key={s.id} value={s.id}>
                    {s.name || s.brand}
                  </Option>
                ))}
              </Select>

              <Select
                placeholder="Branch"
                style={selectStyle}
                allowClear
                value={branchId}
                onChange={(value) => setBranchId(value)}
                disabled={!branches.length}
              >
                {branches.map((b) => (
                  <Option key={b.id} value={b.id}>
                    {b.name}
                  </Option>
                ))}
              </Select>
            </>
          )}

          <Select
            placeholder="Status"
            style={selectStyle}
            allowClear
            value={status}
            onChange={(value) => setStatus(value)}
          >
            <Option value="instock">
              <span style={{ color: "#16a34a" }}>● </span>In Stock
            </Option>
            <Option value="lowstock">
              <span style={{ color: "#d97706" }}>● </span>Low Stock
            </Option>
            <Option value="outofstock">
              <span style={{ color: "#dc2626" }}>● </span>Out Of Stock
            </Option>
          </Select>
        </Space>

        <Space wrap>
          <Button
            icon={<Download size={16} />}
            onClick={onExport}
            style={{
              borderRadius: 10,
              height: 40,
              fontWeight: 500,
            }}
          >
            Export
          </Button>

          <Button
            type="primary"
            onClick={onAdd}
            icon={<Plus size={16} />}
            style={{
              borderRadius: 10,
              height: 40,
              fontWeight: 600,
              background: "linear-gradient(135deg, #10b981, #059669)",
              border: "none",
              boxShadow: "0 6px 14px rgba(16,185,129,0.3)",
            }}
          >
            Add Stock
          </Button>
        </Space>
      </div>
    </div>
  );
}