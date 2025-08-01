"use client";

import { Typography, Button, Stack, Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuBtn from "../../components/MenuBtn";
import Header from "../../components/Header";
import { useRouter } from "next/navigation";

export default function SodaPage() {
  const router = useRouter();

  const handleNavigate = (companyName: string) => {
    // ここでトップページのURLにdrinkクエリ付けて移動
    router.push(`/?company=${encodeURIComponent(companyName)}`);
  };

  return (
    <div>
      <Header title="自販機の種類から探す" />

      <Box sx={{ pt: 2 }}>
        <Stack spacing={0} sx={{ width: "100%" }}>
          <CustomButton
            label="サントリーの自販機を探す"
            iconSrc="/jihan01.jpg"
            onClick={() => handleNavigate("サントリー")}
          />
          {/* 他のボタンも同様 */}
        </Stack>
      </Box>

      <Box sx={{ pt: 2 }}>
        <Stack spacing={0} sx={{ width: "100%" }}>
          <CustomButton
            label="キリンの自販機を探す"
            iconSrc="/jihan02.jpg"
            onClick={() => handleNavigate("キリン")}
          />
          {/* 他のボタンも同様 */}
        </Stack>
      </Box>

      <MenuBtn />
    </div>
  );
}

function CustomButton({
  label,
  iconSrc,
  onClick,
}: {
  label: string;
  iconSrc: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        width: "100%",
        height: "70px",
        fontSize: 18,
        borderBottom: "1px solid #ccc",
        borderRadius: 0,
        padding: "16px 20px",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="img"
          src={iconSrc}
          alt={label}
          sx={{ width: 60, height: 60, objectFit: "contain" }}
        />
        <Typography>{label}</Typography>
      </Box>
      <ChevronRightIcon />
    </Button>
  );
}
