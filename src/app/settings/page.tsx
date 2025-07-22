"use client";
import MenuBtn from "../components/MenuBtn";
import Header from "../components/Header";

export default function SettingsPage() {
  return (
    <div>
             {/* ✅ ヘッダー */}
                <Header title="設定" />
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