import { motion } from "framer-motion";
import {
  ShoppingBag,
  Store,
  Users,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
    
  {
    icon: Store,
    title: "Multi Store",
    description: "Manage unlimited stores",
  },
  {
    icon: Users,
    title: "Staff Management",
    description: "Control employee access",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Real-time business reports",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Enterprise level security",
  },
];

export default function LoginLeft() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex w-full flex-col justify-center"
    >
      {/* Logo */}

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl lg:h-13 lg:w-13">

          <ShoppingBag
            className="text-white"
            size={20}
          />

        </div>

        <div>

          <h1 className="text-lg font-bold text-slate-900 lg:text-xl">
            NexoraPOS
          </h1>

          <p className="text-xs text-gray-500">
            Enterprise Retail Platform
          </p>

        </div>

      </div>

      {/* Heading */}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
        className="mt-5 text-2xl font-extrabold leading-tight text-slate-900 lg:text-3xl 2xl:text-4xl"
      >
        One Platform
        <br />

        <span className="text-green-600">
          Unlimited Possibilities..
        </span>

      </motion.h2>

      <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600">

        Manage multiple stores, track inventory, monitor sales, empower your team and make faster decisions with real-time business intelligence.

      </p>

      {/* Feature Cards */}

      <div className="mt-10 grid grid-cols-2 gap-6 max-w-xl">

        {features.map((item) => {

          const Icon = item.icon;

          return (

            <motion.div
  key={item.title}
  whileHover={{ y: -6, scale: 1.02 }}
  transition={{ duration: 0.3 }}
  className="rounded-2xl border border-green-100 bg-white p-6 min-h-[130px] shadow-lg transition-all duration-300"
>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100" style={{ margin: 15 }}>
  <Icon className="text-green-600" size={22} />
</div>

              <h4 className="mb-2 text-lg font-semibold text-slate-900" style={{ margin: 15 }}>
  {item.title}
</h4>

              <p className="text-sm leading-6 text-gray-500" style={{ margin: 15 }}>
  {item.description}
</p>

            </motion.div>

          );

        })}

      </div>

    </motion.div>
  );
}
