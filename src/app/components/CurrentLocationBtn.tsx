"use client";

import { useState } from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  map: google.maps.Map | null;
};

export default function CurrentLocationIconButton({ map }: Props) {
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
          map.setZoom(10);
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
