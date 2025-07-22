"use client";

import { useEffect, useRef, useState } from "react";
import {
  SwipeableDrawer,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";

declare global {
  interface Window {
    google: typeof google;
    _googleMapsScriptLoading?: boolean;
  }
}

export default function GoogleMapWithSearch() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedVM, setSelectedVM] = useState<{
    title: string;
    drinks: string[];
    price: number[];
    lat?: number;
    lng?: number;
  } | null>(null);
  const [likedVMs, setLikedVMs] = useState<string[]>([]);

  // ページ読み込み時にいいね情報を取得
  useEffect(() => {
    const storedLikes = localStorage.getItem("likedVMs");
    if (storedLikes) setLikedVMs(JSON.parse(storedLikes));
  }, []);

  // いいねトグル
  const toggleLike = (title: string) => {
    let updatedLikes: string[];
    if (likedVMs.includes(title)) {
      updatedLikes = likedVMs.filter((t) => t !== title);
    } else {
      updatedLikes = [...likedVMs, title];
    }
    setLikedVMs(updatedLikes);
    localStorage.setItem("likedVMs", JSON.stringify(updatedLikes));
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const vendingMachines = [
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
    ];

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

      const currentLocationIcon = {
        url: "/my-location-icon.svg",
        scaledSize: new window.google.maps.Size(30, 30),
        anchor: new window.google.maps.Point(15, 30),
      };
      const vendingIcon = {
        url: "/my-location-icon.svg",
        scaledSize: new window.google.maps.Size(30, 30),
        anchor: new window.google.maps.Point(15, 30),
      };

      // 現在地マーカー
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

      // 自販機マーカー
      vendingMachines.forEach((vm) => {
        const marker = new window.google.maps.Marker({
          position: { lat: vm.lat, lng: vm.lng },
          map: mapObj,
          title: vm.title,
          icon: vendingIcon,
        });

        marker.addListener("click", () => {
          setSelectedVM(vm);
        });
      });

      // localStorageのselectedVMTitleがあれば該当自販機にズーム＆詳細表示
      const selectedTitle = localStorage.getItem("selectedVMTitle");
      if (selectedTitle) {
        const targetVM = vendingMachines.find((vm) => vm.title === selectedTitle);
        if (targetVM) {
          const position = { lat: targetVM.lat, lng: targetVM.lng };
          mapObj.setCenter(position);
          mapObj.setZoom(18);
          setSelectedVM(targetVM);
        }
        localStorage.removeItem("selectedVMTitle");
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
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh", borderRadius: 8 }}
      />

      <SwipeableDrawer
        anchor="bottom"
        open={!!selectedVM}
        onClose={() => setSelectedVM(null)}
        onOpen={() => {}}
        disableSwipeToOpen={true} // ← ここ重要！スワイプ開閉を無効化して不具合防止
        PaperProps={{
          style: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: "60vh",
            overflow: "auto",
          },
        }}
      >
        {selectedVM && (
          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" color="primary">
                {selectedVM.title}
              </Typography>
              <Box>
                <IconButton
                  onClick={() => toggleLike(selectedVM.title)}
                  aria-label={
                    likedVMs.includes(selectedVM.title)
                      ? "いいねを取り消す"
                      : "いいねする"
                  }
                >
                  <FavoriteIcon
                    color={
                      likedVMs.includes(selectedVM.title) ? "error" : "disabled"
                    }
                  />
                </IconButton>
                <IconButton onClick={() => setSelectedVM(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {selectedVM.drinks.map((drink, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                py={0.5}
              >
                <Typography>{drink}</Typography>
                <Typography color="text.secondary">
                  {selectedVM.price[i]}円
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </SwipeableDrawer>
    </>
  );
}