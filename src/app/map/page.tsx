// src/app/map/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import MapContainer from "../components/MapContainer";

export default function Page() {
  const searchParams = useSearchParams();
  const drinkName = searchParams.get("drink") ?? undefined;
  const companyName = searchParams.get("company") ?? undefined;

  return <MapContainer drinkName={drinkName} companyName={companyName} />;
}
