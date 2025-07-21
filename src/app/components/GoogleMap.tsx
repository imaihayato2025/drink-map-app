"use client";

import { useEffect, useRef } from "react";

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if ((window as any).google && (window as any).google.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ja`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);

    function initMap() {
      const mapOptions = {
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            new (window as any).google.maps.Map(mapRef.current, {
              ...mapOptions,
              center: { lat: latitude, lng: longitude },
              zoom: 15,
            });
          },
          () => {
            new (window as any).google.maps.Map(mapRef.current, {
              ...mapOptions,
              center: { lat: 35.681236, lng: 139.767125 },
            });
          }
        );
      } else {
        new (window as any).google.maps.Map(mapRef.current, {
          ...mapOptions,
          center: { lat: 35.681236, lng: 139.767125 },
        });
      }
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", borderRadius: "8px" }}
    />
  );
}