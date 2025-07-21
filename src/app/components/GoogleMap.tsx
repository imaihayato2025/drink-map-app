"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: typeof google;
    _googleMapsScriptLoading?: boolean;
  }
}

export default function GoogleMapWithSearch() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const vendingMachines = [
    {
      lat: 35.5795,
      lng: 140.093,
      title: "自販機①",
      icon: "/my-location-icon.svg",
      drinks: ["マウンテンデュー", "お茶"],
      price: [150, 120],
    },
    {
      lat: 35.5785,
      lng: 140.0955,
      title: "自販機②",
      icon: "/my-location-icon.svg",
      drinks: ["アルギニン", "コーラ"],
      price: [130, 140],
    },
  ];

  useEffect(() => {
    if (!mapRef.current) return;

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
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#1976d2",
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 1.5,
        anchor: new window.google.maps.Point(12, 24),
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
          },
          () => {}
        );
      }

      const newMarkers = vendingMachines.map((vm) => {
        const marker = new window.google.maps.Marker({
          position: { lat: vm.lat, lng: vm.lng },
          map: mapObj,
          title: vm.title,
          icon: {
            url: vm.icon,
            scaledSize: new window.google.maps.Size(50, 50),
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="
              font-family: Roboto, sans-serif;
              border-radius: 8px;
              padding: 12px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              background-color: white;
              max-width: 200px;
            ">
              <div style="font-weight: 600; font-size: 16px; margin-bottom: 8px; color: #1976d2;">
                ${vm.title}
              </div>
              <div style="font-size: 14px; color: #333;">
                <strong>販売ジュース:</strong><br>
                ${vm.drinks
                  .map((drink, i) => `<div>${drink} - <span style="color:#666;">${vm.price[i]}円</span></div>`)
                  .join("")}
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(mapObj, marker);
        });

        return marker;
      });

      setMarkers(newMarkers);
    };

    if (window.google?.maps) {
      // 既に読み込み済みならinitだけ呼ぶ
      initMap();
    } else if (!window._googleMapsScriptLoading) {
      // まだ読み込んでいなければスクリプト追加
      window._googleMapsScriptLoading = true;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ja`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    }
    // 2回目以降のロードはスクリプト追加しないのでinitMapは呼ばれないが、
    // window.google?.mapsチェックで初期化は保証される
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", borderRadius: "8px" }}
    />
  );
}