"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";

const routes = ["/", "/saved", "/settings"];

export default function MenuBtn() {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(() => {
    // 現在のパスに対応するインデックスを初期値に
    const index = routes.indexOf(pathname);
    return index === -1 ? 0 : index;
  });

  useEffect(() => {
    // pathnameが変わったらvalueも更新（ブラウザの戻るボタンなど対応）
    const index = routes.indexOf(pathname);
    if (index !== -1 && index !== value) {
      setValue(index);
    }
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(routes[newValue]);
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
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          height: "70px",
          borderRadius: "16px",
          backgroundColor: "white",
          "& .Mui-selected": {
            color: "#1976d2", // MUIのprimaryカラー
          },
          transition: "all 0.3s ease",
        }}
      >
        <BottomNavigationAction
          label="探す"
          icon={<MapIcon sx={{ fontSize: 28, mb: 0.5 }} />}
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