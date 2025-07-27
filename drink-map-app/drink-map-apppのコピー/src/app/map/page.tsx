"use client";  // ← ここを必ず入れてください

import { useSearchParams } from "next/navigation";
import MapContainer from "../components/MapContainer";

export default function GoogleMapPage() {
  const searchParams = useSearchParams();
  const drinkName = searchParams.get("drink") || "";

  return <MapContainer drinkName={drinkName} />;
}