const GlobalBackground = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg,#f8fffb 0%,#eefdf5 45%,#e2fff2 100%)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(16,185,129,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "#22c55e",
          opacity: 0.08,
          borderRadius: "50%",
          filter: "blur(90px)",
          top: -150,
          right: -100,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          background: "#10b981",
          opacity: 0.08,
          borderRadius: "50%",
          filter: "blur(80px)",
          bottom: -100,
          left: -100,
        }}
      />

      {/* Floating Dots */}
      {Array.from({ length: 25 }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#34d399",
            opacity: 0.4,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          padding: 24,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GlobalBackground;