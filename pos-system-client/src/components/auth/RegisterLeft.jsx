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
    title: "Smart Stores",
    description: "Manage multiple branches easily",
  },
  {
    icon: Users,
    title: "Team Control",
    description: "Assign roles & permissions",
  },
  {
    icon: BarChart3,
    title: "Business Insights",
    description: "Track sales performance",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description: "Enterprise security system",
  },
];

export default function RegisterLeft() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex w-full flex-col justify-center"
    >

      {/* Logo */}
      <div className="flex items-center gap-3">

        <div className="flex h-12 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl">

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
      <p className="mt-6 text-sm font-medium text-green-600">
   Your journey to smarter retail starts here
</p>


      {/* Heading */}

      <motion.h2
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: .3 }}
  className="mt-5 text-2xl font-extrabold leading-tight text-slate-900 lg:text-3xl 2xl:text-4xl"
>
  Build Your
  <br />

  <span className="text-green-600">
    Retail Empire
  </span>

</motion.h2>


      <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600">

  Start with a powerful POS ecosystem designed for modern businesses.
  Manage stores, inventory, employees and sales with complete control
  from a single dashboard.

</p>


      {/* Features */}

      <div className="mt-10 grid grid-cols-2 gap-6 max-w-xl">

        {features.map((item)=>{

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              whileHover={{
                y:-6,
                scale:1.02
              }}
              transition={{
                duration:0.3
              }}
              className="rounded-2xl border border-green-100 bg-white p-6 min-h-[130px] shadow-lg"
            >

              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100"
                style={{margin:15}}
              >

                <Icon
                  className="text-green-600"
                  size={22}
                />

              </div>


              <h4
                className="mb-2 text-lg font-semibold text-slate-900"
                style={{margin:15}}
              >

                {item.title}

              </h4>


              <p
                className="text-sm leading-6 text-gray-500"
                style={{margin:15}}
              >

                {item.description}

              </p>


            </motion.div>

          );

        })}

      </div>


    </motion.div>
  );
}