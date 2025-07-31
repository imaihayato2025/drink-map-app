// src/data/vendingMachines.ts
export type VendingMachine = {
  id: string;
  title: string;
  drinks: string[];
  price: number[];
  lat: number;
  lng: number;
  company: string;
};

export const vendingMachinesData: VendingMachine[] = [
  {
    id: "0001",
    title: "五井駅前",
    drinks: ["マウンテンデュー", "お茶"],
    price: [150, 120],
    lat: 35.5221,
    lng: 140.0895,
    company: "サントリー",
  },
  {
    id: "0002",
    title: "五井南口",
    drinks: ["アルギニン", "コーラ"],
    price: [130, 140],
    lat: 35.5212,
    lng: 140.0882,
    company: "サントリー",
  },
  {
    id: "0003",
    title: "日本訪問医療株式会社横",
    drinks: ["マウンテンデュー"],
    price: [110],
    lat: 35.6168,
    lng: 140.1214,
    company: "サントリー",
  },
  {
    id: "0004",
    title: "千葉神社近く",
    drinks: ["マウンテンデュー"],
    price: [110],
    lat: 35.6132,
    lng: 140.1238,
    company: "サントリー",
  },
  {
    id: "0005",
    title: "ENEOS 357号浜野SS内",
    drinks: ["マウンテンデュー"],
    price: [100],
    lat: 35.5568,
    lng: 140.1255,
    company: "サントリー",
  },
  {
    id: "0006",
    title: "リサイクル愛品館前",
    drinks: ["マウンテンデュー"],
    price: [110],
    lat: 35.5327,
    lng: 140.1114,
    company: "サントリー",
  },
];
