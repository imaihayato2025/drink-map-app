"use client";

import {
  SwipeableDrawer,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { VendingMachine } from "./MapContainer";

type Props = {
  selectedVM: VendingMachine | null;
  onClose: () => void;
  likedVMs: string[];
  toggleLike: (id: string) => void;
};

export default function VendingMachineDrawer({
  selectedVM,
  onClose,
  likedVMs,
  toggleLike,
}: Props) {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={!!selectedVM}
      onClose={onClose}
      onOpen={() => {}}
      disableSwipeToOpen={true}
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
                onClick={() => toggleLike(selectedVM.id)}
                aria-label={
                  likedVMs.includes(selectedVM.id)
                    ? "いいねを取り消す"
                    : "いいねする"
                }
              >
                <FavoriteIcon
                  color={
                    likedVMs.includes(selectedVM.id) ? "error" : "disabled"
                  }
                />
              </IconButton>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* 会社名（自販機の種類）をここに追加 */}
          <Typography variant="subtitle1" color="text.secondary" mb={1}>
            {selectedVM.company}
          </Typography>

          <Divider sx={{ my: 1 }} />

          {selectedVM.drinks.map((drink, i) => (
            <Box key={i} display="flex" justifyContent="space-between" py={0.5}>
              <Typography>{drink}</Typography>
              <Typography color="text.secondary">
                {selectedVM.price[i]}円
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </SwipeableDrawer>
  );
}
