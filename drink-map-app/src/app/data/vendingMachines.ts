// src/data/vendingMachines.ts
export type VendingMachine = {
  title: string;
  drinks: string[];
  price: number[];
  lat: number;
  lng: number;
};

export const vendingMachinesData: VendingMachine[] = [
  {
    lat: 35.5221,
    lng: 140.0895,
    title: "五井駅前自販機",
    drinks: ["マウンテンデュー", "お茶"],
    price: [150, 120],
  },
  {
    lat: 35.5212,
    lng: 140.0882,
    title: "五井南口自販機",
    drinks: ["アルギニン", "コーラ"],
    price: [130, 140],
  },
];