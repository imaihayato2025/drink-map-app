"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchMenu from "./components/SearchMenu";
import MenuBtn from "./components/MenuBtn";
import MapContainer from "./components/MapContainer";
import Loading from "./components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const drinkName = searchParams.get("drink") || "";

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setIsLoading(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <MapContainer drinkName={drinkName} />
      <SearchMenu />
      <MenuBtn />
    </>
  );
}