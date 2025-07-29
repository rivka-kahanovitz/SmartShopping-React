import React from "react";

export const Spinner = ({ size = 60 }: { size?: number }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "8px solid rgba(0,0,0,0.1)",
          borderLeftColor: "#09f",
          borderRadius: "50%",
          width: size,
          height: size,
          animation: "spin 1s linear infinite",
        }}
      ></div>

      {/* אנימציית CSS גלובלית */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
