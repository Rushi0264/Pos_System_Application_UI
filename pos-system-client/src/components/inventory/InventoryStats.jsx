import { motion } from "framer-motion";
import {
  Package,
  Boxes,
  AlertTriangle,
  XCircle,
} from "lucide-react";


export default function InventoryStats({ inventory = [] }) {


  const totalProducts =
    inventory.length;


  const availableStock =
    inventory.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  const lowStock =
    inventory.filter(
      item => item.quantity > 0 && item.quantity <= 5
    ).length;


  const outStock =
    inventory.filter(
      item => item.quantity === 0
    ).length;



  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "#2563eb",
    },
    {
      title: "Available Stock",
      value: availableStock,
      icon: Boxes,
      color: "#10b981",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "#f59e0b",
    },
    {
      title: "Out Of Stock",
      value: outStock,
      icon: XCircle,
      color: "#ef4444",
    },
  ];



  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 p-3" style={{padding:10}} >

      {stats.map((item, index) => {

        const Icon = item.icon;


        return (
          <motion.div

            key={item.title}

            initial={{
              opacity:0,
              y:30
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:index * 0.1
            }}

            whileHover={{
              y:-6,
              scale:1.02
            }}

            style={{
              borderRadius: 20,
              background: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              padding: 24,
              position: "relative",
              overflow: "hidden",
              cursor: "default",
            }}

          >

            {/* subtle background accent */}
            <div
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${item.color}22, transparent)`,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >

              <div>

                <p style={{ margin: 0, color: "#6b7280", fontSize: 15, fontWeight: 500 }}>
                  {item.title}
                </p>

                <h2 style={{ margin: "12px 0 6px", fontSize: 30, fontWeight: 700, color: "#111827" }}>
                  {item.value}
                </h2>

              </div>

              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 18,
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 10px 20px ${item.color}55`,
                  flexShrink: 0,
                }}
              >

                <Icon size={28} color="#fff" />

              </div>

            </div>


          </motion.div>
        );

      })}


    </div>
  );
}