import { useEffect, useRef } from "react";
import type { VendingMachine } from "./MapContainer";

type Props = {
  map: google.maps.Map;
  vendingMachine: VendingMachine;
  onClick: () => void;
};

export default function MapMarker({ map, vendingMachine, onClick }: Props) {
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    const marker = new google.maps.Marker({
      position: { lat: vendingMachine.lat, lng: vendingMachine.lng },
      map,
      title: vendingMachine.title,
      icon: {
        url: "/my-location-icon.svg",
        scaledSize: new google.maps.Size(30, 30),
        anchor: new google.maps.Point(15, 30),
      },
    });

    marker.addListener("click", () => {
      onClick();
    });

    markerRef.current = marker;

    // クリーンアップ
    return () => {
      marker.setMap(null);
    };
  }, [map, vendingMachine, onClick]);

  return null;
}