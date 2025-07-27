"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MenuBtn from "../components/MenuBtn";
import Header from "../components/Header";
import { Box, Typography, Button } from "@mui/material";

type VendingMachine = {
  title: string;
  drinks: string[];
  price: number[];
};

// vendingMachines はコンポーネント外で定義して再作成を防ぐ
const vendingMachines: VendingMachine[] = [
  {
    title: "五井駅前自販機",
    drinks: ["マウンテンデュー", "お茶"],
    price: [150, 120],
  },
  {
    title: "五井南口自販機",
    drinks: ["アルギニン", "コーラ"],
    price: [130, 140],
  },
];

export default function SavedPage() {
  const [likedVMs, setLikedVMs] = useState<VendingMachine[]>([]);

  useEffect(() => {
    const storedLikedTitles = localStorage.getItem("likedVMs");
    if (!storedLikedTitles) {
      setLikedVMs([]);
      return;
    }
    const likedTitles: string[] = JSON.parse(storedLikedTitles);
    const likedVendingMachines = vendingMachines.filter((vm) =>
      likedTitles.includes(vm.title)
    );
    setLikedVMs(likedVendingMachines);
  }, []);

  const handleGoToMap = (title: string) => {
    localStorage.setItem("selectedVMTitle", title);
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
            <Box key={vm.title} mb={4} borderBottom="1px solid #ddd" pb={2}>
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
                    onClick={() => handleGoToMap(vm.title)}
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
                  <Typography color="text.secondary">{vm.price[i]}円</Typography>
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