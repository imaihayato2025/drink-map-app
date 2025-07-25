// src/app/map/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import MapContainer from "../components/MapContainer"; // ここ注意！

export default function MapPage() {
  const searchParams = useSearchParams();
  const drink = searchParams.get("drink") || "";

  return <MapContainer drinkName={drink} />;
}