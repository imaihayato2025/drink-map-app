"use client";
import MenuBtn from "../components/MenuBtn";
import Header from "../components/Header";

export default function SavedPage() {
  return (
    <div>
           {/* ✅ ヘッダー */}
          <Header title="お気に入り" />
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#999",
      }}
    >
      Coming Soon...
    </div>
       <MenuBtn />
       </div>
  );
}