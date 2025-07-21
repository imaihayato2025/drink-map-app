"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: typeof google;
  }
}

function SearchMenu({ onSearch }: { onSearch: (keyword: string) => void }) {
  return (
    <div>
      <div className="fixed top-[50px] left-1/2 transform -translate-x-1/2 w-[90%] z-10">
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="relative">
            <img
              src="/search.svg"
              alt="検索"
              className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 bg-white"
            />
            <input
              type="text"
              placeholder="ここで検索"
              className="bg-white pl-10 pr-6 py-3 border border-blue-500 w-full rounded-full drop-shadow-sm"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GoogleMapWithSearch() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const vendingMachines = [
    {
      lat: 35.5795,
      lng: 140.0930,
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

    const loadMapScript = () => {
      if (window.google?.maps) {
        initMap();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ja`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    };

    const initMap = () => {
      const fallbackCenter = { lat: 35.5791, lng: 140.0943 };
      const mapObj = new window.google.maps.Map(mapRef.current!, {
        zoom: 15,
        center: fallbackCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
      });
      setMap(mapObj);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const pos = { lat: coords.latitude, lng: coords.longitude };
            mapObj.setCenter(pos);
            new window.google.maps.Marker({
              position: pos,
              map: mapObj,
              title: "あなたの現在地",
              icon: {
                url: "/my-location-icon.svg",
                scaledSize: new window.google.maps.Size(30, 30),
              },
            });
          },
          () => {}
        );
      }
    };

    loadMapScript();
  }, []);

  useEffect(() => {
    if (!map) return;

    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const filtered = vendingMachines.filter((vm) =>
      vm.drinks.some((drink) => drink.includes(searchKeyword))
    );

    const newMarkers = filtered.map((vm) => {
      const marker = new window.google.maps.Marker({
        position: { lat: vm.lat, lng: vm.lng },
        map,
        title: vm.title,
        icon: {
          url: vm.icon,
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div>
          <strong>${vm.title}</strong><br>
          販売ジュース:<br>
          ${vm.drinks
            .map((drink, i) => `${drink} - ${vm.price[i]}円`)
            .join("<br>")}
        </div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [searchKeyword, map]);

  return (
    <>
      <SearchMenu onSearch={setSearchKeyword} />
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh", borderRadius: "8px" }}
      />
    </>
  );
}