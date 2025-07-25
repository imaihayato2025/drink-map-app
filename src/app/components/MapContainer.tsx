"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import VendingMachineDrawer from "../components/VendingMachineDrawer";
import MapMarker from "../components/MapMarker";

declare global {
  interface Window {
    google: typeof google;
    _googleMapsScriptLoading?: boolean;
  }
}

export type VendingMachine = {
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
    title: "五井駅前自販機",
    drinks: ["マウンテンデュー", "お茶"],
    price: [150, 120],
  },
  {
    lat: 35.5212,
    lng: 140.0882,
    title: "五井南口自販機",
    drinks: ["アルギニン", "コーラ"],
    price: [130, 140],
  },
  // 追加したい自販機データをここに足してください
];

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedVM, setSelectedVM] = useState<VendingMachine | null>(null);
  const [likedVMs, setLikedVMs] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const targetDrink = searchParams.get("drink");

  // いいね情報のロード（初回のみ）
  useEffect(() => {
    const storedLikes = localStorage.getItem("likedVMs");
    if (storedLikes) {
      try {
        setLikedVMs(JSON.parse(storedLikes));
      } catch {
        setLikedVMs([]);
      }
    }
  }, []);

  // いいねトグル処理
  const toggleLike = (title: string) => {
    setLikedVMs(prev => {
      const updatedLikes = prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title];
      localStorage.setItem("likedVMs", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  // Google Maps 初期化・現在地取得
  useEffect(() => {
    if (!mapRef.current) return;

    function distance(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
      return (a.lat - b.lat) ** 2 + (a.lng - b.lng) ** 2;
    }

    const initMap = () => {
      const fallbackCenter = { lat: 35.5791, lng: 140.0943 };
      const mapObj = new window.google.maps.Map(mapRef.current!, {
        zoom: 15,
        center: fallbackCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        keyboardShortcuts: false,
      });

      setMap(mapObj);

      const currentLocationIcon = {
        url: "/my-location-icon.svg",
        scaledSize: new window.google.maps.Size(30, 30),
        anchor: new window.google.maps.Point(15, 30),
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const pos = { lat: coords.latitude, lng: coords.longitude };

            mapObj.setCenter(pos);
            new window.google.maps.Marker({
              position: pos,
              map: mapObj,
              title: "あなたの現在地",
              icon: currentLocationIcon,
            });

            if (targetDrink) {
              const candidates = vendingMachinesData.filter(vm => vm.drinks.includes(targetDrink));

              if (candidates.length === 0) {
                alert("該当する自販機が見つかりませんでした");
                return;
              }

              const nearest = candidates.reduce((prev, curr) => {
                return distance(pos, { lat: curr.lat, lng: curr.lng }) < distance(pos, { lat: prev.lat, lng: prev.lng }) ? curr : prev;
              });

              mapObj.setCenter({ lat: nearest.lat, lng: nearest.lng });
              mapObj.setZoom(18);
              setSelectedVM(nearest);
            }
          },
          () => {
            alert("現在地の取得に失敗しました");
          }
        );
      } else {
        // Geolocation未対応時はフォールバックでマップ表示のみ
        setSelectedVM(null);
      }
    };

    if (window.google?.maps) {
      initMap();
    } else if (!window._googleMapsScriptLoading) {
      window._googleMapsScriptLoading = true;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ja`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    }
  }, [targetDrink]);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100vh", borderRadius: 8 }} />

      {map &&
        vendingMachinesData.map(vm => (
          <MapMarker
            key={vm.title}
            map={map}
            vendingMachine={vm}
            onClick={() => setSelectedVM(vm)}
          />
        ))}

      <VendingMachineDrawer
        selectedVM={selectedVM}
        onClose={() => setSelectedVM(null)}
        likedVMs={likedVMs}
        toggleLike={toggleLike}
      />
    </>
  );
}