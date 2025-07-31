import { useEffect, useRef } from "react";

type VendingMachine = {
  id: string;
  title: string;
  drinks: string[];
  price: number[];
  lat: number;
  lng: number;
  company: string; // ← 追加しました
};

type Props = {
  map: google.maps.Map;
  vendingMachine: VendingMachine;
  onClick: () => void;
  icon?: google.maps.Icon | string; // 追加：アイコンを受け取る
};

export default function MapMarker({
  map,
  vendingMachine,
  onClick,
  icon,
}: Props) {
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    const marker = new google.maps.Marker({
      position: { lat: vendingMachine.lat, lng: vendingMachine.lng },
      map,
      title: vendingMachine.title,
      icon: icon ?? {
        url: "/drink-icon.svg", // 自販機デフォルトアイコン
        scaledSize: new google.maps.Size(50, 50), // 50x50の正方形に修正（縦0はダメ）
        anchor: new google.maps.Point(25, 50), // アイコンの底辺中央にアンカーをセット
      },
    });

    marker.addListener("click", () => {
      onClick();
    });

    markerRef.current = marker;

    return () => {
      marker.setMap(null);
    };
  }, [map, vendingMachine, onClick, icon]);

  return null;
}
