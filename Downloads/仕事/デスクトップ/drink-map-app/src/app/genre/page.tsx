"use client";

import {
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";

import MenuBtn from "../components/MenuBtn";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

const options = [
  { label: "自販機の種類で探す", icon: <LocalDrinkIcon fontSize="inherit" />, path: "/genre/jihan" },
  { label: "炭酸の種類で探す", icon: <BubbleChartIcon fontSize="inherit" />, path: "/genre/soda" },
  { label: "近くから探す", icon: <PlaceIcon fontSize="inherit" />, path: "/genre/nearby" },
  { label: "値段で探す", icon: <AttachMoneyIcon fontSize="inherit" />, path: "/genre/price" },
  { label: "その他から探す", icon: <CategoryIcon fontSize="inherit" />, path: "/genre/other" },
];

export default function GenrePage() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleClick = (
    path: string,
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    router.push(path);
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.blur();
    }
  };

  return (
    <>
      <Header title="ジャンルで探す" />

      <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 0",
            justifyContent: "space-between",
          }}
        >
          {options.map(({ label, icon, path }) => (
            <Box
              key={label}
              onClick={(e: React.MouseEvent) => handleClick(path, e)}
              sx={{
                flexBasis: "47.5%",
                cursor: "pointer",
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(path, e);
                }
              }}
            >
              <CategoryCard label={label} icon={icon} isSmall={isSmall} />
            </Box>
          ))}
        </Box>

        <MenuBtn />
      </Box>
    </>
  );
}

function CategoryCard({
  label,
  icon,
  isSmall,
}: {
  label: string;
  icon: React.ReactNode;
  isSmall: boolean;
}) {
  return (
    <Paper
      elevation={3}
      tabIndex={-1}
      sx={{
        height: isSmall ? 140 : 180,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        backgroundColor: "primary.main",
        color: "white",
        userSelect: "none",
        textAlign: "center",
        transition:
          "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          backgroundColor: "primary.dark",
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          fontSize: isSmall ? 50 : 70,
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          width: "100%",
        }}
      >
        {icon}
      </Box>
      <Typography
        fontWeight="bold"
        fontSize={16}
        sx={{
          wordBreak: "break-word",
          lineHeight: 1.3,
          minWidth: 0,
          flexShrink: 0,
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
}