import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
} from "lucide-react";

const menu = [
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
];

const stats = [
  {
    title: "Revenue",
    value: "₹12.4M",
    growth: "+18%",
    color: "bg-green-100",
  },
  {
    title: "Orders",
    value: "3,428",
    growth: "+12%",
    color: "bg-blue-100",
  },
  {
    title: "Products",
    value: "1,258",
    growth: "+9%",
    color: "bg-orange-100",
  },
  {
    title: "Customers",
    value: "842",
    growth: "+15%",
    color: "bg-pink-100",
  },
];

export default function DashboardIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-10 w-full max-w-[650px] overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-2xl"
    >
      <div className="flex">
        {/* Sidebar */}

        <div className="flex w-20 flex-col items-center border-r bg-slate-50 py-6">

          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 shadow-lg">

            <LayoutDashboard className="text-white" size={22} />

          </div>

          {menu.map((Icon, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className={`mb-5 cursor-pointer rounded-xl p-3 transition ${
                index === 0
                  ? "bg-green-500 text-white"
                  : "text-gray-500 hover:bg-green-100"
              }`}
            >
              <Icon size={20} />
            </motion.div>
          ))}
        </div>

        {/* Right */}

        <div className="flex-1 p-6">

          {/* Header */}

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Dashboard
              </h2>

              <p className="text-sm text-gray-400">
                Welcome Back Admin
              </p>

            </div>

            <div className="flex items-center gap-4">

              <Search
                size={20}
                className="text-gray-500"
              />

              <Bell
                size={20}
                className="text-gray-500"
              />

              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="avatar"
                className="h-10 w-10 rounded-full"
              />

            </div>

          </div>

          {/* KPI Cards */}

          <div className="mt-6 grid grid-cols-2 gap-4">

            {stats.map((item) => (

              <motion.div
                key={item.title}
                whileHover={{
                  y: -4,
                }}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >

                <div
                  className={`mb-3 h-10 w-10 rounded-xl ${item.color}`}
                />

                <p className="text-xs text-gray-400">

                  {item.title}

                </p>

                <h3 className="mt-2 text-xl font-bold">

                  {item.value}

                </h3>

                <span className="text-xs font-semibold text-green-600">

                  {item.growth}

                </span>

              </motion.div>

            ))}

          </div>
                    {/* Bottom Section */}

          <div className="mt-6 grid grid-cols-3 gap-5">

            {/* Sales Chart */}

            <div className="col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <h3 className="font-semibold text-slate-700">
                  Sales Overview
                </h3>

                <span className="text-xs text-gray-400">
                  This Month
                </span>

              </div>

              <svg
                width="100%"
                height="170"
                viewBox="0 0 500 170"
              >

                <defs>

                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#22c55e"
                      stopOpacity="0.25"
                    />

                    <stop
                      offset="100%"
                      stopColor="#22c55e"
                      stopOpacity="0"
                    />

                  </linearGradient>

                </defs>

                <polygon
                  fill="url(#salesGradient)"
                  points="
                  0,150
                  60,130
                  120,120
                  180,95
                  240,110
                  300,70
                  360,85
                  430,45
                  500,30
                  500,170
                  0,170"
                />

                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="5"
                  points="
                  0,150
                  60,130
                  120,120
                  180,95
                  240,110
                  300,70
                  360,85
                  430,45
                  500,30"
                />

              </svg>

            </div>

            {/* Revenue Card */}

            <div className="rounded-2xl border border-gray-100 bg-green-50 p-5 shadow-sm">

              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                ₹12.4M
              </h2>

              <div className="mt-5 h-2 rounded-full bg-green-200">

                <div className="h-2 w-4/5 rounded-full bg-green-500" />

              </div>

              <p className="mt-3 text-xs text-green-700">
                82% Target Achieved
              </p>

            </div>

          </div>

          {/* Top Products */}

          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-semibold">
                Top Products
              </h3>

              <span className="text-xs text-green-600">
                View All
              </span>

            </div>

            {[
              "Wireless Headphones",
              "Gaming Mouse",
              "Mechanical Keyboard",
              "Smart Watch",
            ].map((item, index) => (

              <div
                key={index}
                className="mb-4 flex items-center justify-between last:mb-0"
              >

                <div className="flex items-center gap-3">

                  <div className="h-10 w-10 rounded-xl bg-green-100" />

                  <div>

                    <p className="text-sm font-medium">
                      {item}
                    </p>

                    <p className="text-xs text-gray-400">
                      In Stock
                    </p>

                  </div>

                </div>

                <span className="font-semibold text-green-600">
                  ₹2,499
                </span>

              </div>

            ))}

          </div>

          {/* Recent Orders */}

          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-semibold">
                Recent Orders
              </h3>

              <span className="text-xs text-green-600">
                View All
              </span>

            </div>

            {[
              "#10021",
              "#10022",
              "#10023",
              "#10024",
            ].map((order) => (

              <div
                key={order}
                className="mb-3 flex items-center justify-between last:mb-0"
              >

                <div className="flex items-center gap-2">

                  <div className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-sm">
                    {order}
                  </span>

                </div>

                <span className="text-sm text-gray-500">
                  ₹2,450
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </motion.div>
  );
}