import { motion } from "framer-motion";

const circles = [
  {
    size: "w-96 h-96",
    color: "bg-green-300/20",
    position: "-top-32 -left-24",
    duration: 18,
  },
  {
    size: "w-[420px] h-[420px]",
    color: "bg-emerald-300/20",
    position: "top-0 right-0",
    duration: 22,
  },
  {
    size: "w-80 h-80",
    color: "bg-cyan-300/20",
    position: "bottom-0 left-1/3",
    duration: 20,
  },
  {
    size: "w-56 h-56",
    color: "bg-green-400/20",
    position: "top-1/2 right-1/4",
    duration: 14,
  },
];

export default function FloatingBackground() {
  return (
    <>
      {/* Animated Blur Circles */}

      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute ${circle.position} ${circle.size} ${circle.color} rounded-full blur-3xl`}
          animate={{
            y: [0, -35, 0],
            x: [0, 30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid Pattern */}

      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right,#16a34a 1px,transparent 1px),
              linear-gradient(to bottom,#16a34a 1px,transparent 1px)
            `,
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* Floating Small Dots */}

      {Array.from({ length: 25 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute h-2 w-2 rounded-full bg-green-400/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Bottom Glow */}

      <div className="absolute bottom-0 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-green-300/20 blur-[120px]" />

      {/* Top Right Glow */}

      <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-emerald-300/20 blur-[120px]" />
    </>
  );
}