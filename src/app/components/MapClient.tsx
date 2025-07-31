"use client";

import { useSearchParams } from "next/navigation";
import MapContainer from "./MapContainer";

export default function MapClient() {
  const searchParams = useSearchParams();
  const drinkName = searchParams.get("drink") ?? undefined;
  const companyName = searchParams.get("company") ?? undefined;

  return <MapContainer drinkName={drinkName} companyName={companyName} />;
}
