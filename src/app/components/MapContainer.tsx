"use client";

import { useEffect, useRef, useState } from "react";
import VendingMachineDrawer from "./VendingMachineDrawer";
import MapMarker from "./MapMarker";

declare global {
  interface Window {
    google: typeof google;
    _googleMapsScriptLoading?: boolean;
    _googleMapsScriptLoaded?: boolean;
  }
}

export type VendingMachine = {
  id: string;
  title: string;
  drinks: string[];
  price: number[];
  lat: number;
  lng: number;
};

const vendingMachinesData: VendingMachine[] = [
  {
    lat: 35.5221,
    lng: 140.0895,
    id: "01",
    title: "五井駅前自販機",
    drinks: ["マウンテンデュー", "お茶"],
    price: [150, 120],
  },
  {
    lat: 35.5212,
    lng: 140.0882,
    id: "02",
    title: "五井南口自販機",
    drinks: ["アルギニン", "コーラ"],
    price: [130, 140],
  },
  {
    lat: 35.6168,
    lng: 140.1214,
    id: "03",
    title: "日本訪問医療株式会社横",
    drinks: ["アルギニン"],
    price: [110],
  },
  {
    lat: 35.6132,
    lng: 140.1238,
    id: "04",
    title: "千葉神社近く",
    drinks: ["マウンテンデュー"],
    price: [110],
  },
  {
    lat: 35.5568,
    lng: 140.1255,
    id: "05",
    title: "ENEOS 357号浜野SS内自販機",
    drinks: ["マウンテンデュー"],
    price: [100],
  },
];

type MapContainerProps = {
  drinkName: string;
};

const calculateDistance = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) => (a.lat - b.lat) ** 2 + (a.lng - b.lng) ** 2;

export default function MapContainer({ drinkName }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedVM, setSelectedVM] = useState<VendingMachine | null>(null);
  const [likedVMs, setLikedVMs] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [currentLocationIcon, setCurrentLocationIcon] =
    useState<google.maps.Icon | null>(null);

  // ローカルストレージからお気に入り読み込み
  useEffect(() => {
    const stored = localStorage.getItem("likedVMs");
    if (stored) {
      try {
        setLikedVMs(JSON.parse(stored));
      } catch {
        setLikedVMs([]);
      }
    }
  }, []);

  // お気に入り切替
  const toggleLike = (id: string) => {
    setLikedVMs((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id];
      localStorage.setItem("likedVMs", JSON.stringify(updated));
      return updated;
    });
  };

  // Google Maps 初期化処理（POI非表示のスタイル追加）
  const initMap = () => {
    if (!mapRef.current || !window.google?.maps) return;

    const fallbackCenter = { lat: 35.5791, lng: 140.0943 };

    const mapObj = new window.google.maps.Map(mapRef.current, {
      zoom: 15,
      center: fallbackCenter,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      keyboardShortcuts: false,

      // ★ Google提供の飲食店や駅などのPOIを非表示にするスタイル
      styles: [
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "poi.business", stylers: [{ visibility: "off" }] },
      ],
    });

    setMap(mapObj);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const userPos = { lat: coords.latitude, lng: coords.longitude };
          setCurrentPosition(userPos);

          // 現在地アイコン設定
          const icon: google.maps.Icon = {
            url: "/my-location-icon.svg",
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15, 30),
          };
          setCurrentLocationIcon(icon);

          const candidates = drinkName
            ? vendingMachinesData.filter((vm) => vm.drinks.includes(drinkName))
            : vendingMachinesData;

          if (drinkName && candidates.length === 0) {
            alert("該当する自販機が見つかりませんでした");
            mapObj.setCenter(userPos);
            return;
          }

          const target = drinkName
            ? candidates.reduce((prev, curr) =>
                calculateDistance(userPos, curr) <
                calculateDistance(userPos, prev)
                  ? curr
                  : prev
              )
            : null;

          if (target) {
            mapObj.setCenter({ lat: target.lat, lng: target.lng });
            mapObj.setZoom(18);
            setSelectedVM(target);
          } else {
            mapObj.setCenter(userPos);
          }
        },
        () => {
          alert("現在地の取得に失敗しました");
          mapObj.setCenter(fallbackCenter);
        }
      );
    } else {
      mapObj.setCenter(fallbackCenter);
    }
  };

  // Google Maps API 読み込みと初期化
  useEffect(() => {
    if (window.google?.maps) {
      if (!map) initMap();
    } else if (!window._googleMapsScriptLoading) {
      window._googleMapsScriptLoading = true;

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.warn("Google Maps API Key is not defined.");
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=ja`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window._googleMapsScriptLoaded = true;
        initMap();
      };
      document.head.appendChild(script);
    }
  }, [drinkName]);

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh", borderRadius: 8 }}
      />

      {/* 現在地マーカー */}
      {map && currentPosition && currentLocationIcon && (
        <MapMarker
          map={map}
          vendingMachine={{
            title: "あなたの現在地",
            lat: currentPosition.lat,
            lng: currentPosition.lng,
          }}
          onClick={() => {}}
          icon={currentLocationIcon}
        />
      )}

      {/* 自販機マーカー */}
      {map &&
        vendingMachinesData
          .filter((vm) => (drinkName ? vm.drinks.includes(drinkName) : true))
          .map((vm) => (
            <MapMarker
              key={vm.id}
              map={map}
              vendingMachine={vm}
              onClick={() => setSelectedVM(vm)}
            />
          ))}

      {/* 詳細ドロワー */}
      <VendingMachineDrawer
        selectedVM={selectedVM}
        onClose={() => setSelectedVM(null)}
        likedVMs={likedVMs}
        toggleLike={toggleLike}
      />
    </>
  );
}
