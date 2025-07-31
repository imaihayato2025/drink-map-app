"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchMenu from "./components/SearchMenu";
import MapContainer from "./components/MapContainer";
import MenuBtn from "./components/MenuBtn";
import Loading from "./components/Loading";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [drinkName, setDrinkName] = useState("");
  const [companyName, setCompanyName] = useState("");

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

  // URLのクエリを監視して状態に反映
  useEffect(() => {
    const drink = searchParams.get("drink") ?? "";
    const company = searchParams.get("company") ?? "";
    setDrinkName(drink);
    setCompanyName(company);
  }, [searchParams]);

  const handleSearch = (input: string) => {
    const keywords = input.trim().split(/\s+/);
    const companies = ["サントリー", "アサヒ", "コカ・コーラ"];

    const company = keywords.find((kw) =>
      companies.some((c) => kw.includes(c))
    );

    const drink = keywords.find((kw) => !companies.some((c) => kw.includes(c)));

    setCompanyName(company || "");
    setDrinkName(drink || "");

    // URLを更新して状態と同期
    router.push(
      `/?drink=${encodeURIComponent(drink || "")}&company=${encodeURIComponent(
        company || ""
      )}`
    );
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <SearchMenu onSearch={handleSearch} />
      <MapContainer drinkName={drinkName} companyName={companyName} />
      <MenuBtn />
    </>
  );
}
