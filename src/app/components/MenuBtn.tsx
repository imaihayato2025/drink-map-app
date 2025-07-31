"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

const routes = ["/", "/genre", "/saved", "/settings"];

export default function MenuBtn({ onMapClick }: { onMapClick?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState(() => {
    const index = routes.indexOf(pathname);
    return index === -1 ? 0 : index;
  });

  // ★ 各ページを事前にプリフェッチ
  useEffect(() => {
    routes.forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);

  useEffect(() => {
    const index = routes.indexOf(pathname);
    if (index !== -1 && index !== value) {
      setValue(index);
    }
  }, [pathname, value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const newRoute = routes[newValue];

    // 探すタブが押されたとき、現在のパスが '/' なら router.push を省略
    if (newValue === 0) {
      if (onMapClick) onMapClick();
      if (pathname === "/") return;
    }

    setValue(newValue);
    router.push(newRoute);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",

        zIndex: 1300,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          height: 70,
          borderRadius: "16px",
          backgroundColor: "white",
          "& .Mui-selected": {
            color: "#1976d2",
          },
          transition: "all 0.3s ease",
        }}
      >
        <BottomNavigationAction
          label="探す"
          icon={<MapIcon sx={{ fontSize: 28, mb: 0.5 }} />}
        />
        <BottomNavigationAction
          label="ジャンル"
          icon={<LocalDrinkIcon sx={{ fontSize: 28, mb: 0.5 }} />}
        />
        <BottomNavigationAction
          label="保存済み"
          icon={<BookmarkIcon sx={{ fontSize: 28, mb: 0.5 }} />}
        />
        <BottomNavigationAction
          label="設定"
          icon={<SettingsIcon sx={{ fontSize: 28, mb: 0.5 }} />}
        />
      </BottomNavigation>
    </Paper>
  );
}
