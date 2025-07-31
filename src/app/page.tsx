"use client";

import { useState, useEffect } from "react";
import SearchMenu from "./components/SearchMenu";
import MapContainer from "./components/MapContainer";
import MenuBtn from "./components/MenuBtn";
import Loading from "./components/Loading";

export default function Home() {
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

  const handleSearch = (input: string) => {
    // 入力をスペースで区切る
    const keywords = input.trim().split(/\s+/);

    // 会社名候補リスト
    const companies = ["サントリー", "アサヒ", "コカ・コーラ"];

    // 会社名を探す
    const company = keywords.find((kw) =>
      companies.some((c) => kw.includes(c))
    );

    // 会社名でないキーワードを飲み物名として取得
    const drink = keywords.find((kw) => !companies.some((c) => kw.includes(c)));

    setCompanyName(company || "");
    setDrinkName(drink || "");
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
