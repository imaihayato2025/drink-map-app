"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MenuBtn from "../components/MenuBtn";
import Header from "../components/Header";
import { Box, Typography, Button } from "@mui/material";

type VendingMachine = {
  id: string;
  title: string;
  drinks: string[];
  price: number[];
};

// vendingMachines はコンポーネント外で定義して再作成を防ぐ
const vendingMachines: VendingMachine[] = [
  {
    id: "01",
    title: "五井駅前自販機",
    drinks: ["マウンテンデュー", "お茶"],
    price: [150, 120],
  },
  {
    id: "02",
    title: "五井南口自販機",
    drinks: ["アルギニン", "コーラ"],
    price: [130, 140],
  },
  {
    id: "03",
    title: "日本訪問医療株式会社横",
    drinks: ["アルギニン"],
    price: [110],
  },
  {
    id: "04",
    title: "千葉神社近く",
    drinks: ["マウンテンデュー"],
    price: [110],
  },
  {
    id: "05",
    title: "ENEOS 357号浜野SS内自販機",
    drinks: ["マウンテンデュー"],
    price: [100],
  },
];

export default function SavedPage() {
  const [likedVMs, setLikedVMs] = useState<VendingMachine[]>([]);

  useEffect(() => {
    const storedLikedIds = localStorage.getItem("likedVMs");
    if (!storedLikedIds) {
      setLikedVMs([]);
      return;
    }
    const likedIds: string[] = JSON.parse(storedLikedIds);
    // idでフィルター
    const likedVendingMachines = vendingMachines.filter((vm) =>
      likedIds.includes(vm.id)
    );
    setLikedVMs(likedVendingMachines);
  }, []);

  const handleGoToMap = (id: string) => {
    // idを保存して地図ページに渡す
    localStorage.setItem("selectedVMId", id);
  };

  return (
    <div>
      <Header title="お気に入り" />

      <Box p={2}>
        {likedVMs.length === 0 ? (
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            mt={10}
          >
            お気に入りはまだありません。
          </Typography>
        ) : (
          likedVMs.map((vm) => (
            <Box key={vm.id} mb={4} borderBottom="1px solid #ddd" pb={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" color="primary" mb={1}>
                  {vm.title}
                </Typography>

                <Link href="/">
                  <Button
                    variant="text"
                    onClick={() => handleGoToMap(vm.id)}
                    sx={{
                      fontSize: 14,
                      color: "#1976d2",
                      textDecoration: "underline",
                      padding: 0,
                      minWidth: "auto",
                    }}
                  >
                    地図で見る
                  </Button>
                </Link>
              </Box>

              {vm.drinks.map((drink, i) => (
                <Box
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  py={0.5}
                >
                  <Typography>{drink}</Typography>
                  <Typography color="text.secondary">
                    {vm.price[i]}円
                  </Typography>
                </Box>
              ))}
            </Box>
          ))
        )}
      </Box>

      <MenuBtn />
    </div>
  );
}
