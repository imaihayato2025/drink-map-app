"use client";

import { Typography, Button, Stack, Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBtn from "../components/MenuBtn";
import Header from "../components/Header";

export default function DrinkPage() {
  return (
    <div>
      <Header title="ジャンル" />

      <Box sx={{ pt: 2, pb: 12 }}>
        <Stack spacing={0} sx={{ width: "100%" }}>
          <CustomButton
            label="自販機の種類で探す"
            icon={<LocalDrinkIcon />}
            onClick={() => alert("自販機")}
          />
          <CustomButton
            label="炭酸の種類で探す"
            icon={<BubbleChartIcon />}
            onClick={() => alert("炭酸")}
          />
          <CustomButton
            label="近くから探す"
            icon={<PlaceIcon />}
            onClick={() => alert("近く")}
          />
          <CustomButton
            label="値段で探す"
            icon={<AttachMoneyIcon />}
            onClick={() => alert("値段")}
          />
          <CustomButton
            label="その他から探す"
            icon={<CategoryIcon />}
            onClick={() => alert("その他")}
          />
        </Stack>
      </Box>

      <MenuBtn />
    </div>
  );
}

function CustomButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        ...buttonStyle,
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        <Typography>{label}</Typography>
      </Box>
      <ChevronRightIcon />
    </Button>
  );
}

const buttonStyle = {
  width: "100%",
  height: "70px",
  fontSize: 18,
  borderBottom: "1px solid #ccc",
  borderRadius: 0,
  padding: "16px 20px",
};