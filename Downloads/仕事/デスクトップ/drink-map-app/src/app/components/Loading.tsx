"use client";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function Loading({ onFinish }: { onFinish?: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // 3秒後にアニメ終了
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (onFinish) onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const text = "俺の自販機MAP";

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        fontWeight="bold"
        sx={{
          fontSize: { xs: "8vw", sm: "12vw", md: "15vw" },
          userSelect: "none",
          display: "flex",
          gap: 1,
        }}
      >
        {[...text].map((char, i) => (
          <Box
            key={i}
            component="span"
            sx={{
              display: "inline-block",
              color: "#1976d2",
              animation: isAnimating
                ? `bounce 1.2s ease forwards`
                : "none",
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {char}
          </Box>
        ))}
      </Typography>

      <style>{`
      @keyframes bounce {
    0% { transform: translateY(0); }
    25% { transform: translateY(-40%); }
    50% { transform: translateY(0); }
    75% { transform: translateY(-20%); }
    100% { transform: translateY(0); }
  }
      `}</style>
    </Box>
  );
}