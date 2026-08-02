import { motion } from "framer-motion";
import {
  Home,
  Store,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
} from "lucide-react";

const stats = [
  { title: "Total Sales", value: "₹12.5M", growth: "+12.5%" },
  { title: "Orders", value: "3,245", growth: "+8.4%" },
  { title: "Products", value: "15,230", growth: "+6.2%" },
  { title: "Employees", value: "245", growth: "+9.1%" },
];

const products = [
  "Wireless Headphone",
  "Smart Watch",
  "Bluetooth Speaker",
  "USB Keyboard",
];

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 overflow-hidden rounded-3xl bg-white shadow-2xl"
    >
      <div className="flex">
        {/* Sidebar */}
        <div className="flex w-20 flex-col items-center gap-6 border-r bg-gray-50 py-6">
          <div className="rounded-xl bg-green-500 p-3 text-white">
            <Home size={20} />
          </div>

          <Store className="text-gray-500" />
          <Package className="text-gray-500" />
          <ShoppingCart className="text-gray-500" />
          <Users className="text-gray-500" />
          <FileText className="text-gray-500" />
          <Settings className="text-gray-500" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <h2 className="mb-5 text-xl font-bold">Dashboard</h2>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {stats.map((item) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={item.title}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <p className="text-xs text-gray-500">{item.title}</p>

                <h3 className="mt-2 text-xl font-bold">
                  {item.value}
                </h3>

                <p className="mt-2 text-xs font-semibold text-green-600">
                  {item.growth}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Chart + Products */}
          <div className="mt-6 grid grid-cols-3 gap-5">
            {/* Fake Chart */}
            <div className="col-span-2 rounded-2xl border p-5">
              <div className="mb-5 flex justify-between">
                <h3 className="font-semibold">Sales Overview</h3>

                <span className="text-sm text-gray-400">
                  This Month
                </span>
              </div>

              <svg
                width="100%"
                height="180"
                viewBox="0 0 500 180"
              >
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="5"
                  points="
                  10,150
                  60,120
                  120,125
                  180,90
                  240,110
                  300,70
                  360,80
                  420,45
                  490,35"
                />
              </svg>
            </div>

            {/* Products */}
            <div className="rounded-2xl border p-5">
              <h3 className="mb-5 font-semibold">
                Top Products
              </h3>

              {products.map((item) => (
                <div
                  key={item}
                  className="mb-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-green-100"></div>

                    <span className="text-sm">
                      {item}
                    </span>
                  </div>

                  <span className="text-xs text-gray-400">
                    1,320
                  </span>
                </div>
              ))}

              <button className="mt-3 text-sm font-semibold text-green-600">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}