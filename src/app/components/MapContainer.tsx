"use client";

import { useEffect, useRef, useState } from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
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
  company: string; // 会社名追加
};

const vendingMachinesData: VendingMachine[] = [
  {
    id: "0001",
    title: "五井駅前",
    drinks: ["マウンテンデュー", "お茶"],
    price: [150, 120],
    lat: 35.5221,
    lng: 140.0895,
    company: "サントリー",
  },
  {
    id: "0002",
    title: "五井南口",
    drinks: ["アルギニン", "コーラ"],
    price: [130, 140],
    lat: 35.5212,
    lng: 140.0882,
    company: "サントリー",
  },
  {
    id: "0003",
    title: "日本訪問医療株式会社横",
    drinks: ["マウンテンデュー"],
    price: [110],
    lat: 35.6168,
    lng: 140.1214,
    company: "サントリー",
  },
  {
    id: "0004",
    title: "千葉神社近く",
    drinks: ["マウンテンデュー"],
    price: [110],
    lat: 35.6132,
    lng: 140.1238,
    company: "サントリー",
  },
  {
    id: "0005",
    title: "ENEOS 357号浜野SS内",
    drinks: ["マウンテンデュー"],
    price: [100],
    lat: 35.5568,
    lng: 140.1255,
    company: "サントリー",
  },
  {
    id: "0006",
    title: "リサイクル愛品館前",
    drinks: ["マウンテンデュー"],
    price: [110],
    lat: 35.5327,
    lng: 140.1114,
    company: "サントリー",
  },
];
// 他のデータも同様に company を追加

const calculateDistance = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) => (a.lat - b.lat) ** 2 + (a.lng - b.lng) ** 2;

type CurrentLocationIconButtonProps = {
  map: google.maps.Map | null;
};

function CurrentLocationIconButton({ map }: CurrentLocationIconButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const goToCurrentLocation = () => {
    if (!map) {
      setError("地図が読み込まれていません");
      setOpenSnackbar(true);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          map.setZoom(13);
          setError(null);
        },
        () => {
          setError("現在地の取得に失敗しました");
          setOpenSnackbar(true);
        }
      );
    } else {
      setError("このブラウザは現在地取得に対応していません");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={goToCurrentLocation}
        sx={{
          position: "fixed",
          bottom: 100,
          right: 20,
          width: 50,
          height: 50,
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transform: "rotate(-45deg)",
          "&:hover": { backgroundColor: "#e0e0e0" },
          zIndex: 1000,
          "@media (min-width: 768px)": { right: 60, left: "auto" },
        }}
        aria-label="現在地に移動"
      >
        <SendIcon />
      </IconButton>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function MapContainer({
  drinkName,
  companyName,
}: {
  drinkName?: string;
  companyName?: string;
}) {
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

  const toggleLike = (id: string) => {
    setLikedVMs((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id];
      localStorage.setItem("likedVMs", JSON.stringify(updated));
      return updated;
    });
  };

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
      styles: [
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "poi.business", stylers: [{ visibility: "off" }] },
      ],
    });

    setMap(mapObj);

    if (!navigator.geolocation) {
      mapObj.setCenter(fallbackCenter);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userPos = { lat: coords.latitude, lng: coords.longitude };
        setCurrentPosition(userPos);

        const icon: google.maps.Icon = {
          url: "/my-location-icon.svg",
          scaledSize: new window.google.maps.Size(30, 30),
          anchor: new window.google.maps.Point(15, 30),
        };
        setCurrentLocationIcon(icon);

        // 会社名とドリンク名で絞り込み
        const candidates = vendingMachinesData.filter((vm) => {
          const drinkMatch = drinkName ? vm.drinks.includes(drinkName) : true;
          const companyMatch = companyName ? vm.company === companyName : true;
          return drinkMatch && companyMatch;
        });

        if ((drinkName || companyName) && candidates.length === 0) {
          alert("該当する自販機が見つかりませんでした");
          mapObj.setCenter(userPos);
          return;
        }

        const target =
          candidates.length > 0
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
  };

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
  }, [drinkName, companyName]);

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh", borderRadius: 8 }}
      />

      {map && currentPosition && currentLocationIcon && (
        <MapMarker
          map={map}
          vendingMachine={{
            id: "current-location",
            title: "あなたの現在地",
            lat: currentPosition.lat,
            lng: currentPosition.lng,
            drinks: [],
            price: [],
            company: "",
          }}
          onClick={() => {}}
          icon={currentLocationIcon}
        />
      )}

      {map &&
        vendingMachinesData
          .filter((vm) => {
            const drinkMatch = drinkName ? vm.drinks.includes(drinkName) : true;
            const companyMatch = companyName
              ? vm.company === companyName
              : true;
            return drinkMatch && companyMatch;
          })
          .map((vm) => (
            <MapMarker
              key={vm.id}
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

      <CurrentLocationIconButton map={map} />
    </>
  );
}
